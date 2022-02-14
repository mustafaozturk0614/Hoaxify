import React from 'react';

const ButtonWithProgress = (props) => {
    const {onClick, pendingApiCall, disabled, text} = props
    return (
        <div>
            <button disabled={disabled} className='btn btn-primary'
                    onClick={onClick}>
                {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                {text}
            </button>
        </div>
    );
};

export default ButtonWithProgress;