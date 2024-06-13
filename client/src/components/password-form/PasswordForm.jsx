import React, {useEffect, useState} from 'react';
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import Button from "../UI/button/Button";
import InputText from "../UI/input-text/InputText";
import UserService from "../../services/UserService";
import './password-form.css'
import Alert from "../UI/alert/Alert";


const PasswordForm = () => {
    const [currPassword, setCurrPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (alert){
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])

    const changePasswordHandler = async () => {
        try {
            if (newPassword !== confirmPassword){
                setError('Password and Confirm Password must be the same')
            }else {
                await UserService.changePassword(currPassword, confirmPassword)

                setError(null)
                setAlert('Password updated')
            }
        } catch (e) {
            setError(e.response?.data?.message)
            console.log(e.response?.data?.message)
        }
    }

    return (
        <div className='password-form'>
            <div className="password-form__header">
                <h1>Пароль</h1>
                <p>З міркувань безпеки ми рекомендуємо вибрати пароль, який ви ще не використовували для інших облікових записів.</p>
            </div>
            <div className="password-form__forms">
                <div className="password-form__form">
                    <InputText name={'Поточний пароль'} type={'password'} value={currPassword} onChange={(e) => setCurrPassword(e.target.value)} />
                </div>
                <div className="password-form__form">
                    <InputText name={'Новий пароль'} type={'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="password-form__form">
                    <InputText name={'Введіть новий пароль ще раз'} type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
            </div>
            <Button type={'primary'} onClick={changePasswordHandler}>Зберегти</Button>
            {error  && <ErrorAlert error={error} setError={setError}/>}
            {alert  && <Alert alert={alert} setAlert={setAlert}/>}
        </div>
    );
};

export default PasswordForm;