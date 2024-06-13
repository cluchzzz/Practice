import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/UI/button/Button";
import TabsButtons from "../../components/tabs-buttons/TabsButtons";
import UsersForm from "../../components/users-form/UsersForm";
import AdminWorkTab from "../../components/admin-work-tab/AdminWorkTab";
import './admin-page.css'

const AdminPage = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState('користувачі')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(false)
    }, [selected])

    return (
        <div className='admin-page'>
            <div className="container">
                <div className="admin-page__tabs">
                    <div className="admin-page__tab-selected">
                        <Button onClick={() => setVisible(!visible)}>{selected}</Button>
                    </div>
                    <div className="admin-page__tabs">
                        <TabsButtons selected={selected} setSelected={setSelected} buttons={['користувачі', 'роботи']} />
                        <Button type={'primary'} onClick={() => navigate('/')}>Вийти з панелі</Button>
                    </div>
                </div>
                <div className="admin-page__form">
                    {selected == 'користувачі' && <UsersForm/>}
                    {selected == 'роботи' && <AdminWorkTab/>}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;