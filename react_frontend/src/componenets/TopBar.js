import React, {useContext, useEffect, useRef, useState} from 'react';
import logo from '../asests/hoaxify.png'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


import {logOutSuccess} from "../redux/authActions";
import {useDispatch, useSelector} from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = props => {
    const {username, isLoggedIn, displayName, image} = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));

    const [menuVisible, setMenuvisible] = useState(false);
    let dropdownClass = 'dropdown-menu  p-0 shadow'
    if (menuVisible) {
        dropdownClass += ' show'
    }
    const menuArea = useRef()
    useEffect(() => {
        document.addEventListener('click', menuClickTracker)
        return () => {
            document.removeEventListener('click', menuClickTracker)
        }
    }, [isLoggedIn])

    const menuClickTracker = (e) => {
        if (menuArea.current === null || !menuArea.current.contains(e.target)) {
            setMenuvisible(false);
        }


    }
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
            <ul className="navbar-nav ml-auto }" ref={menuArea}>
                <li className='nav-item dropdown'>
                    <div style={{cursor: 'pointer'}} className='d-flex' onClick={() => setMenuvisible(true)}>

                        <ProfileImageWithDefault image={image} width='32' height='32'
                                                 className='rounded-circle m-auto'/>
                        <span className='nav-link dropdown-toggle'>{displayName}</span>
                    </div>
                    <div className={dropdownClass}>

                        <Link onClick={() => setMenuvisible(false)} className="dropdown-item d-flex p-1"
                              to={`/user/${username}`}>
                                 <span className="material-icons text-info mx-2 ">
                                person
                                </span>
                            {t('My Profile')}
                        </Link>

                        <span className="dropdown-item d-flex p-1" onClick={onLogoutSuccess}
                              style={{cursor: 'pointer'}}>
                                <span className="material-icons text-danger mx-2 ">
                                    power_settings_new
                                 </span>
                            {t('Logout')}
                        </span>

                    </div>

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