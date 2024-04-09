import '../css/App.scss'
import LoginPage from "./LoginPage.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import ChatPage from "./ChatPage.jsx";
import {useRef, useState} from "react";


function App() {
    const [nickname, setNickname] = useState(null);
    const [fullname, setFullname] = useState(null);
    const navigate = useNavigate();
    const chatPageRef= useRef(null);


    function connect(data){
        setNickname(data.nickName);
        setFullname(data.fullName);

        if(nickname&&fullname){
            navigate(`/home/${nickname}/${fullname}`);

        }
    }

    return (
        <div id={"container"}>
            <Routes>
                <Route path={"/"} element={<LoginPage sendDataToApp={connect}/>}></Route>
                <Route path={"/home/:nickname/:fullname"} element={<ChatPage ref={chatPageRef} />}></Route>
            </Routes>
        </div>
    );
}
export default App;
