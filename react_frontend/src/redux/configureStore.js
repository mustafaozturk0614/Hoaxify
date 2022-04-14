import {createStore, applyMiddleware, compose} from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";


const secureLs = new SecureLS();
const getStateFromStorage = () => {
    const authData = secureLs.get('hoax-aut');
    let stateInlocalStorege = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined,

    }
    if (authData) {
        try {
            stateInlocalStorege = authData
        } catch (error) {
        }
    }

    return stateInlocalStorege;
}
const updateStateInStorage = newState => {
    secureLs.set('hoax-aut', newState)

}


const configureStore = () => {
    const initialState = getStateFromStorage()
    setAuthorizationHeader(initialState)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState())
        setAuthorizationHeader(store.getState())
    })
    return store;
}

export default configureStore;

