import React from 'react';
import {ReactComponent as CloseSmall} from "../../../assets/icons/close-small.svg";
import './alert.css'

const Alert = ({alert, setAlert}) => {
    return (
        <div className="alert">
            <small>{alert}</small>
            <CloseSmall onClick={() => setAlert(null)} />
        </div>
    );
};

export default Alert;