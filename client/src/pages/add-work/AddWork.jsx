import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Alert from "../../components/UI/alert/Alert";
import Table from "../../components/UI/table/Table";
import {Link, Navigate} from "react-router-dom";
import Button from "../../components/UI/button/Button";
import UserService from "../../services/UserService";
import './add-work.css'
import Form from "../../components/UI/form/Form";
import InputText from "../../components/UI/input-text/InputText";
import InputUpload from "../../components/UI/input-upload/InputUpload";
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import WorkService from "../../services/WorkService";

const AddWork = () => {
    const {user, isAuth} = useSelector(state => state.user)
    const [works, setWorks] = useState([])
    const [fetching, setFetching] = useState(true)
    const [form, setForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)

    const [name, setName] = useState('')
    const [faculty, setFaculty] = useState('')
    const [chair, setChair] = useState('')
    const [lab, setLab] = useState('')
    const [position, setPosition] = useState('')
    const [positionStartDate, setPositionStartDate] = useState('')
    const [positionEndDate, setPositionEndDate] = useState('')
    const [workName, setWorkName] = useState('')
    const [customer, setCustomer] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')
    const [submission, setSubmission] = useState('')
    const [branch, setBranch] = useState('')
    const [file, setFile] = useState({})

    useEffect(() => {
        if (fetching && user.id) {
            UserService.getUser(user?.id).then(response => {
                setWorks(response?.data?.userWorks)
            }).finally(() => {
                setFetching(false)
            })
        }
    }, [fetching])

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
                    report: item.fileId ? <Link to={`http://localhost:7000/api/file?id=${item.fileId}`}><Button type={'small'}>Завантажити звіт</Button></Link> : 'Немає звіту',
                }
            }
        })
    }

    const addHandler = async () => {
        const data = {
            name,
            faculty,
            chair,
            lab,
            position,
            positionStartDate,
            positionEndDate,
            workName,
            customer,
            customerAddress,
            submission,
            branch
        }

        await WorkService.addWork(data)
        setForm(false)
    }

    const editHandler = async () => {
        let formData = new FormData()

        formData.append('id', editId);
        formData.append('name', name);
        formData.append('faculty', faculty);
        formData.append('chair', chair);
        formData.append('lab', lab);
        formData.append('position', position);
        formData.append('positionStartDate', positionStartDate);
        formData.append('positionEndDate', positionEndDate);
        formData.append('workName', workName);
        formData.append('customer', customer);
        formData.append('customerAddress', customerAddress);
        formData.append('submission', submission);
        formData.append('branch', branch);
        formData.append('file', file);

        await WorkService.editWork(formData)
        setEditForm(false)
    }

    useEffect(() => {
        if (editForm && editId){
            WorkService.getWork(editId).then(response => {
                setName(response.data.name)
                setFaculty(response.data.faculty)
                setChair(response.data.chair)
                setLab(response.data.lab)
                setPosition(response.data.position)
                setPositionStartDate(response.data.positionStartDate)
                setPositionEndDate(response.data.positionEndDate)
                setWorkName(response.data.workName)
                setCustomer(response.data.customer)
                setCustomerAddress(response.data.customerAddress)
                setSubmission(response.data.submission)
                setBranch(response.data.branch)
            })
        }
    }, [editForm]);

    return (
        <div className='add-work'>
            {isAuth ?
                <div className="container">
                    <div className="add-work__header">
                        <div className="add-work__left">
                            <h1>Наукові роботи</h1>
                            <p>На цій сторінці будуть відображатись всі наукові роботи.</p>
                        </div>
                        <div className="add-work__right">
                            <Button type={'primary'} onClick={() => setForm(true)}><Plus/></Button>
                        </div>
                    </div>
                    {alert && <Alert alert={alert} setAlert={setAlert}/>}
                    <Table head={['П.І.П', 'Факультет', 'Кафедра', 'Лабораторія', 'Посада', 'Початок перебування', 'Кінець перебування', 'Робота', 'Замовник', 'Адреса замовника', 'Підпорядкування', 'Галузь', 'Звіт']}
                           list={transformList(works)}
                           edit={(id) => {
                               setEditId(id)
                               setEditForm(true)
                           }}
                    />
                    {form && <Form header={'Додати наукову роботу'} text={'Форма для додавання нової наукової роботи'} alert={alert} setAlert={setAlert} error={error} setError={setError} setForm={setForm} btnHandler={(event) => {
                        event.preventDefault()
                        addHandler()
                    }} btnText={'Додати роботу'}>
                        <InputText name={'П.І.П'} value={name} onChange={(event => setName(event.target.value))}/>
                        <InputText name={'Факультет'} value={faculty} onChange={(event => setFaculty(event.target.value))}/>
                        <InputText name={'Кафедра'} value={chair} onChange={(event => setChair(event.target.value))}/>
                        <InputText name={'Лабораторія'} value={lab} onChange={(event => setLab(event.target.value))}/>
                        <InputText name={'Посада'} value={position} onChange={(event => setPosition(event.target.value))}/>
                        <InputText name={'Початок перебування'} type={'date'} value={positionStartDate} onChange={(event => setPositionStartDate(event.target.value))}/>
                        <InputText name={'Кінець перебування'} type={'date'} value={positionEndDate} onChange={(event => setPositionEndDate(event.target.value))}/>
                        <InputText name={'Робота'} value={workName} onChange={(event => setWorkName(event.target.value))}/>
                        <InputText name={'Замовник'} value={customer} onChange={(event => setCustomer(event.target.value))}/>
                        <InputText name={'Адреса замовника'} value={customerAddress} onChange={(event => setCustomerAddress(event.target.value))}/>
                        <InputText name={'Підпорядкування'} value={submission} onChange={(event => setSubmission(event.target.value))}/>
                        <InputText name={'Галузь'} value={branch} onChange={(event => setBranch(event.target.value))}/>
                    </Form>}


                    {editForm && <Form header={'Редагувати наукову роботу'} text={'Форма для Редагування наукової роботи'} alert={alert} setAlert={setAlert} error={error} setError={setError} setForm={setEditForm} btnHandler={(event) => {
                        event.preventDefault()
                        editHandler()
                    }} btnText={'Редагувати роботу'}>
                        <InputText name={'П.І.П'} value={name} onChange={(event => setName(event.target.value))}/>
                        <InputText name={'Факультет'} value={faculty} onChange={(event => setFaculty(event.target.value))}/>
                        <InputText name={'Кафедра'} value={chair} onChange={(event => setChair(event.target.value))}/>
                        <InputText name={'Лабораторія'} value={lab} onChange={(event => setLab(event.target.value))}/>
                        <InputText name={'Посада'} value={position} onChange={(event => setPosition(event.target.value))}/>
                        <InputText name={'Початок перебування'} type={'date'} value={positionStartDate} onChange={(event => setPositionStartDate(event.target.value))}/>
                        <InputText name={'Кінець перебування'} type={'date'} value={positionEndDate} onChange={(event => setPositionEndDate(event.target.value))}/>
                        <InputText name={'Робота'} value={workName} onChange={(event => setWorkName(event.target.value))}/>
                        <InputText name={'Замовник'} value={customer} onChange={(event => setCustomer(event.target.value))}/>
                        <InputText name={'Адреса замовника'} value={customerAddress} onChange={(event => setCustomerAddress(event.target.value))}/>
                        <InputText name={'Підпорядкування'} value={submission} onChange={(event => setSubmission(event.target.value))}/>
                        <InputText name={'Галузь'} value={branch} onChange={(event => setBranch(event.target.value))}/>
                        <InputUpload onChange={(event) => setFile(event.target.files[0])}>Завантажити або оновити звіт</InputUpload>
                    </Form>}
                </div>
                :
                <h1>Увійдіть в аккаунт або зареєструйтеся, щоб додавати свої роботи</h1>
            }
        </div>
    );
};

export default AddWork;