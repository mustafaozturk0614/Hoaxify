import './App.css';
import LoginPage from "./pages/LoginPage";
import {HashRouter as Router, Redirect, Route} from 'react-router-dom'
import LanguageSelector from "./componenets/LanguageSelector";
import UserSignupPage from "./pages/UserSignupPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import {Switch} from "react-router-dom"
import TopBar from "./componenets/TopBar";
import {useSelector} from "react-redux";

const App = props => {
    const {isLoggedIn} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn
    }))
    return (
        <div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route path="/user/:username" component={UserPage}/>
                    <Redirect to="/"/>
                </Switch>
            </Router>
            <LanguageSelector/>
        </div>
    );
}

export default (App);
