import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AddUser = ({ editingUser, onFinish }) => {

    const [activeTab, setActiveTab] = useState('account');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    useEffect(() => {
        if (editingUser) {
            setFormData({
                firstName: editingUser.firstName || '',
                lastName: editingUser.lastName || '',
                email: editingUser.email || '',
                phoneNumber: editingUser.phoneNumber || '',
                password: '',
                confirmPassword: ''
            });
            setExistingImageUrl(editingUser.profileImageUrl);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const triggerFileUpload = () => { fileInputRef.current.click(); };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editingUser && !formData.password) {
            alert("Password is required for new users!");
            return;
        }

        try {
            if (editingUser) {
                const updateData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phoneNumber,
                    profileImageUrl: existingImageUrl
                };

                await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, updateData);
                alert("User Updated Successfully!");

            } else {
                const data = new FormData();
                data.append("firstName", formData.firstName);
                data.append("lastName", formData.lastName);
                data.append("email", formData.email);
                data.append("password", formData.password);
                data.append("phoneNumber", formData.phoneNumber);
                if (profileImage) data.append("image", profileImage);

                await axios.post("http://localhost:8080/api/users", data);
                alert("User Created Successfully!");
            }

            if (onFinish) onFinish();

        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user.");
        }
    };

    return (
        <div className="user-container">
            {/* Tabs */}
            <div className="form-tabs">
                <button className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
                    Account
                </button>
                <button className={`tab-btn ${activeTab === 'permission' ? 'active' : ''}`} onClick={() => setActiveTab('permission')}>
                    Permission
                </button>
            </div>

            <div className="form-card">
                {activeTab === 'account' && (
                    <div className="tab-content">
                        <h5 className="card-title">{editingUser ? 'Edit User Details' : 'User Information'}</h5>
                        <form className="add-user-form" onSubmit={(e) => e.preventDefault()}>

                            <div className="form-group full-width">
                                <label>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!!editingUser} />
                            </div>
                            <div className="form-group full-width">
                                <label>Phone Number</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                            </div>

                            {/* Hide Password fields if Editing (unless you want to add logic to change it) */}
                            {!editingUser && (
                                <>
                                    <div className="form-group full-width">
                                        <label>Password</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Confirm Password</label>
                                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                    </div>
                                </>
                            )}

                            {/* Image Upload - Only show for new users or if you add image update logic to backend */}
                            {!editingUser && (
                                <div className="form-group full-width">
                                    <label>Profile Image</label>
                                    <div className="image-upload-area" onClick={triggerFileUpload} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                                        <div className="upload-content">
                                            <i className="ri-upload-cloud-2-line"></i>
                                            <p>{profileImage ? profileImage.name : "Click to upload"}</p>
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                                    </div>
                                </div>
                            )}

                            <div className="form-actions-right">
                                <button className="add-btn" onClick={handleSubmit}>
                                    {editingUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {/* Permission Tab Content (Static) */}
                {activeTab === 'permission' && (
                    <div className="tab-content">
                        <div className="permission-section">
                            <h5 className="card-title">Permissions</h5>
                            <p>Permissions settings are here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddUser;
