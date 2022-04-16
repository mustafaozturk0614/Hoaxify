import React, {useState} from 'react';
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {useTranslation} from "react-i18next";

import {useSelector} from "react-redux";
import {deleteHoax} from "../api/apiCalls";
import Modal from "./Modal";
import {useApiProgress} from "../shared/ApiProgress";

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);

    const {hoax, onDeleteHoax} = props
    const {user, content, timestamp, fileAttachment, id} = hoax
    const {username, displayName, image} = user
    const [modalVisible, setModalVisble] = useState(false)
    const pendingApiCall = useApiProgress('delete', '/api/hoaxes/' + id, true)
    const {i18n, t} = useTranslation();
    const ownedByLoggedInUser = loggedInUser === username
    const formatted = format(timestamp, i18n.language);
    const onClickDelete = async () => {

        const response = await deleteHoax(id)
        console.log(response.data)
        onDeleteHoax(id);


    }
    const onClickCancel = () => {
        setModalVisble(false)
    }


    return (
        <>
            <div className='card p-2'>
                <div className="d-flex justify-content-between">
                    <Link className="text-dark text-decoration-none d-flex"
                          to={`/user/${username}`}>
                        <ProfileImageWithDefault image={image} width={32} height={32}
                                                 className="rounded-circle m-1"/>
                        <div className="flex-fill  m-auto px-1">
                            <h6 className="d-inline te">{displayName}@{username}</h6>
                            <span> - </span>
                            <span>{formatted}</span>

                        </div>
                    </Link>
                    {ownedByLoggedInUser &&
                        <button onClick={() => setModalVisble(true)} className="btn btn-delete-link"> <span
                            className="material-icons">
                            delete
                            </span>
                        </button>}

                </div>

                <div className="p-2 text-center">{content} from @{username}</div>
                {fileAttachment && (
                    <div className='text-center'>
                        {fileAttachment.fileType === 'image' ? <img className="img-fluid justify-content-center"
                                                                    src={'images/attachments/' + fileAttachment.name}
                                                                    alt={content}/> :
                            <strong> Hoax has unkonwn attachments</strong>


                        }

                    </div>
                )}


            </div>
            <Modal okButton={t('Delete Hoax')} title={t('Delete Hoax')} message={<div>
                <div className='text-center'><strong>{t('Are you sure to delete hoax?')}</strong></div>
                <div className='text-center mt-2'>{content} {t('from')} @{username}</div>
            </div>} onClickCancel={onClickCancel} onClickOk={onClickDelete} visble={modalVisible}
                   pendingApiCall={pendingApiCall}/>
        </>
    );
};

export default HoaxView;