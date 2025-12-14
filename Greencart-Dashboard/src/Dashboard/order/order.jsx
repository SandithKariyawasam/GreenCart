import React, { useState } from 'react';
import './order.css';
import TrackOrder from './components/trackorder';
import OrderDetails from './components/orderdetails';

const Order = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list', 'track', 'details'
    const [selectedOrder, setSelectedOrder] = useState(null);


    const [orders] = useState([
        {
            id: 1,
            image: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/1.jpg',
            code: '406-4883635',
            date: 'Jul 20, 2022',
            method: 'Paypal',
            status: 'Success',
            amount: '$15'
        },
        {
            id: 2,
            image: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/2.jpg',
            code: '573-685572',
            date: 'Jul 25, 2022',
            method: 'Paypal',
            status: 'Success',
            amount: '$15'
        },
        {
            id: 3,
            image: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/3.jpg',
            code: '759-4568734',
            date: 'Jul 29, 2022',
            method: 'Stripe',
            status: 'Pending',
            amount: '$15'
        },
        {
            id: 4,
            image: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/4.jpg',
            code: '546-7664537',
            date: 'Jul 30, 2022',
            method: 'Paypal',
            status: 'Success',
            amount: '$15'
        },
        {
            id: 5,
            image: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/5.jpg',
            code: '456-1245789',
            date: 'Aug 10, 2022',
            method: 'Stripe',
            status: 'Cancel',
            amount: '$15'
        }
    ]);

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
    };

    return (
        <div className="order-page">

            {/* 1. TRACKING VIEW */}
            {currentView === 'track' && (
                <TrackOrder onBack={handleBack} />
            )}

            {/* 2. DETAILS VIEW */}
            {currentView === 'details' && (
                <OrderDetails onBack={handleBack} />
            )}

            {/* 3. LIST VIEW (Default) */}
            {currentView === 'list' && (
                <>
                    <h2>Order List</h2>
                    <div className="order-container">
                        <div className="table-controls">
                            <div className="search-box">
                                <label>Search:</label>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order Image</th>
                                        <th>Order Code</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Delivery Status</th>
                                        <th>Amount</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <div className="table-img">
                                                    <img src={order.image} alt="order" />
                                                </div>
                                            </td>
                                            <td>{order.code}</td>
                                            <td className="o-date">{order.date}</td>
                                            <td>{order.method}</td>
                                            <td>
                                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="o-amount">{order.amount}</td>
                                            <td>
                                                <div className="action-icons">
                                                    <button
                                                        className="icon-btn view"
                                                        onClick={() => handleViewDetails(order)}
                                                    >
                                                        <i className="ri-eye-line"></i>
                                                    </button>

                                                    <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                                                    <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>

                                                    <button
                                                        className="track-btn"
                                                        onClick={() => handleTrack(order)}
                                                    >
                                                        Tracking
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
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