import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import WorkService from "../../services/WorkService";
import Table from "../UI/table/Table";
import Search from "../UI/search/Search";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";
import './work-tab.css'

const WorkTab = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate();



    useEffect(() => {
        if (fetching) {
            WorkService.getAllWorks(page, limit)
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
                    name: item.name,
                    faculty: item.faculty,
                    chair: item.chair,
                    lab: item.lab,
                    position: item.position,
                    positionStartDate: item.positionStartDate,
                    positionEndDate: item.positionEndDate,
                    workName: item.workName,
                    customer: item.customer,
                    customerAddress: item.customerAddress,
                    submission: item.submission,
                    branch: item.branch,
                    report: item.fileId ? <Link to={`http://localhost:7000/api/file?id=${item.fileId}`}><Button type={'small'}>Завантажити звіт</Button></Link> : 'Немає звіту'
                }
            }
        })
    }

    const searchHandler = () => {
        setPage(1)

        WorkService.getAllWorks({page: 1, limit, query: search})
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

        WorkService.getAllWorks({page: 1, limit, query: ''})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const removeHandler = async (id) => {
        await WorkService.deleteWork(id)
        navigate(0)
    }

    return (
        <div className='work-tab'>
            <div className="work-tab__header">
                <div className="work-tab__left">
                    <h1>Наукові роботи</h1>
                    <p>На цій сторінці будуть відображатись всі наукові роботи.</p>
                </div>
                <div className="work-tab__right">
                    <Search value={search} setValue={setSearch} handler={searchHandler} clearHandler={clearHandler}/>
                </div>
            </div>
            {alert && <Alert alert={alert} setAlert={setAlert}/>}
            <Table head={['П.І.П', 'Факультет', 'Кафедра', 'Лабораторія', 'Посада', 'Початок перебування', 'Кінець перебування', 'Робота', 'Замовник', 'Адреса замовника', 'Підпорядкування', 'Галузь', 'Звіт']} list={transformList(list)} remove={(id) => removeHandler(id)} />
        </div>
    );
};

export default WorkTab;