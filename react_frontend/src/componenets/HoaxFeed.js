import React, {useEffect, useState} from 'react';
import {getHoaxes, getNewHoaxes, getNewHoaxesCount, getOldHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";
import {useParams} from "react-router-dom";


const HoaxFeed = () => {
    const [hoaxpage, setHoaxPage] = useState({
        content: [], last: true, number: 0
    })
    const [newHouxCount, setNewHouxCount] = useState(0)
    const {content, last, number} = hoaxpage
    const {username} = useParams()
    let firstHoaxId = 0
    if (content.length > 0) {
        firstHoaxId = hoaxpage.content[0].id
    }

    let lastHoaxId = 0
    if (content.length > 0) {
        const lastHoaxIndex = content.length - 1
        lastHoaxId = content[lastHoaxIndex].id
    }

    const {t} = useTranslation()
    const path = username ? `/api/users/${username}/hoaxes?page=` : '/api/hoaxes?page=';
    const oldHoaxespath = username ? `/api/users/${username}/hoaxes/${lastHoaxId}` : `/api/hoaxes/${lastHoaxId}`
    const newHoaxespath = username
        ? `/api/users/${username}/hoaxes/${firstHoaxId}?direction=after`
        : `/api/hoaxes/${firstHoaxId}?direction=after`;
    const initialLoadHoaxProgress = useApiProgress('get', path);
    const LoadOldHoaxProgress = useApiProgress('get', oldHoaxespath, true)
    const LoadNewHoaxProgress = useApiProgress('get', newHoaxespath, true)

    const loadOldHoaxes = async () => {

        const response = await getOldHoaxes(lastHoaxId, username)
        try {
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
            }));
        } catch (error) {
        }


    }
    const loadNewHoaxes = async () => {

        const response = await getNewHoaxes(firstHoaxId, username)

        try {
            setHoaxPage(previousHoaxPage => ({
                ...previousHoaxPage,
                content: [...response.data, ...previousHoaxPage.content]
            }));
            setNewHouxCount(0);
        } catch (error) {
        }


    }
    useEffect(() => {

        const getCount = async () => {
            const response = await getNewHoaxesCount(firstHoaxId, username)
            setNewHouxCount(response.data.count)
        }
        let looper = setInterval(getCount, 25000)


        return function clenup() {
            clearInterval(looper)
        }

    }, [firstHoaxId, username])

    useEffect(() => {
        const loadHoaxes = async page => {
            try {

                const response = await getHoaxes(username, page);
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }));
            } catch (error) {
            }
        };
        loadHoaxes()


    }, [username])


    if (content.length === 0) {
        return <div className='alert alert-secondary text-center'>


            {initialLoadHoaxProgress ? <Spinner/> : t('There are No hoaxes')}</div>
    }
    const onDeleteHoaxSuccsess = id => {
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: previousHoaxPage.content.filter((hoax) => hoax.id !== id)
        }))

    }


    return (
        <div>
            {newHouxCount > 0 &&
                <div style={{cursor: LoadNewHoaxProgress ? 'not-allowed' : 'pointer'}}
                     className='alert alert-secondary text-center mb-1'
                     onClick={LoadNewHoaxProgress ? () => {
                     } : loadNewHoaxes}
                >


                    {LoadNewHoaxProgress ? <Spinner/> : t('There are New Hoaxes')}</div>}

            {content.map((hoax, index) => {

                return <HoaxView hoax={hoax} key={hoax.id} onDeleteHoax={onDeleteHoaxSuccsess}> </HoaxView>
            })}
            {!last && (
                <div
                    className="alert alert-secondary text-center"
                    style={{cursor: LoadOldHoaxProgress ? 'not-allowed' : 'pointer'}}
                    onClick={LoadOldHoaxProgress ? () => {
                    } : loadOldHoaxes}
                >
                    {LoadOldHoaxProgress ? <Spinner/> : t('Load old hoaxes')}
                </div>
            )}

        </div>
    );
};

export default HoaxFeed;