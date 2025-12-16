import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../../assets/images/2.png' // Default Fallback

// Receive 'orderId' prop to know which order to fetch
const OrderDetails = ({ orderId, onBack }) => {
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/orders/${orderId}`);
            setOrder(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setLoading(false);
        }
    };

    if (loading) return <div style={{padding:'20px'}}>Loading order details...</div>;
    if (!order) return <div style={{padding:'20px'}}>Order not found</div>;

    // --- CALCULATIONS (Simulated for UI) ---
    // Assuming backend sends totalAmount. We can reverse calculate or flat rate vars for demo.
    const subtotal = order.totalAmount ? (order.totalAmount * 0.9).toFixed(2) : 0;
    const tax = (order.totalAmount * 0.05).toFixed(2); // 5% Tax
    const shipping = (order.totalAmount * 0.05).toFixed(2); // 5% Shipping
    // Note: In a real app, these should be stored in the DB order entity.

    return (
        <div className="order-details-wrapper">
            {/* Header */}
            <div className="page-header">
                <h3>Order #{order.id}</h3>
                <button className="add-btn" onClick={onBack}>Back to List</button>
            </div>

            {/* Meta Bar */}
            <div className="order-meta-bar">
                <span>{new Date(order.orderDate).toLocaleString()}</span>
                <span>{order.orderItems ? order.orderItems.length : 0} items</span>
                <span>Total ${order.totalAmount}</span>
            </div>

            <div className="details-grid">

                {/* Left Side: Items Table */}
                <div className="details-left">
                    <div className="details-card">
                        <div className="card-header-green">
                            <h5>ITEMS</h5>
                            {/* Status Badge */}
                            <span className="status-badge" style={{background:'white', color:'#0da487', padding:'2px 8px', borderRadius:'4px'}}>
                                {order.status}
                            </span>
                        </div>
                        <div className="details-body">
                            
                            {/* Dynamic Items List */}
                            {order.orderItems && order.orderItems.map((item) => (
                                <div className="item-row" key={item.id}>
                                    <img 
                                        src={item.product && item.product.imageUrl ? item.product.imageUrl : img} 
                                        alt={item.product ? item.product.name : 'Product'} 
                                    />
                                    <div className="item-info">
                                        <h3>{item.product ? item.product.name : 'Unknown Product'}</h3>
                                        {/* Optional: Show Category if available */}
                                        <p style={{fontSize:'12px', color:'#777'}}>
                                            {item.product && item.product.category ? item.product.category.name : ''}
                                        </p>
                                    </div>
                                    <div className="item-qty">{item.quantity}</div>
                                    <div className="item-price">${item.price}</div>
                                </div>
                            ))}

                            <div className="summary-footer">
                                <div className="summary-row">
                                    <span>Subtotal :</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping :</span>
                                    <span>${shipping}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax(GST) :</span>
                                    <span>${tax}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total Price :</span>
                                    <span>${order.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Sidebar Info */}
                <div className="details-right">
                    <div className="p-4">
                        <div className="sidebar-section">
                            <h6>Summary</h6>
                            <p>Order ID: {order.id}</p>
                            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Order Total: ${order.totalAmount}</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Shipping Address</h6>
                            {/* Assuming User has name, otherwise just use address string */}
                            <p style={{fontWeight:'bold'}}>{order.user ? order.user.username : 'Guest User'}</p>
                            <p>{order.shippingAddress}</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Payment Method</h6>
                            <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available.</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Expected Date Of Delivery: <b>{new Date(new Date(order.orderDate).setDate(new Date(order.orderDate).getDate() + 5)).toLocaleDateString()}</b></h6>
                            <a href="#" style={{ color: '#0da487', fontWeight: '500' }}>Track Order</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails;