import React, {useState} from 'react';
import Input from '../componenets/Input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from "../componenets/ButtonWithProgress"
import {useApiProgress, withApiProgress} from "../shared/ApiProgress"
import {useDispatch} from "react-redux";
import {signUpHandler} from "../redux/authActions";


const UserSignupPage = props => {
    const [formSignup, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
    })
    const {t} = useTranslation()
    const dispatch = useDispatch()
    // const [username, setUsername] = useState()
    // const [displayName, setDisplayName] = useState()
    // const [password, setPassword] = useState()
    // const [passwordRepeat, setPasswordRepat] = useState()
    const [errors, setErrors] = useState({})


    const onChange = e => {
        const {name, value} = e.target
        const errorsCopy = {...errors}
        errorsCopy[name] = undefined;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}))
        setForm((previousForm) => ({...previousForm, [name]: value}))
        console.log(formSignup)
    }
    const onclickSignup = async e => {
        e.preventDefault();

        const {username, displayName, password} = formSignup;
        const {history} = props
        const body = {
            username: username,
            displayName: displayName,
            password: password
        }
        try {
            await dispatch(signUpHandler(body))
            history.push('/')
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)

            }
        }
    }
    const {
        username: userNameError,
        displayName: displayNameError,
        password: passwordError,
        email,
    } = errors
    const pendingApiCallSignUp = useApiProgress('post', "/api/users")
    const pendingApiCallLogin = useApiProgress('post', "/api/auth")

    const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin
    let passwordRepeatError;
    if (formSignup.passwordRepeat !== formSignup.passwordRepeat) {
        passwordRepeatError = t('Password mismatch')
    }


    return (


        < div className='container'>
            <form>

                <h1 className='text-center'>{t('Sign Up')}</h1>
                <Input name='username' label={t('Username')} error={userNameError} onChange={onChange}/>
                <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange}/>
                <Input name="email" label="Email" error={email} onChange={onChange}/>
                <Input name="password" label={t('Password')} error={passwordError} type="password"
                       onChange={onChange}/>
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} type="password"
                       onChange={onChange}/>
                <br></br>
                <div className='text-center'>
                    <ButtonWithProgress disabled={pendingApiCall || passwordRepeatError !== undefined}
                                        onClick={onclickSignup} pendingApiCall={pendingApiCall}
                                        text={t('Sign Up')}>
                    </ButtonWithProgress>
                </div>


            </form>

        </div>


    );


}


export default UserSignupPage

