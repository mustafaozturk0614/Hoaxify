import React, {Component} from 'react';
import Input from "../componenets/Input";

import {withTranslation} from 'react-i18next'
import LanguageSelector from "../componenets/LanguageSelector";
import {login} from '../api/apiCalls'

import ButtonWithProgress from "../componenets/ButtonWithProgress"
import {withApiProgress} from "../shared/ApiProgress";
import {Authentication} from "../shared/AuthenticaitonContext";

class LoginPage extends Component {
    static contextType = Authentication

    state = {
        username: null,
        password: null,
        error: null,


    }


    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        const {onLoginSuccess} = this.context
        const creds = {
            username,
            password,

        }
        const {push} = this.props.history


        this.setState({
            error: null

        })
        try {
            const response = await login(creds);

            push('/')
            const authState = {
                username: username,
                password: password,
                displayName: response.data.displayName,
                image: response.data.image
            }
            onLoginSuccess(authState)
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


const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPagePageWithApiProgress = withApiProgress(LoginPageWithTranslation, "/api/auth")

export default LoginPagePageWithApiProgress