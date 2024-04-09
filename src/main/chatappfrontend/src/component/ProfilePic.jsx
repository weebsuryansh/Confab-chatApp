import PropTypes from 'prop-types';
import "../css/ProfilePic.scss"
function ProfilePic(props) {

    return (
        <div className={"pfp"}>
            {props.name[0]}
        </div>
    );
}
ProfilePic.propTypes={
    name: PropTypes.string,
    username: PropTypes.string
}

export default ProfilePic;