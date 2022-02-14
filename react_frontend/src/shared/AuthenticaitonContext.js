import React, {Component} from 'react';

export const Authentication = React.createContext();

class AuthenticaitonContext extends Component {

    state = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined,
    }

    onLoginSuccess = (authState) => {
        this.setState({
            ...authState,// (username,   displayName,image ,password
            isLoggedIn: true
        })

    }
    onLogOutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username: undefined
        })

    }

    render() {
        return (
            <Authentication.Provider value={{
                state: {...this.state},
                onLoginSuccess: this.onLoginSuccess,
                onLogOutSuccess: this.onLogOutSuccess
            }

            }>{this.props.children}</Authentication.Provider>

        );
    }
}

export default AuthenticaitonContext;