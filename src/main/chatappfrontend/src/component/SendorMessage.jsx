import ProfilePic from "./ProfilePic.jsx";
import '../css/SendorMessage.scss'
import PropTypes from "prop-types";

function SendorMessage(props) {
    return (
        <div className={"sendor-message-container"}>
            <div className={"content"}>
                {props.text}
            </div>
        </div>
    );
}
SendorMessage.propTypes={
    name:PropTypes.string,
    text:PropTypes.string
}

export default SendorMessage;