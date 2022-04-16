import React from 'react';
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "./ButtonWithProgress";

const Modal = ({visble, onClickCancel, message, onClickOk, pendingApiCall, title, okButton}) => {
    let className = 'modal';
    if (visble) {
        className += ' show d-block'
    }
    const {t} = useTranslation()
    return (
        <div className={className} style={{backgroundColor: '#000000b0'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <span>{message}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClickCancel} disabled={pendingApiCall}
                                className="btn btn-secondary">{t('Cancel')} </button>
                        <ButtonWithProgress
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall}
                            onClick={onClickOk}
                            className="btn btn-danger"
                            text={okButton}

                        />

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Modal;