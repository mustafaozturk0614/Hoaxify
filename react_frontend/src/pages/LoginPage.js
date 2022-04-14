import React, {useEffect, useState} from 'react';
import Input from "../componenets/Input";
import {useTranslation} from 'react-i18next'

import ButtonWithProgress from "../componenets/ButtonWithProgress"
import {useApiProgress, withApiProgress} from "../shared/ApiProgress";
import {useDispatch} from "react-redux";

import {loginHandler} from "../redux/authActions";


// import {Authentication} from "../shared/AuthenticaitonContext";

const LoginPage = props => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        setError(undefined)
    }, [username, password])

    const onClickLogin = async event => {
        event.preventDefault();

        const {history} = props;
        const {push} = history
        const creds = {
            username,
            password,

        }

        setError(undefined)
        try {
            await dispatch(loginHandler(creds))
            push('/')
        } catch (apiError) {
            setError(apiError.response.data.message)
        }
    }
    // const onChange = event => {
    //     const {name, value} = event.target;
    //     // this.setState({
    //     //     [name]: value,
    //     //     error: null
    //     //
    //     // })
    //
    //
    // }
    const {t} = useTranslation();
    const pendingApiCall = useApiProgress('post', '/api/auth');
    const buttonEnabled = username && password
    return (

        <div className="container">

            <form>
                <h1 className='text-center'>{t('Login')}</h1>

                <Input name='username' label={t('Username')} onChange={event => setUsername(event.target.value)}/>

                <Input name="password" label={t('Password')} type="password"
                       onChange={event => setPassword(event.target.value)}/>

                {error && <div className="alert alert-danger">{error}</div>}
                <br/>
                <div className='text-center'>
                    <ButtonWithProgress onClick={onClickLogin}
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


// const mapDispatchToProps = dispatch => {
//     return {
//
//         onLoginSuccess: (authState) => {
//             return dispatch(loginSuccess(authState))
//         }
//     }
//
// }


export default LoginPage