import '../css/UserMessage.scss'
import PropTypes from "prop-types";

function UserMessage(props) {
    return (
        <div className={"user-message-container"}>
            <div className={"content"}>
                {props.text}
            </div>
        </div>
    );
}
UserMessage.propTypes={
    text: PropTypes.string
}
export default UserMessage;