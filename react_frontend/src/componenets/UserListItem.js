import React from 'react';

import {Link} from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const UserListItem = (props) => {
    const {user} = props
    const {username, displayName, image} = user;


    return (
        <div>
            <Link to={`/user/${username}`} className='list-group-item list-group-item-action'
            ><ProfileImageWithDefault className="rounded-circle" width="32" height="32" style={{paddingRight: 2}}
                                      alt={`${username} profile`}
                                      image={image}/> {displayName} -- {username}</Link>
        </div>
    );
};

export default UserListItem;