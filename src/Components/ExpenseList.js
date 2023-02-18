import ExpenseItem from "./ExpenseItem"; 
import {MdDelete} from 'react-icons/md'

function ExpenseList({expenses,handleEdit, handleDelete,clearItem}){
    return(
        <>
        <ul>
        {expenses.map((element)=>{
            return <ExpenseItem key = {element.id} element={element} handleDelete = {handleDelete} handleEdit= {handleEdit}/>  
        })}
        </ul>
        {expenses.length >0 && <button className="btn" onClick={clearItem}>clear expenses
        <MdDelete className="btn-icon" />
        </button> }
        </>
    )
}
export default ExpenseList;