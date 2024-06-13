import React from 'react';
import {ReactComponent as Close} from "../../../assets/icons/close.svg";
import Button from "../button/Button";
import ErrorAlert from "../error-alert/ErrorAlert";
import Alert from "../alert/Alert";
import './form.css'


const Form = ({header, text, setForm, btnHandler, btnText, error, setError, alert, setAlert, children}) => {

    return (
        <div className='form' onClick={() => setForm(false)}>
            <div className="form__content-container">
                <form className="form__content" onClick={(e) => e.stopPropagation()}>
                    <div className="form__close">
                        <Close onClick={() => setForm(false)}/>
                    </div>
                    <div className="form__header">
                        <h1>{header}</h1>
                        <p>{text}</p>
                    </div>
                    <div className="form__input">
                        {children}
                    </div>
                    {btnHandler && <Button type={'primary'} onClick={btnHandler}>{btnText}</Button>}
                    {error && <ErrorAlert error={error} setError={setError}/>}
                    {alert && <Alert error={alert} setError={setAlert}/>}
                </form>
            </div>
        </div>
    );
};

export default Form;