import React, {useContext} from 'react';
import logo from '../asests/hoaxify.png'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Authentication} from "../shared/AuthenticaitonContext"
import {logOutSuccess} from "../redux/authActions";
import {useDispatch, useSelector} from "react-redux";

const TopBar = props => {
    // const context = useContext(Authentication)
    const {username, isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logOutSuccess());
    };
    const {t} = useTranslation();
    // const {username, isLoggedIn, onLogoutSuccess} = props;

    let links = (
        <ul className="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to="/login">
                    {t('Login')}
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    {t('Sign Up')}
                </Link>
            </li>
        </ul>
    );

    if (isLoggedIn) {
        links = (<div>
            <ul className="navbar-nav">
                <li>
                    <Link className="nav-link" to={`/user/${username}`}>
                        {username}
                    </Link>
                </li>
                <li className="nav-link" onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>
                    {t('Logout')}
                </li>
            </ul>
        </div>)
    }
    return (
        <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light container navbar-expand justify-content-between ">
                <div><Link className="navbar-brand" to="/"> <img src={logo} width={70} alt="logo"/> Hoaxify</Link>
                </div>
                {links}
            </nav>
        </div>
    );
}


export default (TopBar);