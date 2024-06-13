import React, {useEffect, useState} from 'react';
import UserService from "../../services/UserService";
import Table from "../UI/table/Table";
import Search from "../UI/search/Search";
import InputText from "../UI/input-text/InputText";
import Form from "../UI/form/Form";
import Select from "../UI/select/Select";
import Button from "../UI/button/Button";
import './users-form.css'
import Alert from "../UI/alert/Alert";

const UsersForm = () => {
    const [search, setSearch] = useState('')
    const [id, setId] = useState('')
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [alert, setAlert] = useState(false)

    //form
    const [editForm, setEditForm] = useState(false)
    const [options] = useState(['member', 'admin', 'moderator'])
    const [selected, setSelected] = useState(options[0])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [restorePassword, setRestorePassword] = useState(false)

    useEffect(() => {
        if (fetching) {
            UserService.getUsers({page, limit, query: search})
                .then((response) => {
                    setList([...list, ...response.data])
                    setPage(prevState => prevState + 1)
                    setTotalCount(response.headers['x-total-count'])
                }).catch(err => {
                setError(err)
            }).finally(() => {
                setFetching(false)
            })
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            return document.removeEventListener('scroll', scrollHandler)
        }
    }, [list])

    useEffect(() => {
       if (id) {
           UserService.getUser(id)
               .then((response) => {
                   setSelected(response.data.role)
                   console.log(id)
               }).catch(err => {
               setError(err)
           })
       }
    }, [id])

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])


    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && list.length < totalCount) {
            setFetching(true)
        }
    }

    const transformList = (list) => {
        return list.map(item => {

            return {
                id: item._id,
                item: {
                    id: item._id,
                    username: item.username,
                    email: item.email,
                    role: item.role,
                    isActivated: item.isActivated ? 'Yes' : 'No'
                }
            }
        })
    }

    const editHandler = (id) => {
        setId(id)
        setEditForm(true)
    }

    const searchHandler = () => {
        setPage(1)

        UserService.getUsers({page: 1, limit, query: search})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const clearHandler = () => {
        setPage(1)
        setSearch('')

        UserService.getUsers({page: 1, limit, query: ''})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const editFormHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await UserService.editUser({id, username, email, restorePassword, role: selected})

            setEditForm(false)
            setAlert('User edited')
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    const restorePasswordHandler = (e) => {
        e.preventDefault()
        setRestorePassword(!restorePassword)
    }

    const deleteHandler = (e) => {
        e.preventDefault()

        UserService.deleteUser(id)
            .catch(err => {
                setError(err)
            })

        setEditForm(false)
    }

    return (
        <div className='users-form'>
            <div className="users-form__header">
                <div className="users-form__left">
                    <h1>Користувачі</h1>
                    <p>Тут відображаються всі користувачі додатку</p>
                </div>
                <div className="users-form__right">
                    <Search value={search} setValue={setSearch} handler={searchHandler} clearHandler={clearHandler}/>
                </div>
            </div>
            {alert && <Alert alert={alert} setAlert={setAlert}/>}
            <Table head={['ID', 'Ім\'я користувача', 'E-mail', 'Роль', 'Статус верифікації']} list={transformList(list)} edit={editHandler}/>
            {editForm && <Form error={error} setError={setError} setForm={setEditForm} header={'Add product'} text={'Here you can add a product and information about it'} btnHandler={editFormHandler} btnText={'Save'} alert={alert} setAlert={setAlert}>
                <Select name={'Role'} options={options} selected={selected} setSelected={setSelected} />
                <InputText name={'Username'} type={'text'} value={username || ''} onChange={(e) => setUsername(e.target.value)}/>
                <InputText name={'Email'} type={'email'} value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
                <Button type={restorePassword && 'primary'} onClick={(e) => restorePasswordHandler(e)}>Restore user password</Button>
                <Button type={'primary'} onClick={(e) => deleteHandler(e)}>Delete user</Button>
            </Form>}
        </div>
    );
};

export default UsersForm;