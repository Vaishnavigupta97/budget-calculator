import logo from './logo.svg';
import react, { useEffect, useState } from "react";
import './App.css';
import ExpenseList from "./Components/ExpenseList";
import ExpenseForm from "./Components/ExpenseForm";
import Alert from "./Components/Alert";
import { MdUnpublished } from 'react-icons/md';
// import uuid from "uuid/v4";
import { v4 as uuidv4 } from 'uuid';

// const initialExpress = [
//   {id : 1, charge: "rent", amount : 1600},
//   {id : 2, charge: "car payment", amount : 400},
//   {id : 3, charge: "credit card bill", amount : 1200},
// ]
const initialExpress = localStorage.getItem('expenses') ?
  JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpress);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0);
  useEffect(() => {
    console.log("useEffect called");
    localStorage.setItem('expenses', JSON.stringify(expenses));
  })
  // ************************functaionality*******************
  const handleCharge = (e) => {
    console.log(`charge ${e.target.value}`);
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    console.log(`amount ${e.target.value}`);
    setAmount(e.target.value)
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "succses", text: "Item edited" })
      } else {
        const singleExpense = {id : uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "succses", text: "Item added" })
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: `Charge can't be empty value and amount value has to bigger than zero` })
    }
  }
  // clear all items 
  const clearItem = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All item deleted" });
  }
  // handle delete 
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted" });
    console.log(`item deleted : ${id}`);
  }
  // handle edit 
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id)
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <>
      <div className='budget-calculator'>
        <div className="App">
          {alert.show && <Alert type={alert.type} text=
            {alert.text} />}
          <Alert />
          <h1>Budget Calculator</h1>
          <div className='formButtons'>
          <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit} />
          <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItem={clearItem} />
          </div>
        </div>
        <h1 className='totalSpend'>
          total spending : {" "}
          <span className='total'>
            ${expenses.reduce((acc, curr) => {
              return (acc += parseInt(curr.amount));
            }, 0)}
          </span>
        </h1>
      </div>
    </>
  );
}

export default App;
