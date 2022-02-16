import React, {Component} from 'react';
import Input from "../componenets/Input";
import {withTranslation} from 'react-i18next'
import LanguageSelector from "../componenets/LanguageSelector";
import {login} from '../api/apiCalls'
import ButtonWithProgress from "../componenets/ButtonWithProgress"
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from "react-redux";
import {loginHandler, loginSuccess} from "../redux/authActions";


// import {Authentication} from "../shared/AuthenticaitonContext";

class LoginPage extends Component {
    // static contextType = Authentication

    state = {
        username: null,
        password: null,
        error: null,


    }


    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        const {history, dispatch} = this.props;
        const {push} = history


        const creds = {
            username,
            password,

        }


        this.setState({
            error: null

        })
        try {
            await dispatch(loginHandler(creds))
            push('/')
        } catch (apiError) {
            this.setState({
                    error: apiError.response.data.message

                }
            )
        }

    }
    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            error: null

        })


    }

    render() {
        const {t, pendingApiCall} = this.props;
        const {username, password, error} = this.state

        const buttonEnabled = username && password
        return (

            <div className="container">

                <form action="">
                    <h1 className='text-center'>{t('Login')}</h1>

                    <Input name='username' label={t('Username')} onChange={this.onChange}/>

                    <Input name="password" label={t('Password')} type="password" onChange={this.onChange}/>

                    {error && <div className="alert alert-danger">{error}</div>}
                    <br/>
                    <div className='text-center'>
                        <ButtonWithProgress onClick={this.onClickLogin}
                                            disabled={!buttonEnabled || pendingApiCall}
                                            pendingApiCall={pendingApiCall}
                                            text={t('Login')}
                        >


                        </ButtonWithProgress>
                    </div>


                </form>
            </div>


        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//         onLoginSuccess: (authState) => {
//             return dispatch(loginSuccess(authState))
//         }
//     }
//
// }
const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPagePageWithApiProgress = withApiProgress(LoginPageWithTranslation, "/api/auth")

export default connect()(LoginPagePageWithApiProgress)