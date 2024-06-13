import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as Close} from "../../../assets/icons/close.svg";
import './textarea.css'

const Textarea = ({name= '', serial, setSerial, ...props}) => {
    const [input, setInput] = useState('')
    const [active, setActive] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.addEventListener('keydown', submitHandler)
    }, [input, serial])

    const submitHandler = (e) => {
        if (input === '' && e.key === 'Enter') {
            e.preventDefault()
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            setSerial([...serial, input])
            setInput('')
        }

        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault()
            const newArray = [...serial];
            newArray.pop();
            setSerial(newArray);
        }
    }

    const itemHandler = (item) => {
        setActive(item)
    }

    const removeHandler = (filter) => {
        setSerial(serial.filter(item => filter != item))
    }


    return (
        <div className='textarea'>
            <strong>{name}</strong>
            <div className='textarea__input' {...props} onClick={() => {inputRef.current.focus()}}>
                <ul>
                    {serial.map(serial => <li key={Date.now() + Math.random() + serial} className={(active == serial && 'active') || ''} onClick={() => itemHandler(serial)}>{serial} {active == serial && <Close onClick={() => removeHandler(serial)}/>}</li>)}
                    <li><input type="text" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} /></li>
                </ul>
            </div>
        </div>
    );
};

export default Textarea;