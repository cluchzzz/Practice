import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registrationUser, setError} from "../../store/reducers/UserReducer";
import InputText from "../UI/input-text/InputText";
import Button from "../UI/button/Button";
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import {ReactComponent as Close} from "../../assets/icons/close.svg";
import './registration-form.css'


const RegistrationForm = ({setLoginForm, setRegistrationForm}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorData, setErrorData] = useState(null)
    const {isAuth, error} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(setError(null))
    }, [])

    useEffect(() => {
        setErrorData(error)
    }, [error])

    useEffect(() => {
        if (isAuth){
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setLoginForm(false)
            setRegistrationForm(false)
        }
    }, [isAuth])

    useEffect(() => {
        if (error){
            setErrorData(error)
        }
    }, [error])

    const changeForm = () => {
        setLoginForm(true)
        setRegistrationForm(false)
    }

    const registrationFormHandler = (e) => {
        dispatch(setError(false))

        if (password !== confirmPassword){
            dispatch(setError('Password and Confirm Password must be the same'))
        }else {
            dispatch(registrationUser({username, email, password, confirmPassword}))
        }
    }

    return (
        <div className='registration-form' onClick={() => setRegistrationForm(false)}>
            <form className="registration-form__content" onClick={(e) => e.stopPropagation()}>
                <div className="registration-form__close">
                    <Close onClick={() => setRegistrationForm(false)}/>
                </div>
                <div className="registration-form__header">
                    <h1>sign in</h1>
                    <p>Вже зареєстровані? <span onClick={changeForm}>Вхід</span></p>
                </div>
                <div className="registration-form__input">
                    <InputText name={'Ім\'я користувача'} type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <InputText name={'E-mail'} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <InputText name={'Пароль'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <InputText name={'Повторити Пароль'} type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <Button type={'primary'} onClick={(e) => registrationFormHandler(e)}>Реєстрація</Button>
                {errorData && <ErrorAlert error={errorData} setError={setErrorData}/>}
            </form>
        </div>
    );
};

export default RegistrationForm;