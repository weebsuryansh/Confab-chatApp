import "../css/ChatPage.scss"
import {forwardRef, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProfilePic from "./ProfilePic.jsx";
import SendorMessage from "./SendorMessage.jsx";
import UserMessage from "./UserMessage.jsx";

const ChatPage=forwardRef(()=> {

    const {nickname,fullname}=useParams();
    let sampleText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque, consectetur deserunt earum excepturi fugit illum laudantium optio perferendis, possimus repellendus sit tempora voluptate? Aliquam blanditiis consequatur dolore odit officiis.";
    const [connectedUserList, setConnectedUserList] = useState([
        {nick_name: "surya", full_name: "Suryansh", status: 'ONLINE'},
        {nick_name: "puchka", full_name: "Chhavi", status: 'ONLINE'}
    ]);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const [activeUser, setActiveUser] = useState({full_name:""});
    let intervalId=0;

    async function displayConnectedUsers(){
        const connectedUsersResponse = await fetch('http://localhost:8080/users');
        let connectedUsers = await connectedUsersResponse.json();
        connectedUsers = connectedUsers.filter(user => user.nick_name !== nickname);
        if(connectedUsers!==connectedUserList){
            setConnectedUserList([...connectedUsers]);
        }
    }

    function getFirstWord(str) {
        str = str.trim();
        let words = str.split(/\s+/);
        return words[0];
    }

    useEffect(() => {
        // Scroll to the bottom whenever the component updates
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    },[messageList]);

    useEffect(()=>{
        connect();
    },[])

    function onConnected(client) {
        client.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
        client.subscribe(`/user.topic`, onMessageReceived);
        client.send(`/app/user.addUser`,
            {},
            JSON.stringify({nick_name: nickname, full_name: fullname, status: 'ONLINE'})
        );
        console.log(client);
        displayConnectedUsers().then(()=>{
            intervalId=setInterval(displayConnectedUsers,1000);
        });

    }

    function onError() {
        console.log("An error occured");
        navigate('/',{'replace':true});
    }

    function connect(){
        const SockJS = window.SockJS;
        const Stomp= window.Stomp;

        const socket =  new SockJS('http://localhost:8080/ws');
        const client=Stomp.over(socket);
        setStompClient(client);
        client.connect({}, ()=>onConnected(client), onError);
    }


    function clickUser(index) {
        console.log("clicked ",index);
        console.log(connectedUserList[index]);
        const connectedUsers = document.querySelector("#connected-users");
        const messageForm = document.querySelector("#messageForm");
        messageForm.classList.remove("hidden");
        let userItems=connectedUsers.querySelectorAll("li");
        userItems.forEach((item,key)=>{
            if(key===index){
                item.classList.add("active-chat");
                item.classList.remove("non-active-chat");
            }
            else{
                item.classList.remove("active-chat");
                item.classList.add("non-active-chat")
            }
        })
        let active=connectedUserList[index];
        setActiveUser(active);
        fetchAndDisplayChat(active).then();
        return null;
    }

    async function fetchAndDisplayChat(active) {
        const userChatResponse = await fetch(`http://localhost:8080/messages/${nickname}/${active.nick_name}`);
        const chat = await userChatResponse.json();
        setMessageList([...chat]);
        return null;
    }

    function handleMessageChange(event){
        setMessage(event.target.value);
    }

    function sendMessage(event) {
        event.preventDefault();
        console.log(message);
        const messageContent = message.trim();
        console.log(messageContent);
        console.log(stompClient);
        if(messageContent!==""){
            console.log("is this being called?");
            let date=new Date();
            console.log(date);
            console.log(activeUser);
            stompClient.send(
                `/app/chat`,
                {},
                JSON.stringify({
                    senderId: nickname,
                    recipientId: activeUser.nick_name,
                    content: messageContent,
                    timestamp: date
                })
            );
            setMessageList(m=>[...m,{
                senderId: nickname,
                recipientId: activeUser.nick_name,
                content: messageContent,
                timestamp: date
            }]);
            const messageBox = document.querySelector("#message");
            messageBox.value="";
        }
    }

    function onMessageReceived(payload) {
        console.log(payload);
        const message = JSON.parse(payload.body);
        console.log("message",message);
        console.log("user",activeUser);
        if(activeUser && activeUser.nick_name===message.senderId){
            fetchAndDisplayChat(activeUser).then();
        }
    }

    function logOut() {
        console.log("clicked");
        navigate('/',{replace:true});
    }

    return (
        <div id={"chat-page-container"}>
            <div id={"chat-container"}>
                <div id={"user-list"}>
                    <div id={"header"}>
                        <h2>
                            Online users
                        </h2>
                    </div>
                    <div id={"user-list-container"}>
                        <ul id={"connected-users"}>
                            {connectedUserList.map((user,index) => <li className={"user-item"} key={index} id={user.nick_name} onClick={()=>clickUser(index)}>
                                <ProfilePic name={user.full_name} username={user.nick_name}/> {getFirstWord(user.full_name)}
                            </li>)}
                        </ul>
                    </div>
                    <div id={"footer"}>
                        <p id="connected-user-fullname">
                            <ProfilePic name={fullname} username={nickname}/>
                            <div id={"fullname"}>
                                {fullname}
                            </div>
                        </p>
                        <div className="logout" id="logout" onClick={logOut}>Logout</div>
                    </div>
                </div>
                <div id={"chat-area"}>
                    <div id={"recipient-user"}>{activeUser.full_name}</div>
                    <div id={"chat-messages"} ref={containerRef}>
                        {messageList.map((message,index)=>{
                            if(message.senderId===nickname){
                                return <UserMessage text={message.content} key={index}/>
                            }
                            else{
                                return <SendorMessage name={message.senderId} text={message.content} key={index}/>
                            }
                        })}
                    </div>
                    <form id={"messageForm"} name={"messageForm"} className={"hidden"}>
                        <div className="message-input">
                            <input autoComplete="off" type="text" id="message" placeholder="Type your message..." onChange={handleMessageChange}/>
                            <button id={"send-button"} onClick={sendMessage}>Send</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
});

ChatPage.displayName = "Chat-Page";
export default ChatPage;