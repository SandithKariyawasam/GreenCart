import React, { useState } from 'react'
import './roles.css'
import AddRole from './components/addrole' // Import the new component

const Roles = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const [roles] = useState([
        { id: 1, name: 'Dummy', created: '3 weeks ago' },
        { id: 2, name: 'Self', created: '3 weeks ago' },
        { id: 3, name: 'Dummy', created: '3 weeks ago' },
        { id: 4, name: 'Author', created: '3 weeks ago' },
    ]);

    return (
        <div className="roles-page">

            {/* Header Section */}
            <div className="page-header">
                <h3>{showAddForm ? 'Create Role' : 'Role List'}</h3>
                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Back to List' : '+ Add Role'}
                </button>
            </div>

            {/* --- TOGGLE LOGIC --- */}
            {showAddForm ? (

                <AddRole />

            ) : (

                <div className="role-container">
                    <div className="table-controls">
                        <div className="search-box">
                            <label>Search:</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="role-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Create At</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td style={{ color: '#0da487' }}>{role.created}</td>
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

export default Roles