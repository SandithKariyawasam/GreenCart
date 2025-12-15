import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Data = () => {
    // 1. State to hold backend data
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0
    });

    // 2. Fetch data from Spring Boot API on page load
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/dashboard/stats");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <>
            {/* Card 1: Total Revenue */}
            <div className="data-card revenue-card">
                <div className="media-body">
                    <span className="card-title">Total Revenue</span>
                    <h4 className="card-number">
                        {/* .toFixed(2) adds the cents (e.g., 100.00) */}
                        ${stats.totalRevenue ? stats.totalRevenue.toFixed(2) : "0.00"}
                    </h4>
                </div>
                <div className="icon-box">
                    <i className="ri-database-2-line"></i>
                </div>
            </div>

            {/* Card 2: Total Orders */}
            <div className="data-card orders-card">
                <div className="media-body">
                    <span className="card-title">Total Orders</span>
                    <h4 className="card-number">{stats.totalOrders}</h4>
                </div>
                <div className="icon-box">
                    <i className="ri-shopping-bag-line"></i>
                </div>
            </div>

            {/* Card 3: Total Products */}
            <div className="data-card products-card">
                <div className="media-body">
                    <span className="card-title">Total Products</span>
                    <h4 className="card-number">
                        {stats.totalProducts}
                        <span className="badge">ADD NEW</span>
                    </h4>
                </div>
                <div className="icon-box">
                    <i className="ri-chat-3-line"></i>
                </div>
            </div>

            {/* Card 4: Total Customers (Mapped to 'totalUsers' from backend) */}
            <div className="data-card customers-card">
                <div className="media-body">
                    <span className="card-title">Total Customers</span>
                    <h4 className="card-number">{stats.totalUsers}</h4>
                </div>
                <div className="icon-box">
                    <i className="ri-user-add-line"></i>
                </div>
            </div>
        </>
    )
}

export default Data
