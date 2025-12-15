import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

const Rowthree = () => {
    // --- STATE ---
    const [transactions, setTransactions] = useState([]);
    const [visitorSeries, setVisitorSeries] = useState([0, 0, 0, 0]);
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");

    // --- CHART OPTIONS ---
    const visitorChartOptions = {
        chart: { type: 'donut', height: 320, fontFamily: 'Poppins, sans-serif' },
        labels: ['The Regulars', 'The Passersby', 'The Occasionals', 'The Superfans'],
        colors: ['#a927f9', '#0da487', '#ff9f43', '#000000ff'],
        legend: { position: 'bottom' },
        dataLabels: { enabled: false },
        plotOptions: { pie: { donut: { size: '65%' } } }
    };

    // --- FETCH DATA ---
    useEffect(() => {
        loadDashboardData();
        loadTodos();
    }, []);

    const loadDashboardData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/dashboard/analytics");
            setTransactions(res.data.recentTransactions || []);
            setVisitorSeries(res.data.visitorStats || [0, 0, 0, 0]);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
        }
    };

    const loadTodos = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/todos");
            setTodos(res.data);
        } catch (err) {
            console.error("Failed to load todos", err);
        }
    };

    // --- TODO HANDLERS ---
    const handleAddTodo = async () => {
        if (!newTask.trim()) return;
        try {
            await axios.post("http://localhost:8080/api/todos", { taskName: newTask });
            setNewTask("");
            loadTodos(); // Refresh list
        } catch (err) {
            console.error("Error adding task", err);
        }
    };

    const handleToggleTodo = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/${id}`);
            loadTodos(); // Refresh list
        } catch (err) {
            console.error("Error toggling task", err);
        }
    };

    return (
        <>
            {/* 1. Transactions Column (Real Orders) */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>Recent Transactions</h5>
                </div>
                <div className="transaction-list">
                    {transactions.length > 0 ? transactions.map((item, index) => (
                        <div className="transaction-item" key={index}>
                            <div className="t-left">
                                <div className={`t-icon-box ${item.color}`}>
                                    <i className={item.icon}></i>
                                </div>
                                <div className="t-details">
                                    <h6>{item.title}</h6>
                                    <span>{item.sub}</span>
                                </div>
                            </div>
                            <span className={`t-amount ${item.type}`}>{item.amount}</span>
                        </div>
                    )) : <p style={{ padding: '20px', color: '#888' }}>No recent orders found.</p>}
                </div>
            </div>

            {/* 2. Visitors Column (Donut Chart) */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>Visitors</h5>
                </div>
                <div className="chart-body">
                    <ReactApexChart
                        options={visitorChartOptions}
                        series={visitorSeries}
                        type="donut"
                        height={320}
                    />
                </div>
            </div>

            {/* 3. To Do List Column (Real DB CRUD) */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>To Do List</h5>
                </div>
                <div className="todo-list-wrapper">
                    <div className="todo-list">
                        {todos.map((todo) => (
                            <div className="todo-item" key={todo.id}>
                                <input
                                    type="checkbox"
                                    id={`todo-${todo.id}`}
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                />
                                <label htmlFor={`todo-${todo.id}`}>
                                    <span className="todo-text" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                        {todo.taskName}
                                    </span>
                                </label>
                            </div>
                        ))}
                        {todos.length === 0 && <p style={{ padding: '10px', color: '#999' }}>No tasks yet.</p>}
                    </div>

                    {/* Add Task Input */}
                    <div className="todo-input-box">
                        <input
                            type="text"
                            placeholder="Enter Task Name"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                        />
                        <button onClick={handleAddTodo}>Add task</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rowthree
