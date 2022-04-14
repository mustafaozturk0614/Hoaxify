import React, {useEffect, useState} from 'react';
import ProfileCard from "../componenets/ProfileCard";
import {getUser} from "../api/apiCalls";
import {use} from "i18next";
import {useParams} from "react-router-dom";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "../componenets/Spinner";
import HoaxFeed from "../componenets/HoaxFeed";

const UserPage = () => {
    const [user, setUser] = useState({});
    const {username} = useParams()
    const [notFound, setNotFound] = useState(false)
    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false)

    }, [user])

    useEffect(() => {
        const loadUser = async () => {

            try {

                const response = await getUser(username)

                setUser(response.data)

            } catch (error) {
                setNotFound(true)
            }
        }

        loadUser()


    }, [username])
    if (notFound) {

        return <div className='container'>
            <div className='alert alert-danger text-center'>
                <div>
                   <span style={{fontSize: 48}} className="material-icons">
                             error
                        </span>
                </div>
                User NotFound
            </div>
        </div>
    }
    if (pendingApiCall || user.username !== username) {
        return <Spinner/>

    }


    return (

        <div className="container">
            <div className="row">
                <div className="col">
                    <ProfileCard user={user}/>
                </div>
                <div className="col">
                    <HoaxFeed/>
                </div>
            </div>
        </div>
    );
};

export default UserPage;