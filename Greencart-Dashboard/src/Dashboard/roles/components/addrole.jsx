import React, { useState, useEffect } from 'react';

const AddRole = () => {
    // List of modules
    const permissionModules = [
        'Roles', 'Users', 'Product', 'Category',
        'Attributes', 'Order', 'Localization', 'Coupons',
        'Tax', 'Product Review', 'Support Ticket', 'Reports'
    ];

    const PermissionRow = ({ label }) => {
        const [permissions, setPermissions] = useState({
            all: false,
            index: false,
            create: false,
            edit: false,
            destroy: false
        });

        const handleAllChange = (e) => {
            const isChecked = e.target.checked;
            setPermissions({
                all: isChecked,
                index: isChecked,
                create: isChecked,
                edit: isChecked,
                destroy: isChecked
            });
        };

        const handleSingleChange = (key) => (e) => {
            const isChecked = e.target.checked;

            setPermissions((prev) => {
                const newState = { ...prev, [key]: isChecked };

                const allTrue =
                    newState.index &&
                    newState.create &&
                    newState.edit &&
                    newState.destroy;

                newState.all = allTrue;

                return newState;
            });
        };

        return (
            <div className="permission-group-row">
                <span className="perm-label">{label} :</span>
                <div className="perm-checkboxes">

                    {/* ALL Checkbox */}
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            className="custom-check"
                            checked={permissions.all}
                            onChange={handleAllChange}
                        />
                        <span>All</span>
                    </label>

                    {/* Individual Checkboxes */}
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            className="custom-check"
                            checked={permissions.index}
                            onChange={handleSingleChange('index')}
                        />
                        <span>Index</span>
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            className="custom-check"
                            checked={permissions.create}
                            onChange={handleSingleChange('create')}
                        />
                        <span>Create</span>
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            className="custom-check"
                            checked={permissions.edit}
                            onChange={handleSingleChange('edit')}
                        />
                        <span>Edit</span>
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            className="custom-check"
                            checked={permissions.destroy}
                            onChange={handleSingleChange('destroy')}
                        />
                        <span>Destroy</span>
                    </label>

                </div>
            </div>
        );
    };

    return (
        <div className="role-container">

            <form onSubmit={(e) => e.preventDefault()}>

                <div className="form-group full-width" style={{ marginBottom: '30px' }}>
                    <label>Name <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" placeholder="Role Name" />
                </div>

                <h5 className="card-title" style={{ fontSize: '16px', marginBottom: '20px' }}>Permissions</h5>

                <div className="permissions-grid">
                    {permissionModules.map((module, index) => (
                        <PermissionRow key={index} label={module} />
                    ))}
                </div>

                <div className="form-actions-right">
                    <button className="add-btn">Save</button>
                </div>

            </form>
        </div>
    )
}

export default AddRole;