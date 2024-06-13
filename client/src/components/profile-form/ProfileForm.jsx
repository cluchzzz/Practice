import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import {useFetchingForAuth} from "../../hooks";
import InputButton from "../UI/input-button/InputButton";
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import Loader from "../UI/loader/Loader";
import './profile-form.css'
import Alert from "../UI/alert/Alert";


const ProfileForm = () => {
    const {user, isAuth} = useSelector(state => state.user)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [errorMessage, isLoading, data] = useFetchingForAuth(async () => {
        if (isAuth) return  await UserService.getUser(user?.id)
    }, isAuth)

    useEffect(() => {
        if (!data) return
        setUsername(data.username)
        setEmail(data.email)
    }, [data])

    useEffect(() => {
        if (errorMessage){
            setError(errorMessage)
        }
    }, [errorMessage])

    useEffect(() => {
        if (alert){
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])

    const changeUsernameHandler = async () => {
        try {
            const userResponse = await UserService.getUser(user?.id)


            if (userResponse.data.username === username) {
                setError('Username must be the same')
            }else {
                const changeResponse = await UserService.changeUsername(username)

                setUsername(changeResponse.data.username)
                setError(false)
                setAlert('Username updated')
            }
        } catch (e) {
            setError(e.response?.data?.message)
            console.log(e.response?.data?.message)
        }


    }

    const changeEmailHandler = async () => {
        try {
            const userResponse = await UserService.getUser(user?.id)


            if (userResponse.data.email === email) {
                setError('Email must be the same')
            }else {
                const changeResponse = await UserService.changeEmail(email)

                setUsername(changeResponse.data.email)
                setError(false)
                setAlert('Email updated')
            }
        } catch (e) {
            setError(e.response?.data?.message)
            console.log(e.response?.data?.message)
        }
    }

    if (isLoading) return <Loader/>

    return (
        <div className='profile-form'>
            <div className="profile-form__header">
                <h1>Профіль</h1>
                <p>Ви можете змінити налаштування профілю</p>
            </div>
            <div className="profile-form__forms">
                <div className="profile-form__form">
                    <strong>Ім'я користувача</strong>
                    <InputButton btnText={'Редагувати'} onClick={changeUsernameHandler} value={username || ''} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="profile-form__form">
                    <strong>E-mail</strong>
                    <InputButton btnText={'Редагувати'} onClick={changeEmailHandler} value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            {error  && <ErrorAlert error={error} setError={setError}/>}
            {alert  && <Alert alert={alert} setAlert={setAlert}/>}
        </div>
    );
};

export default ProfileForm;