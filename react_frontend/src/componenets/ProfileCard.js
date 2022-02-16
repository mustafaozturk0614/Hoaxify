import React from 'react';
// import {Authentication} from "../shared/AuthenticaitonContext";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const ProfileCard = (props) => {


    const pathUsername = props.match.params.username
    let message = "we cannot edit"
    if (pathUsername === props.loggedInUserName) {
        message = "we can edit"
    }
    return <div>{message}</div>
}
const mapStateToProps = store => {

    return {
        loggedInUserName: store.username
    }
}

export default connect(mapStateToProps)(withRouter(ProfileCard));