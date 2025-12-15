import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css';
import TrackOrder from './components/trackorder';
import OrderDetails from './components/orderdetails';

import defaultImg from '../../assets/images/2.png' // Fallback image

const Order = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list', 'track', 'details'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]); // Real data state
    const [searchTerm, setSearchTerm] = useState('');

    // --- FETCH ORDERS FROM BACKEND ---
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // --- HANDLERS ---
    const handleTrack = (order) => {
        setSelectedOrder(order);
        setCurrentView('track');
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setCurrentView('details');
    };

    const handleBack = () => {
        setCurrentView('list');
        setSelectedOrder(null);
        fetchOrders(); // Refresh list to see any status changes
    };

    // Filter Logic
    const filteredOrders = orders.filter(order => 
        (order.id && order.id.toString().includes(searchTerm)) || 
        (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="order-page">

            {/* 1. TRACKING VIEW */}
            {currentView === 'track' && selectedOrder && (
                <TrackOrder order={selectedOrder} onBack={handleBack} />
            )}

            {/* 2. DETAILS VIEW */}
            {currentView === 'details' && selectedOrder && (
                <OrderDetails orderId={selectedOrder.id} onBack={handleBack} />
            )}

            {/* 3. LIST VIEW (Default) */}
            {currentView === 'list' && (
                <>
                    <h2>Order List</h2>
                    <div className="order-container">
                        <div className="table-controls">
                            <div className="search-box">
                                <label>Search:</label>
                                <input 
                                    type="text" 
                                    placeholder="Order ID or Status"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order Image</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Delivery Status</th>
                                        <th>Amount</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? filteredOrders.map((order) => {
                                        
                                        // Helper: Get image from first product in order, or default
                                        const orderImage = (order.orderItems && order.orderItems.length > 0 && order.orderItems[0].product && order.orderItems[0].product.imageUrl) 
                                            ? order.orderItems[0].product.imageUrl 
                                            : defaultImg;

                                        return (
                                            <tr key={order.id}>
                                                <td>
                                                    <div className="table-img">
                                                        <img 
                                                            src={orderImage} 
                                                            alt="order" 
                                                            style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'5px'}}
                                                        />
                                                    </div>
                                                </td>
                                                <td>#{order.id}</td>
                                                <td className="o-date">
                                                    {new Date(order.orderDate).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    {/* Payment method isn't stored in DB yet, using placeholder */}
                                                    Pay on Delivery
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                                                        {order.status || 'PENDING'}
                                                    </span>
                                                </td>
                                                <td className="o-amount">${order.totalAmount}</td>
                                                <td>
                                                    <div className="action-icons">
                                                        <button
                                                            className="icon-btn view"
                                                            onClick={() => handleViewDetails(order)}
                                                            title="View Details"
                                                        >
                                                            <i className="ri-eye-line"></i>
                                                        </button>

                                                        {/* Optional: Add Delete Button later if needed */}
                                                        {/* <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button> */}

                                                        <button
                                                            className="track-btn"
                                                            onClick={() => handleTrack(order)}
                                                        >
                                                            Tracking
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan="7" style={{textAlign:'center', padding:'20px'}}>No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default Order;