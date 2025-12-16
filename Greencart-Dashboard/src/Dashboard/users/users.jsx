import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate
import './users.css'
import AddUser from './components/adduser'
import defaultImg from '../../assets/images/me2.jpeg'

const Users = () => {
    const navigate = useNavigate(); // 2. Initialize Hook
    const [showAddForm, setShowAddForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users/${id}`);
                fetchUsers();
                alert("User deleted!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowAddForm(true);
    };

    const handleAddNew = () => {
        setEditingUser(null);
        setShowAddForm(true);
    };

    const handleBack = () => {
        setShowAddForm(false);
        setEditingUser(null);
        fetchUsers();
    };

    // 3. New Handler for View Button
    const handleViewProfile = (user) => {
        // Navigate to profile and pass the user object in 'state'
        navigate('/dashboard/profile', { state: { user: user } });
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="users-page">

            <div className="page-header">
                <h3>{showAddForm ? (editingUser ? 'Edit User' : 'Add New User') : 'All Users'}</h3>
                <button className="add-btn" onClick={showAddForm ? handleBack : handleAddNew}>
                    {showAddForm ? 'Back to List' : '+ Add New'}
                </button>
            </div>

            {showAddForm ? (
                <AddUser
                    editingUser={editingUser}
                    onFinish={handleBack}
                />
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
                                                <img src={user.profileImageUrl || defaultImg} alt="avatar" style={{ objectFit: 'cover' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-details">
                                                <h6 className="u-name">{user.firstName} {user.lastName}</h6>
                                                <span className="u-sub">{user.role ? user.role.name : 'User'}</span>
                                            </div>
                                        </td>
                                        <td className="u-phone">{user.phoneNumber || '-'}</td>
                                        <td className="u-email">{user.email}</td>
                                        <td>
                                            <div className="action-icons">
                                                {/* 4. Attach onClick handler to View Button */}
                                                <button className="icon-btn view" onClick={() => handleViewProfile(user)}>
                                                    <i className="ri-eye-line"></i>
                                                </button>

                                                <button className="icon-btn edit" onClick={() => handleEdit(user)}>
                                                    <i className="ri-pencil-line"></i>
                                                </button>

                                                <button className="icon-btn delete" onClick={() => handleDelete(user.id)}>
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
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

export default Users