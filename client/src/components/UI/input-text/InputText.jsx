import React from 'react';
import './input-text.css'

const InputText = ({name, ...props}) => {
    return (
        <div className='input-text'>
            <strong>{name}</strong>
            <input {...props} />
        </div>
    );
};

export default InputText;