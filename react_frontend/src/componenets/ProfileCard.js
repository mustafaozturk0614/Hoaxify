import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import defaultPicture from '../asests/profile.png'
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {useTranslation} from "react-i18next";
import Input from "./Input";
import {deleteUser, updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import {use} from "i18next";
import ButtonWithProgress from "./ButtonWithProgress";
import {logOutSuccess, updateSuccess} from "../redux/authActions";
import Modal from "./Modal";

const ProfileCard = (props) => {

    const {username: loggedInUserName} = useSelector((store) => ({
        username: store.username
    }))
    const dispatch = useDispatch()
    const [validationErrors, setValidationErrors] = useState({})
    const [user, setUser] = useState({...props.user})
    const [uptatedDisplayName, setUpdatedDisplayName] = useState()
    const [inEditMode, setInEditMode] = useState(false)
    const {t} = useTranslation()
    const [editable, setEditable] = useState(false)
    const {username, displayName, image} = user
    const routeParams = useParams();
    const pathUsername = routeParams.username
    const pendingApiCall = useApiProgress('put', '/api/users/' + username)
    const [newImage, setNewImage] = useState()
    const [modalVisible, setModalVisble] = useState(false)
    const pendingApiCallDeleteUser = useApiProgress('delete', `/api/users/${username}`, true)
    const histoy = useHistory()
    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(",")[1]
        }

        const body = {
            displayName: uptatedDisplayName,
            image: image

        }
        try {
            const response = await updateUser(username, body)
            setUser({...user, ...response.data})
            setInEditMode(false)

            dispatch(updateSuccess(response.data))

        } catch (error) {
            setValidationErrors(error.response.data.validationErrors)
        }
    }

    useEffect(() => {
        setUser(props.user)

    }, [props.user])
    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined,

        }))

    }, [uptatedDisplayName])
    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            image: undefined,

        }))

    }, [newImage])

    useEffect(() => {
        setEditable(pathUsername === loggedInUserName)

    }, [pathUsername, loggedInUserName])
    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined)
            setNewImage(undefined)
        } else {
            setUpdatedDisplayName(displayName)
        }
    }, [inEditMode, displayName])
    const onChangeFile = (e) => {
        if (e.target.files.length < 1) {
            return
        }
        const file = e.target.files[0]
        const filereader = new FileReader();
        filereader.onloadend = () => {
            setNewImage(filereader.result)
        }
        filereader.readAsDataURL(file)
    }
    const onClickCancel = () => {
        setModalVisble(false)
    }
    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisble(false)
        dispatch(logOutSuccess())
        histoy.push('/')
    }

    return <div className='card text-center'>
        <div className='card-header'><ProfileImageWithDefault className="rounded-circle shadow" width="200" height="200"
                                                              style={{paddingRight: 2}}
                                                              alt={`${username} profile`}
                                                              image={image}
                                                              tempimage={newImage}

        /></div>
        <div className='card-body'>

            {!inEditMode && (
                <div>
                    <h3>{displayName}@{username}</h3>
                    {editable &&
                        <div>
                            <button onClick={() => setInEditMode(true)} className='btn btn-success d-inline-flex '>
                                    <span className="material-icons">
                                             edit
                                    </span>
                                {t('Edit')}
                            </button>
                            <div className='pt-2'>
                                <button onClick={() => setModalVisble(true)} className='btn btn-danger d-inline-flex '>
                                        <span className="material-icons">
                                                 directions_run
                                        </span>
                                    {t('Delete My Accaount')}
                                </button>
                            </div>

                        </div>

                    }
                </div>)}
            {inEditMode &&

                <div>

                    <Input onChange={(e) => setUpdatedDisplayName(e.target.value)} defaultValue={displayName}
                           label={t('Change' +
                               ' Display Name')}
                           error={validationErrors.displayName}/>
                    <Input type="file" onChange={onChangeFile} error={validationErrors.image}/>
                    <div style={{
                        marginTop: 5,
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                        <div>
                            <ButtonWithProgress className='btn btn-primary d-inline-flex'
                                                onClick={onClickSave}
                                                disabled={pendingApiCall}
                                                pendingApiCall={pendingApiCall}
                                                text={
                                                    <><span className="material-icons">
                                                   save
                                                    </span>{t('Save')}</>
                                                }
                            >

                            </ButtonWithProgress>
                        </div>
                        <div>
                            <button onClick={() => setInEditMode(false)}
                                    className='btn btn-danger d-inline-flex' style={{marginLeft: 15}}
                                    disabled={pendingApiCall}
                            >
                                <span className="material-icons">
                                     cancel
                                </span>

                                {t('Cancel')}
                            </button>
                        </div>


                    </div>
                </div>}
            <Modal title={t('Delete My Accaount')} okButton={t('Delete My Accaount')} message={<div>
                <div className='text-center'><strong>{t('Are You sure to delete your account?')}</strong></div>

            </div>} onClickCancel={onClickCancel} onClickOk={onClickDeleteUser} visble={modalVisible}
                   pendingApiCall={pendingApiCallDeleteUser}/>

        </div>


    </div>
}
export default (ProfileCard);