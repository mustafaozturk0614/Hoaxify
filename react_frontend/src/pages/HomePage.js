import React from 'react';
import UserList from "../componenets/UserList";
import HoaxSubmit from "../componenets/HoaxSubmit";
import {useSelector} from "react-redux";
import HoaxFeed from "../componenets/HoaxFeed";


const HomePage = () => {

    const {isLoggednIn} = useSelector((store) => ({isLoggednIn: store.isLoggedIn}))
    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    {isLoggednIn && <HoaxSubmit/>}
                    <div className='mb-2'><HoaxFeed/></div>


                </div>
                <div className='col'>
                    <UserList/>
                </div>

            </div>

        </div>
    );
};

export default HomePage;