import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

function ExpenseItem({ element,handleEdit, handleDelete }) {
    const { id, charge, amount } = element
    return (
        <>
            <li className="item">
                <div className="info">
                    <span className="expense">{charge}</span>
                </div>
                <span className="amount">${amount}</span>
                <div className="editClearParentBtn">
                <button className="edit-btn" aria-label="edit button" onClick={()=>handleEdit(id)}><MdEdit/></button>
                <button className="clear-btn" aria-label="delete button" onClick={()=>handleDelete(id)}><MdDelete/></button>
                </div>
            </li>
        </>
    )
}
export default ExpenseItem;