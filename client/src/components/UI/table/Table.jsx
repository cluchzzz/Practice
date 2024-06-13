import React from 'react';
import {ReactComponent as Edit} from "../../../assets/icons/edit.svg";
import { v4 as uuidv4 } from 'uuid';
import './table.css'
import Button from "../button/Button";

const Table = ({head = [], list = [], edit, remove}) => {

    return (
        <table>
            <tbody>
                <tr style={{height: '20px'}}></tr>
            </tbody>
            <tbody>
            {list.map(item => {
                const values = Object.values(item.item);

                return (
                    <tr key={uuidv4()}>
                        {values.map((value, index) => (
                            <td key={index}><span>{head[index] + ': '}</span>{value}</td>
                        ))}
                        {edit && <td onClick={() => edit(item.id)}><Edit/></td>}
                        {remove && <td onClick={() => remove(item.id)}><Button>Видалити</Button></td>}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default Table;