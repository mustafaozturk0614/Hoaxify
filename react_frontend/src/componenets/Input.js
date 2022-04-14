import React from "react";


const Input = (props) => {
    const {label, error, name, onChange, type, defaultValue} = props
    let clasName = 'form-control';
    if (type === 'file') {
        clasName += '-file'
    }
    if (error !== undefined) {
        clasName += ' is-valid'
    }
    const className = error ? 'form-control is-invalid' : 'form-control'
    return (
        <div className='form-group'>
            <label> {label}</label>
            <input type={type} className={className} name={name} onChange={onChange} defaultValue={defaultValue}/>
            <div className="invalid-feedback">{error}</div>

        </div>


    )

}
export default Input;