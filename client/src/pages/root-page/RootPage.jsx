import React from 'react';
import './root-page.css'
import WorkTab from "../../components/work-tab/WorkTab";

const RootPage = () => {

    return (
        <div className='root-page'>
            <div className="container">
                <WorkTab/>
            </div>
        </div>
    );
};

export default RootPage;