
import "../css/Login.scss"
import {useState} from "react";
import PropTypes from "prop-types";

function Login({sendDataToLoginPage}){
    const [nickname, setNickname] = useState(null);
    const [fullname, setFullname] = useState(null);
    function updateNickName(event){
        setNickname(event.target.value);
    }
    function updateFullName(event){
        setFullname(event.target.value);
    }

    function connect(event){
        const data={
            nickName: nickname,
            fullName: fullname,
            event: event
        }
        sendDataToLoginPage(data);
        event.preventDefault();
    }

    return(
        <>
            <div className={"login-page-container"}>
                <h2 id={"login-heading"}>
                    LogIn / SignUp
                </h2>
                <form id={"form-container"}>
                    <label htmlFor="nickname" className={"field-label"}>Nickname:</label>
                    <input type="text" id="nickname" name="nickname" className={"field-input"} onChange={updateNickName} required/>
                    <label htmlFor="fullname" className={"field-label"}>Real Name:</label>
                    <input type="text" id="fullname" name="realname" className={"field-input"} onChange={updateFullName} required/>

                    <button type="submit" className={"submit-button"} onClick={connect}>Enter Chatroom</button>
                </form>
            </div>
        </>
    );
}

Login.propTypes={
    sendDataToLoginPage: PropTypes.func.isRequired
}

export default Login;