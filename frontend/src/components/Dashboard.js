import React, { useState, useEffect } from "react";
import ExpenseInput from "./ExpenseInput";
import ExpenseChart from "./ExpenseChart";
import Suggestions from "./Suggestions";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tips").then((response) => {
      setTips(response.data.tips);
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Finance Dashboard</h1>
      <ExpenseInput expenses={expenses} setExpenses={setExpenses} setIncome={setIncome} />
      <ExpenseChart expenses={expenses} />
      <Suggestions tips={tips} />
    </div>
  );
}

export default Dashboard;
