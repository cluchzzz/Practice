import React from 'react';
import {NavLink} from "react-router-dom";
import Logo from "../logo/Logo";
import './footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__head">
                    <Logo type={'dark'}/>
                </div>
                <span>© 2023 My company</span>
            </div>
        </footer>
    );
};

export default Footer;