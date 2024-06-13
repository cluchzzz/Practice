import React, {useState} from 'react';
import classNames from "classnames";
import {ReactComponent as Chevron} from "../../../assets/icons/chevron.svg";
import './select.css'

const Select = ({name = '', options, selected, setSelected}) => {
    const [open, setOpen] = useState(false)

    const cl = classNames({
        'select': true,
        'open': open === true
    })

    const selectHandler = (option) => {
        setSelected(option)
        setOpen(false)
    }

    return (
        <div className={cl}>
            <strong className="select__name">{name}</strong>
            <div className="select__selector">
                <div className="select__header" onClick={() => setOpen(!open)}>
                    <small>{selected}</small>
                    <Chevron/>
                </div>
                {open && <div className="select__menu">
                    {options.map(option => <small key={option} onClick={() => selectHandler(option)}>{option}</small>)}
                </div>}
            </div>
        </div>
    );
};

export default Select;