import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./components/UI/header/Header";
import Footer from "./components/UI/footer/Footer";
import LoginForm from "./components/login-form/LoginForm";
import RegistrationForm from "./components/registration-form/RegistrationForm";
import {useDispatch} from "react-redux";
import {checkAuth} from "./store/reducers/UserReducer";

function App() {
    const dispatch = useDispatch()
    const [loginForm, setLoginForm] = useState(false)
    const [registrationForm, setRegistrationForm] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

  return (
    <div className="App">
        <Header loginForm={loginForm} setLoginForm={setLoginForm} registrationForm={registrationForm} setRegistrationForm={setRegistrationForm} />
        <Outlet></Outlet>
        <Footer/>
        {loginForm && <LoginForm setLoginForm={setLoginForm} setRegistrationForm={setRegistrationForm}/>}
        {registrationForm && <RegistrationForm setLoginForm={setLoginForm} setRegistrationForm={setRegistrationForm}/>}
    </div>
  );
}

export default App;
