import React from 'react';
import './input-upload.css'

const InputUpload = ({children, ...props}) => {
    return (
        <label htmlFor="input-upload-form" className='input-upload'>
            <input type="file" {...props} id='input-upload-form'></input>
            {children}
        </label>
    );
};

export default InputUpload;