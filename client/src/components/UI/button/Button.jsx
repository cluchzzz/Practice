import React from 'react';
import classNames from "classnames";
import './button.css'

const Button = ({type = 'default', children, ...props},) => {
    const cl = classNames({
        'button': true,
        'button--default': type === 'default',
        'button--primary': type === 'primary',
        'button--small': type === 'small',
    })

    return (
        <button className={cl} {...props}>
            {children}
        </button>
    );
};

export default Button;