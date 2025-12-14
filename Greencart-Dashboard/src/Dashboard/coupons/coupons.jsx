import React, { useState } from 'react'
import './coupons.css'
import CreateCoupon from './components/Addcoupons'

const Coupons = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const [coupons] = useState([
        { id: 1, title: '10% Off', code: '5488165', discount: '10%', status: 'Restitute', isChecked: false },
        { id: 2, title: '25% Off', code: '2143235', discount: '17%', status: 'Success', isChecked: false },
        { id: 3, title: '12% Off', code: '3243468', discount: '20%', status: 'Success', isChecked: true },
        { id: 4, title: '45% Off', code: '7846289', discount: '50%', status: 'Restitute', isChecked: true },
        { id: 5, title: '45% Off', code: '3614376', discount: '60%', status: 'Success', isChecked: false },
        { id: 6, title: '80% Off', code: '8328192', discount: '45%', status: 'Success', isChecked: false },
        { id: 7, title: '60% Off', code: '7218376', discount: '30%', status: 'Success', isChecked: false },
        { id: 8, title: '40% Off', code: '1872349', discount: '42%', status: 'Success', isChecked: false },
    ]);

    return (
        <div className="coupon-page">

            {/* Header */}
            <div className="page-header">
                <h3>{showAddForm ? 'Create Coupon' : 'Coupon List'}</h3>
                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Back to List' : 'Add Coupon'}
                </button>
            </div>

            {showAddForm ? (

                <CreateCoupon />

            ) : (

                <div className="coupon-container">
                    <div className="table-controls">
                        <div className="search-box">
                            <label>Search:</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="coupon-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>
                                        <input type="checkbox" />
                                    </th>
                                    <th>Title</th>
                                    <th>Code</th>
                                    <th>Discount</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon.id}>
                                        <td>
                                            <input type="checkbox" defaultChecked={coupon.isChecked} />
                                        </td>
                                        <td className="c-title">{coupon.title}</td>
                                        <td className="c-code">{coupon.code}</td>
                                        <td className="c-discount">{coupon.discount}</td>
                                        <td>
                                            <span className={`status-badge ${coupon.status.toLowerCase()}`}>
                                                {coupon.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-icons">
                                                <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                                                <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            )}

        </div>
    )
}

export default Coupons