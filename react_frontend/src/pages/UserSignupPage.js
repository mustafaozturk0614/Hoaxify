import React from 'react';
import {signup} from '../api/apiCalls';
import Input from '../componenets/Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from "../componenets/ButtonWithProgress"
import {withApiProgress} from "../shared/ApiProgress";


class UserSignupPage extends React.Component {

    state = {

        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,

        errors: {}
    }


    onChange = e => {
        const {t} = this.props

        const {name, value} = e.target
        const errors = {...this.state.errors}
        errors[name] = undefined;
        if (name === "passwordRepeat" || name === "password") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch')

            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = "Parola eşleşmedi"
            } else {
                errors.passwordRepeat = undefined
            }
        }
        this.setState({
            [name]: value,
            errors

        })
    }
    onclickSignup = async e => {
        e.preventDefault();

        const {username, displayName, password} = this.state;

        const body = {
            username: username,
            displayName: displayName,
            password: password
        }


        try {
            const response = await signup(body)

        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors})
            }

        }

    }

    render() {
        const {errors} = this.state
        const {username, displayName, password, email, passwordRepeat} = errors
        const {t, pendingApiCall} = this.props

        return (


            < div className='container'>
                <form>

                    <h1 className='text-center'>{t('Sign Up')}</h1>
                    <Input name='username' label={t('Username')} error={username} onChange={this.onChange}/>
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}/>
                    <Input name="email" label="Email" error={email} onChange={this.onChange}/>
                    <Input name="password" label={t('Password')} error={password} type="password"
                           onChange={this.onChange}/>
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} type="password"
                           onChange={this.onChange}/>
                    <br></br>
                    <div className='text-center'>
                        <ButtonWithProgress disabled={pendingApiCall || passwordRepeat !== undefined}
                                            onClick={this.onclickSignup} pendingApiCall={pendingApiCall}
                                            text={t('Sign Up')}>
                        </ButtonWithProgress>
                    </div>


                </form>

            </div>


        );


    }

}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageWithTranslation, "/api/users")

export default UserSignupPageWithApiProgress

