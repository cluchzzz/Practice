import React from 'react';
import {ReactComponent as CloseSmall} from "../../../assets/icons/close-small.svg";
import './error-alert.css'

const ErrorAlert = ({error, setError}) => {
    return (
        <div className="error-alert">
            <small>{error}</small>
            <CloseSmall onClick={() => setError(null)} />
        </div>
    );
};

export default ErrorAlert;