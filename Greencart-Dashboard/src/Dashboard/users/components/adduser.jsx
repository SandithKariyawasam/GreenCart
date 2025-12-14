import React, { useState } from 'react'

const AddUser = () => {
    const [activeTab, setActiveTab] = useState('account');

    const PermissionRow = ({ label, name }) => (
        <div className="permission-row">
            <span className="p-label">{label}</span>
            <div className="p-options">
                <label className="radio-label">
                    <input type="radio" name={name} defaultChecked />
                    <span className="custom-radio"></span>
                    Allow
                </label>
                <label className="radio-label">
                    <input type="radio" name={name} />
                    <span className="custom-radio"></span>
                    Deny
                </label>
            </div>
        </div>
    );

    return (
        <div className="user-container">

            {/* Tab Navigation */}
            <div className="form-tabs">
                <button
                    className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
                    onClick={() => setActiveTab('account')}
                >
                    Account
                </button>
                <button
                    className={`tab-btn ${activeTab === 'permission' ? 'active' : ''}`}
                    onClick={() => setActiveTab('permission')}
                >
                    Permission
                </button>
            </div>

            <div className="form-card">

                {/* --- Tab 1: Account Information --- */}
                {activeTab === 'account' && (
                    <div className="tab-content">
                        <h5 className="card-title">Product Information</h5>
                        <form className="add-user-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group full-width">
                                <label>First Name</label>
                                <input type="text" placeholder="" />
                            </div>
                            <div className="form-group full-width">
                                <label>Email Address</label>
                                <input type="email" placeholder="" />
                            </div>
                            <div className="form-group full-width">
                                <label>Password</label>
                                <input type="password" placeholder="" />
                            </div>
                            <div className="form-group full-width">
                                <label>Confirm Password</label>
                                <input type="password" placeholder="" />
                            </div>
                            <div className="form-actions-right">
                                <button className="add-btn">Create User</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* --- Tab 2: Permissions --- */}
                {activeTab === 'permission' && (
                    <div className="tab-content">

                        <div className="permission-section">
                            <h5 className="card-title">Product Related Permission</h5>
                            <div className="permission-list">
                                <PermissionRow label="Add Product" name="prod_add" />
                                <PermissionRow label="Update Product" name="prod_update" />
                                <PermissionRow label="Delete Product" name="prod_delete" />
                                <PermissionRow label="Apply Discount" name="prod_discount" />
                            </div>
                        </div>

                        <div className="permission-section">
                            <h5 className="card-title">Category Related Permission</h5>
                            <div className="permission-list">
                                <PermissionRow label="Add Category" name="cat_add" />
                                <PermissionRow label="Update Category" name="cat_update" />
                                <PermissionRow label="Delete Category" name="cat_delete" />
                                <PermissionRow label="Apply Discount" name="cat_discount" />
                            </div>
                        </div>

                        <div className="form-actions-right">
                            <button className="add-btn">Save Permissions</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AddUser
