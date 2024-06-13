import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setError} from "../../store/reducers/UserReducer";
import {ReactComponent as Close} from "../../assets/icons/close.svg";
import InputText from "../UI/input-text/InputText";
import Button from "../UI/button/Button";
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import './login-form.css';


const LoginForm = ({setLoginForm, setRegistrationForm}) => {
    const dispatch = useDispatch()
    const {isAuth, error} = useSelector(state => state.user)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorData, setErrorData] = useState(false)

    useEffect(() => {
        dispatch(setError(null))
    }, [])

    useEffect(() => {
        setErrorData(error)
    }, [error])

    useEffect(() => {
        if (isAuth){
            setLogin('')
            setPassword('')
            setLoginForm(false)
            setRegistrationForm(false)
        }
    }, [isAuth])

    const changeForm = () => {
        setLoginForm(false)
        setRegistrationForm(true)
    }

    const loginFormHandler = (e) => {
        dispatch(loginUser({username: login, password}))
    }

    return (
        <div className='login-form' onClick={() => setLoginForm(false)}>
            <form className="login-form__content" onClick={(e) => e.stopPropagation()}>
                <div className="login-form__close">
                    <Close onClick={() => setLoginForm(false)}/>
                </div>
                <div className="login__form__header">
                    <h1>Вхід</h1>
                    <p>Новий користувач? <span onClick={changeForm}>Зробити аккаунт</span></p>
                </div>
                <div className="login__form__input">
                    <InputText name={'Ім\'я користувача'} type={'text'} placeholder={'Username'} value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <InputText name={'Пароль'} type={'password'} placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button type={'primary'} onClick={(e) => loginFormHandler(e)}>Вхід</Button>
                {errorData && <ErrorAlert error={error} setError={setErrorData}/>}
            </form>
        </div>
    );
};

export default LoginForm;