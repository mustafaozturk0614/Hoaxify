import React, {useEffect, useState} from 'react';
import {getUsers} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import UserListItem from "./UserListItem";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";


const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    });
    const [loadFailure, setLoadFailure] = useState(false);
    const pendingApiCall = useApiProgress('get', '/api/users?page')


    const OnClickNext = () => {
        const nextPage = page.number + 1

        loadUser(nextPage)
    }
    const onClickPrev = () => {
        const nextPage = page.number - 1

        loadUser(nextPage)

    }

    const loadUser = async page => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);

        } catch (error) {
            setLoadFailure(true);
        }
    };


    const {t} = useTranslation()
    const {content: users, last, first} = page

    let actionDiv = (<div>
        {first === false &&
            <button className="btn btn-sm btn-outline-primary"
                    onClick={onClickPrev}>{t('Previous')}</button>}
        <span>  </span>
        {last === false &&
            <button className="btn btn-sm btn-outline-primary float-end"
                    onClick={OnClickNext}>{t('Next')}</button>}

    </div>)

    if (pendingApiCall) {
        actionDiv = (
            <Spinner/>
        );
    }
    useEffect(() => {
        loadUser();
    }, []);
    return (
        <div>
            <div className="card">
                <h3 className="card-header text-center">{t('Users')}</h3>

                <div className="list-group-flush">    {
                    users.map((data, index) => (

                        <UserListItem key={data.username} user={data}/>
                    ))


                }</div>
                {actionDiv}
                {loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}
            </div>
        </div>
    );
};


export default UserList;