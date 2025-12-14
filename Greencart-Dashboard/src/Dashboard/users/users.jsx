import React, { useState } from 'react'
import './users.css'
import AddUser from './components/adduser'

import img from '../../assets/images/me2.jpeg'

const Users = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const [users] = useState([
        {
            id: 1,
            img: img,
            name: 'Everett C. Green',
            subtext: 'Essex Court',
            phone: '+ 802-370-2430',
            email: 'EverettCGreen@rhyta.com'
        },
        {
            id: 2,
            img: img,
            name: 'Caroline L. Harris',
            subtext: 'Davis Lane',
            phone: '+ 720-276-9403',
            email: 'CarolineLHarris@rhyta.com'
        },
        {
            id: 3,
            img: img,
            name: 'Lucy j. Morile',
            subtext: 'Clifton',
            phone: '+ 351-756-6549',
            email: 'LucyMorile456@gmail.com'
        },
        {
            id: 4,
            img: img,
            name: 'Jennifer A. Straight',
            subtext: 'Brunswick',
            phone: '+ 912-265-1550',
            email: 'JenniferAStraight@rhyta.com'
        },
        {
            id: 5,
            img: img,
            name: 'Louise J. Stiles',
            subtext: 'Indianapolis',
            phone: '+ 304-921-8122',
            email: 'KevinAMillett@jourrapide.com'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="users-page">

            <div className="page-header">
                <h3>{showAddForm ? 'Add New User' : 'All Users'}</h3>

                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Back to List' : '+ Add New'}
                </button>
            </div>

            {/* --- CONDITIONAL RENDERING --- */}
            {showAddForm ? (

                <AddUser />

            ) : (

                <div className="user-container">
                    <div className="table-controls">
                        <div className="search-box">
                            <label>Search:</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="table-avatar">
                                                <img src={user.img} alt={user.name} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-details">
                                                <h6 className="u-name">{user.name}</h6>
                                                <span className="u-sub">{user.subtext}</span>
                                            </div>
                                        </td>
                                        <td className="u-phone">{user.phone}</td>
                                        <td className="u-email">{user.email}</td>
                                        <td>
                                            <div className="action-icons">
                                                <button className="icon-btn view"><i className="ri-eye-line"></i></button>
                                                <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                                                <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            )}

        </div>
    )
}

export default Users
