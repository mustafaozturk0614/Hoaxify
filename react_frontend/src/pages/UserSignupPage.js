


import React from 'react';
import { signup, changeLanguage } from '../api/apiCalls';
import Input from '../componenets/Input';
import { withTranslation } from 'react-i18next';

import ReactCountryFlag from "react-country-flag"


class UserSignupPage extends React.Component {

    state = {

        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {

        }
    }
    onChangeLAnguage = language => {
        const { i18n } = this.props
        i18n.changeLanguage(language)
        changeLanguage(language)

    }

    onChange = e => {
        const { t } = this.props

        const { name, value } = e.target
        const errors = { ...this.state.errors }
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

        const { username, displayName, password } = this.state;

        const body = {
            username: username,
            displayName: displayName,
            password: password
        }
        this.setState({ pendingApiCall: true })
        // signup(body).then((response) => {
        //     this.setState({ pendingApiCall: false })
        // }).catch(error => {
        //     this.setState({ pendingApiCall: false })
        // });
        try {
            const response = await signup(body)

        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }

        }
        this.setState({ pendingApiCall: false })
    }

    render() {
        const { pendingApiCall, errors } = this.state
        const { username, displayName, password, email, passwordRepeat } = errors
        const { t } = this.props

        return (


            < div className='container' >
                <form>

                    <h1 className='text-center'>{t('Sign Up')}</h1>
                    <Input name='username' label={t('Username')} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange} />
                    <Input name="email" label="Email" error={email} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} error={password} type="password" onChange={this.onChange} />
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} type="password" onChange={this.onChange} />
                    <br></br>
                    <div className='text-center'>
                        <button disabled={pendingApiCall || passwordRepeat !== undefined} className='btn btn-primary' onClick={this.onclickSignup}  >
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {t('Sign Up')}
                        </button>
                    </div>
                    <div>

                        <span ><ReactCountryFlag
                            className="span"
                            onClick={() => this.onChangeLAnguage('tr')}
                            countryCode="TR"
                            svg

                            style={{
                                margin: '0.5em',
                                cursor: 'pointer',
                                width: '3em',
                                height: '3em',
                            }}

                        /> </span>

                        <span > <ReactCountryFlag
                            className='span'
                            onClick={() => this.onChangeLAnguage('en')}
                            countryCode="US"
                            svg
                            style={{
                                cursor: 'pointer',
                                width: '3em',
                                height: '3em',
                            }}

                        />  </span>



                    </div>

                </form>

            </div >


        );


    }

}
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation

