import React from 'react';
import {Authentication} from "../shared/AuthenticaitonContext";
import {withRouter} from "react-router-dom";

const ProfileCard = (props) => {


    return (
        <Authentication.Consumer>
            {value => {
                const pathUsername = props.match.params.username
                const loggedInUserName = value.state.username
                let message = "we cannot edit"
                if (pathUsername === loggedInUserName) {
                    message = "we can edit"
                }
                return <div>{message}</div>
            }}


        </Authentication.Consumer>


    );
};

export default withRouter(ProfileCard);