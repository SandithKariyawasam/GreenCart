import React from 'react';

import img from '../../../assets/images/2.png'

const TrackOrder = ({ onBack }) => {
    return (
        <div className="track-order-wrapper">
            <div className="page-header">
                <h3>Order Tracking</h3>
                <button className="add-btn" onClick={onBack}>Back to List</button>
            </div>

            <div className="order-container">

                {/* Top Product Info */}
                <div className="track-header">
                    <div className="track-img">
                        <img src={img} alt="product" />
                    </div>
                    <div className="track-details">
                        <h4>Van Heusen Men's Solid Regular Fit Polo</h4>
                        <p>Order Number : <span className="text-dark">W765EWR8568871</span></p>
                        <p>Brand : <span className="text-dark">Van Heusen</span></p>
                        <p>Order Placed : <span className="text-dark">June 25, 2021</span></p>
                        <h5 className="mt-3">Your items is on the way. Tracking information will be available within 24 hours.</h5>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="track-progress-bar">
                    <ul>
                        <li className="active">
                            <div className="step-icon"><i className="ri-check-line"></i></div>
                            <span>Order Processing</span>
                            <small>05:43 AM</small>
                        </li>
                        <li className="active">
                            <div className="step-icon"><i className="ri-check-line"></i></div>
                            <span>Pre-Production</span>
                            <small>01:21 PM</small>
                        </li>
                        <li className="active">
                            <div className="step-icon"><i className="ri-check-line"></i></div>
                            <span>In Production</span>
                            <small>Processing</small>
                        </li>
                        <li>
                            <div className="step-icon"></div>
                            <span>Shipped</span>
                            <small>Pending</small>
                        </li>
                        <li>
                            <div className="step-icon"></div>
                            <span>Delivered</span>
                            <small>Pending</small>
                        </li>
                    </ul>
                </div>

                {/* Tracking History Table */}
                <div className="table-responsive mt-4">
                    <table className="track-table">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>DISCRIPTION</th>
                                <th>LOCATION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21/05/2021</td>
                                <td>12:21 AM</td>
                                <td><strong>Shipped Info</strong></td>
                                <td>3 SW. Summit St. Lithonia, GA 30038</td>
                            </tr>
                            <tr>
                                <td>15/04/2021</td>
                                <td>01:00 PM</td>
                                <td><strong>Shipped</strong></td>
                                <td>70 Rockwell Lane Falls Church, VA 22041</td>
                            </tr>
                            <tr>
                                <td>04/05/2021</td>
                                <td>03:58 AM</td>
                                <td><strong>Shipped Info Received</strong></td>
                                <td>13 Durham St. The Villages, FL 32162</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="form-actions-right mt-4">
                    <button className="add-btn" style={{ backgroundColor: '#0da487' }}>Submit</button>
                    <button className="add-btn" style={{ backgroundColor: '#fff', color: '#0da487', border: '1px solid #0da487', marginLeft: '10px' }}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default TrackOrder;