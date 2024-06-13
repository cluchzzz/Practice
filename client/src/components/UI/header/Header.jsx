import React, {useEffect, useState} from 'react';
import {Link, Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../store/reducers/UserReducer";
import Logo from "../logo/Logo";
import Button from "../button/Button";
import './header.css'

const Header = ({loginForm, setLoginForm, registrationForm, setRegistrationForm}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth, user} = useSelector(store => store.user)
    const [navOpen, setNavOpen] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        if (navOpen){
            setNavOpen(false)
            document.body.classList.remove('navOpen')
        }
    }, [pathname, loginForm, registrationForm])

    const navOpenHandler = () => {
        if (!navOpen){
            setNavOpen(true)
            document.body.classList.add('navOpen')
        } else {
            setNavOpen(false)
            document.body.classList.remove('navOpen')
        }
    }

    const logoutHandler = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <div className='header'>
           <div className="container">
               <div className="header__logo">
                   <Logo type={navOpen && 'dark'}/>
               </div>
               <nav>
                   <NavLink to="/"  className={({ isActive}) => isActive ? "active" : ""}>Домашня</NavLink>
                   {isAuth ? <NavLink to="/myworks" className={({ isActive}) => isActive ? "active" : ""}>МоЇ роботи</NavLink> : ''}
               </nav>
               <div className="header__buttons">
                   {(isAuth)
                       ? (
                           <>
                               {(user.role == 'admin' || user.role == 'moderator') && <Link to='admin'><Button type='primary'>Панель адміністратора</Button></Link>}
                               <Link to='profile'><Button type='primary'>Профіль</Button></Link>
                               <Button onClick={logoutHandler}>Вихід</Button>
                           </>
                       )
                       :(
                           <>
                               <Button type='primary' onClick={() => setRegistrationForm(true)}>Реєстрація</Button>
                               <Button onClick={() => setLoginForm(true)}>Вхід</Button>
                           </>
                       )
                   }
               </div>
               <span className="header__burger-btn" onClick={navOpenHandler}></span>
           </div>
        </div>
    );
};

export default Header;