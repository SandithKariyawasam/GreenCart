import React from 'react';

const OrderDetails = ({ onBack }) => {
    return (
        <div className="order-details-wrapper">
            <div className="page-header">
                <h3>Order #36648</h3>
                <button className="add-btn" onClick={onBack}>Back to List</button>
            </div>

            <div className="order-meta-bar">
                <span>October 21, 2021 at 9:08 pm</span>
                <span>6 items</span>
                <span>Total $5,882.00</span>
            </div>

            <div className="details-grid">

                {/* Left Side: Items Table */}
                <div className="details-left">
                    <div className="details-card">
                        <div className="card-header-green">
                            <h5>ITEMS</h5>
                            <span className="edit-link">EDIT ITEMS</span>
                        </div>
                        <div className="details-body">

                            <div className="item-row">
                                <img src="https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/front/1.jpg" alt="" />
                                <div className="item-info">
                                    <h3>Outwear & Coats</h3>
                                </div>
                                <div className="item-qty">1</div>
                                <div className="item-price">$63.54</div>
                            </div>

                            <div className="item-row">
                                <img src="https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/front/2.jpg" alt="" />
                                <div className="item-info">
                                    <h3>Slim Fit Plastic Coat</h3>
                                </div>
                                <div className="item-qty">5</div>
                                <div className="item-price">$63.54</div>
                            </div>

                            <div className="item-row">
                                <img src="https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/front/3.jpg" alt="" />
                                <div className="item-info">
                                    <h3>Men's Sweatshirt</h3>
                                </div>
                                <div className="item-qty">1</div>
                                <div className="item-price">$63.54</div>
                            </div>

                            <div className="summary-footer">
                                <div className="summary-row">
                                    <span>Subtotal :</span>
                                    <span>$55.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping :</span>
                                    <span>$12.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax(GST) :</span>
                                    <span>$10.00</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total Price :</span>
                                    <span>$6935.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Sidebar Info */}
                <div className="details-right">
                    <div className=" p-4">
                        <div className="sidebar-section">
                            <h6>Summery</h6>
                            <p>Order ID: 5563853658932</p>
                            <p>Order Date: October 22, 2018</p>
                            <p>Order Total: $907.28</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Shipping Address</h6>
                            <p>Gerg Harvell</p>
                            <p>568, Suite Ave.</p>
                            <p>Austrlia, 235153 Contact No. 48465465465</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Payment Method</h6>
                            <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.</p>
                        </div>

                        <div className="sidebar-section">
                            <h6>Expected Date Of Delivery: <b>October 22, 2018</b></h6>
                            <a href="#" style={{ color: '#0da487', fontWeight: '500' }}>Track Order</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails;