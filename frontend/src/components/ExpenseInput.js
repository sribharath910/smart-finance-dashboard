import React, { useState } from "react";

function ExpenseInput({ expenses, setExpenses, setIncome }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [income, localSetIncome] = useState("");

  const addExpense = () => {
    if (category && amount) {
      setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
      setCategory("");
      setAmount("");
    }
  };

  const removeExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const saveIncome = () => {
    setIncome(parseFloat(income));
    localSetIncome("");
  };

  return (
    <div className="expense-input">
      <h2>Manage Expenses</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addExpense}>Add Expense</button>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category}: ${expense.amount}
            <button onClick={() => removeExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Set Income</h2>
      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) => localSetIncome(e.target.value)}
      />
      <button onClick={saveIncome}>Save Income</button>
    </div>
  );
}

export default ExpenseInput;
