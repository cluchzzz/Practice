import React from 'react';
import Button from "../button/Button";
import './input-button.css'

const InputButton = ({onClick, btnText, ...props}) => {
    return (
        <div className='input-button'>
            <input type="text" {...props}/>
            <Button type={'primary'} onClick={onClick}>{btnText}</Button>
        </div>
    );
};

export default InputButton;