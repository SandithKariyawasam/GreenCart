import React from 'react';

const CreateCoupon = () => {
    return (
        <div className="coupon-container">
            <div className="form-card">

                <div className="card-header-simple">
                    <h5>General</h5>
                </div>

                <form className="add-coupon-form" onSubmit={(e) => e.preventDefault()}>

                    <div className="form-grid">

                        <div className="form-group full-width">
                            <label>Coupon Title</label>
                            <input type="text" placeholder="Coupon Name" />
                        </div>

                        <div className="form-group full-width">
                            <label>Coupon Code</label>
                            <input type="text" placeholder="CODE123" />
                        </div>

                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" />
                        </div>

                        <div className="form-group">
                            <label>Discount Type</label>
                            <select>
                                <option>Percent</option>
                                <option>Fixed</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Discount Value</label>
                            <input type="number" placeholder="0" />
                        </div>

                        <div className="form-group full-width" style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                            <div className="toggle-group">
                                <label style={{ marginRight: '10px' }}>Free Shipping</label>
                                <input type="checkbox" style={{ width: 'auto' }} />
                            </div>
                            <div className="toggle-group">
                                <label style={{ marginRight: '10px' }}>Status</label>
                                <input type="checkbox" defaultChecked style={{ width: 'auto' }} />
                            </div>
                        </div>

                    </div>

                    <div className="form-actions-right">
                        <button className="add-btn">Create Coupon</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateCoupon;