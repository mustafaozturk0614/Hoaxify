import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {useTranslation} from "react-i18next";
import {useApiProgress} from "../shared/ApiProgress";
import {postHoax, postHoaxAttachment} from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import AutoUploadImage from "./AutoUploadImage";


const HoaxSubmit = () => {

    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false)
    const [hoax, setHoax] = useState('')
    const {t} = useTranslation()
    const [errors, setErrors] = useState({})
    const [newImage, setNewImage] = useState()
    const [attachmentId, setAttachmentId] = useState()

    const pendingFileUpload = useApiProgress('post', '/api/hoax-attachments', true)
    const pendinApicall = useApiProgress('post', '/api/hoaxes', true)
    useEffect(() => {
        if (!focused) {
            setHoax('')
            setErrors({})
            setNewImage()
            setAttachmentId()

        }


    }, [focused])
    useEffect(() => {
        setErrors({})


    }, [hoax])
    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId: attachmentId
        }
        try {
            await postHoax(body)
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)

            }
        }


    }
    let textAreaClass = 'form-control'
    if (errors.content) {
        textAreaClass += ' is-invalid'
    }
    const onChangeFile = (e) => {
        if (e.target.files.length < 1) {
            return
        }
        const file = e.target.files[0]
        const filereader = new FileReader();
        filereader.onloadend = () => {
            setNewImage(filereader.result)
            uploadFile(file)
        }
        filereader.readAsDataURL(file)
    }
    const uploadFile = async (file) => {
        const attachment = new FormData()
        attachment.append("file", file)
        const response = await postHoaxAttachment(attachment)
        setAttachmentId(response.data.id)


    }
    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault className='rounded-circle mx-2' width={48} height={48}
                                     image={image}></ProfileImageWithDefault>

            <div className='flex-fill'>
                <textarea
                    className={textAreaClass} rows={focused ? 3 : 1}
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setHoax(e.target.value)}
                    value={hoax}

                />
                <div className='invalid-feedback'>{errors.content}</div>


                {focused &&
                    <>
                        {!newImage && <input type='file' onChange={onChangeFile}/>}
                        {newImage && <AutoUploadImage uploading={pendingFileUpload} image={newImage}/>}
                        <div className='mt-2 d-flex justify-content-end'>

                            <ButtonWithProgress className='btn btn-primary'
                                                disabled={pendinApicall || pendingFileUpload}
                                                text={'Hoaxify'}
                                                pendingApiCall={pendinApicall}
                                                onClick={onClickHoaxify}/>
                            <button onClick={() => setFocused(false)}
                                    className='btn btn-danger d-inline-flex' style={{marginLeft: 15}}
                                    disabled={pendinApicall || pendingFileUpload}
                            >
                        <span className="material-icons">
                        cancel
                        </span>

                                {t('Cancel')}
                            </button>
                        </div>
                    </>
                }


            </div>


        </div>
    );
};

export default HoaxSubmit;