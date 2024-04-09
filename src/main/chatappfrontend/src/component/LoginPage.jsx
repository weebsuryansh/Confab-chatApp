import Login from "./Login.jsx";
import "../css/LoginPage.scss"
import PropTypes from "prop-types";

function LoginPage({sendDataToApp}) {

    function handleLoginData(data){
        sendDataToApp(data);
    }
    return (
        <div id={"login-page-container"}>
            <div id={"empty"}></div>
            <div id={"title-container"}>
                <h1 id={"title"}>CONFAB</h1>
            </div>
            <div id={"content"}>
                <Login sendDataToLoginPage={handleLoginData}/>
            </div>
        </div>
    );
}

LoginPage.propTypes={
    sendDataToApp: PropTypes.func.isRequired
}

export default LoginPage;