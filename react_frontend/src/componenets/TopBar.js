import React, {Component} from 'react';
import logo from '../asests/hoaxify.png'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux"
import {logOutSuccess} from "../redux/authActions";


// import {Authentication} from "../shared/AuthenticaitonContext"


class TopBar extends Component {
    // static  contextType = Authentication;


    render() {
        const {t, username, isLoggedIn, onLogoutSuccess} = this.props;


        let links = (<div>
            <ul className="navbar-nav">
                <li><Link className="navbar-brand" to="/login">{t('Login')}</Link></li>
                <li><Link className="navbar-brand" to="/signup">{t('Sign Up')}</Link></li>
            </ul>
        </div>)
        if (isLoggedIn) {
            links = (<div>
                <ul className="navbar-nav">
                    <li>
                        <Link className="nav-link" to={`/user/${username}`}>{username}</Link>
                    </li>
                    <li onClick={onLogoutSuccess} style={{cursor: "pointer"}}
                        className="nav-link"> {t('Logout')}</li>
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
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapDispatchToProps = dispatch => {
    return {

        onLogoutSuccess: () => {
            return dispatch(logOutSuccess())
        }
    }

}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);