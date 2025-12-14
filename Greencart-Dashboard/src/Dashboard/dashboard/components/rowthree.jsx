import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const Rowthree = () => {

    const [visitorChartData] = useState({
        series: [15, 45, 30, 10], // Example data percentages
        options: {
            chart: { type: 'donut', height: 320, fontFamily: 'Poppins, sans-serif' },
            labels: ['The Regulars', 'The Passersby', 'The Occasionals', 'The Superfans'],
            colors: ['#a927f9', '#0da487', '#ff9f43', '#000000ff'], 
            legend: { position: 'bottom' },
            dataLabels: { enabled: false },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%'
                    }
                }
            }
        }
    });

    const transactions = [
        { title: "Cash on delivery", sub: "Delivery", amount: "-$74", type: "debit", icon: "ri-shield-line", color: "pink" },
        { title: "Bank Transfer", sub: "Add Money", amount: "+$125", type: "credit", icon: "ri-checkbox-circle-line", color: "green" },
        { title: "Paypal", sub: "Add Money", amount: "-$50", type: "debit", icon: "ri-money-dollar-circle-line", color: "purple" },
        { title: "Mastercard", sub: "Ordered Food", amount: "-$40", type: "debit", icon: "ri-bank-card-line", color: "pink" },
        { title: "Transfer", sub: "Refund", amount: "+$90", type: "credit", icon: "ri-exchange-dollar-line", color: "orange" },
    ];

    return (
        <>
            {/* 1. Transactions Column */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>Transactions</h5>
                </div>
                <div className="transaction-list">
                    {transactions.map((item, index) => (
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
                    ))}
                </div>
            </div>

            {/* 2. Visitors Column (Donut Chart) */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>Visitors</h5>
                </div>
                <div className="chart-body">
                    <ReactApexChart
                        options={visitorChartData.options}
                        series={visitorChartData.series}
                        type="donut"
                        height={320}
                    />
                </div>
            </div>

            {/* 3. To Do List Column */}
            <div className="dashboard-col">
                <div className="col-header">
                    <h5>To Do List</h5>
                </div>
                <div className="todo-list-wrapper">
                    <div className="todo-list">
                        {/* Item 1 */}
                        <div className="todo-item">
                            <input type="checkbox" id="todo1" />
                            <label htmlFor="todo1">
                                <span className="todo-text">Pick up kids from school</span>
                                <span className="todo-time">8 Hours</span>
                            </label>
                        </div>
                        {/* Item 2 */}
                        <div className="todo-item">
                            <input type="checkbox" id="todo2" defaultChecked />
                            <label htmlFor="todo2">
                                <span className="todo-text">Prepare or presentation</span>
                                <span className="todo-time">8 Hours</span>
                            </label>
                        </div>
                        {/* Item 3 */}
                        <div className="todo-item">
                            <input type="checkbox" id="todo3" />
                            <label htmlFor="todo3">
                                <span className="todo-text">Create invoice</span>
                                <span className="todo-time">8 Hours</span>
                            </label>
                        </div>
                        {/* Item 4 */}
                        <div className="todo-item">
                            <input type="checkbox" id="todo4" />
                            <label htmlFor="todo4">
                                <span className="todo-text">Meeting with Alisa</span>
                                <span className="todo-time">8 Hours</span>
                            </label>
                        </div>
                    </div>

                    {/* Add Task Input */}
                    <div className="todo-input-box">
                        <input type="text" placeholder="Enter Task Name" />
                        <button>Add task</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Rowthree
