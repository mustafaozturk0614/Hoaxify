import *as ACTIONS from './actionTypes'
import {cleanAuthorizationHeader, login, setAuthorizationHeader, signup} from "../api/apiCalls";

export const logOutSuccess = () => {

    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
};
export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState

    };
};

export const updateSuccess = (data) => {

    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: data
    }
}


export const loginHandler = (credentials) => {
    return async function (dispatch) {

        const response = await login(credentials);

        const authState = {

            ...response.data.user,
            password: credentials.password,
            token: response.data.token

        }

        dispatch(loginSuccess((authState)));

        return response
    };

}
export const signUpHandler = (user) => {
    return async function (dispatch) {
        const response = await signup(user)
        await dispatch(loginHandler(user))
        return response;
    }

}