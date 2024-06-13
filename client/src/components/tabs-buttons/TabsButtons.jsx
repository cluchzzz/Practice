import React from 'react';
import './tabs-buttons.css'
import Button from "../UI/button/Button";


const TabsButtons = ({selected, setSelected, buttons = []}) => {
    return (
        <div className='tabs-buttons'>
            {buttons.map(btn => <Button key={btn} type={selected === btn && 'primary'} onClick={() => setSelected(btn)}>{btn}</Button>)}
        </div>
    );
};

export default TabsButtons;