import React from 'react';
import classNames from "classnames";
import './logo.css'

const Logo = ({type = 'light'}) => {
    const cl = classNames({
        'logo': true,
        'logo--light': type === 'light',
        'logo--dark': type === 'dark',
    })

    return (
        <div className={cl}>
            <div className="logo__main">Наукові роботи кафедри</div>
            <span>Ведення та аналіз наукових робіт</span>
        </div>
    );
};

export default Logo;