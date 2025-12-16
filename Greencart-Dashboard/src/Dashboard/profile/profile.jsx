import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const location = useLocation();

    // 1. Get User (From Nav State or LocalStorage)
    const [displayUser, setDisplayUser] = useState(() => {
        if (location.state && location.state.user) {
            return location.state.user;
        }
        return JSON.parse(localStorage.getItem('currentUser')) || {};
    });

    // 2. User Form State
    const [formData, setFormData] = useState({
        firstName: displayUser.firstName || '',
        lastName: displayUser.lastName || '',
        email: displayUser.email || '',
        phoneNumber: displayUser.phoneNumber || '',
        password: '',
        confirmPassword: ''
    });

    // 3. Address States
    const [addresses, setAddresses] = useState([]);
    const [editingAddressId, setEditingAddressId] = useState(null); // ID of address currently being edited
    const [editAddrData, setEditAddrData] = useState({}); // Temp data for editing address

    // --- FETCH ADDRESSES ---
    useEffect(() => {
        if (displayUser.id) {
            fetchAddresses();
        }
    }, [displayUser]);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users/${displayUser.id}/address`);
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    // --- USER UPDATE HANDLER ---
    // --- USER UPDATE HANDLER (Now sends File + Text) ---
    const handleUserUpdate = async (e) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Use FormData to send file + text
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("phoneNumber", formData.phoneNumber);

            // Only append password if user typed one
            if (formData.password) {
                data.append("password", formData.password);
            }

            // Only append image if user selected one
            if (selectedImage) {
                data.append("image", selectedImage);
            }

            // Send PUT request
            // Note: Axios automatically sets Content-Type to multipart/form-data
            const response = await axios.put(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users/${displayUser.id}`, data);
            
            alert("Profile & Image Updated Successfully!");
            
            // Update UI immediately
            setDisplayUser(prev => ({ ...prev, ...response.data }));
            
            // Update LocalStorage if it's the logged-in user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser.id === displayUser.id) {
                localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...response.data }));
            }

            // Clear password/image fields
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            setSelectedImage(null);

        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        }
    };

    // --- ADDRESS HANDLERS ---
    
    // Enable Edit Mode
    const startEditingAddress = (addr) => {
        setEditingAddressId(addr.id);
        setEditAddrData(addr); // Load current data into temp state
    };

    // Cancel Edit
    const cancelEditAddress = () => {
        setEditingAddressId(null);
        setEditAddrData({});
    };

    // Handle Input Change for Address
    const handleAddrChange = (e) => {
        setEditAddrData({ ...editAddrData, [e.target.name]: e.target.value });
    };

    // Save Address Update
    const saveAddress = async (id) => {
        try {
            await axios.put(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users/address/${id}`, editAddrData);
            alert("Address updated!");
            setEditingAddressId(null);
            fetchAddresses(); // Refresh list
        } catch (error) {
            console.error(error);
            alert("Failed to update address");
        }
    };

    // Delete Address
    const deleteAddress = async (id) => {
        if(window.confirm("Delete this address?")) {
            try {
                await axios.delete(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/users/address/${id}`);
                fetchAddresses(); // Refresh list
            } catch (error) {
                console.error(error);
                alert("Failed to delete address");
            }
        }
    };

    // Handle User Form Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="profile-page">

            {/* --- USER PROFILE CARD --- */}
            <div className="profile-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h5 className="section-title">
                        {location.state?.user ? `Edit ${displayUser.firstName}'s Profile` : 'My Profile Setting'}
                    </h5>
                    {displayUser.profileImageUrl && (
                        <img src={displayUser.profileImageUrl} alt="Profile" style={{width:'50px', height:'50px', borderRadius:'50%', objectFit:'cover'}} />
                    )}
                </div>

                <form className="profile-form" onSubmit={handleUserUpdate}>
                    <div className="profile-row">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="profile-row">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="profile-row">
                        <label>Phone Number</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="profile-row">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} disabled style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }} />
                    </div>
                    <div className="profile-row">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="New Password" onChange={handleChange} />
                    </div>
                    <div className="profile-row">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm New Password" onChange={handleChange} />
                    </div>

                    <div className="profile-row">
                        <label>Photo</label>
                        <div className="custom-file-input" style={{position: 'relative', overflow: 'hidden'}}>
                            <button type="button" style={{pointerEvents:'none'}}>Choose File</button>
                            <span style={{marginLeft:'10px'}}>
                                {selectedImage ? selectedImage.name : "No file chosen"}
                            </span>
                            {/* The actual file input (hidden but clickable) */}
                            <input 
                                type="file" 
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{
                                    position: 'absolute', 
                                    left: 0, 
                                    top: 0, 
                                    opacity: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    cursor: 'pointer'
                                }} 
                            />
                        </div>
                    </div>

                    <div className="profile-row" style={{ justifyContent: 'flex-end' }}>
                        <button className="save-btn">Save Changes</button>
                    </div>
                    
                </form>
            </div>

            {/* --- ADDRESS SECTION --- */}
            <div className="address-section-wrapper">
                <h5 className="section-title">Saved Addresses</h5>

                <div className="address-grid">
                    {addresses.length > 0 ? addresses.map((addr) => (
                        <div className="address-card" key={addr.id}>
                            
                            {/* CHECK: Are we editing this specific card? */}
                            {editingAddressId === addr.id ? (
                                // --- EDIT MODE ---
                                <div className="edit-addr-form">
                                    <input type="text" name="type" value={editAddrData.type} onChange={handleAddrChange} placeholder="Type (Home/Office)" className="addr-input" />
                                    <input type="text" name="address" value={editAddrData.address} onChange={handleAddrChange} placeholder="Street Address" className="addr-input" />
                                    <div style={{display:'flex', gap:'5px'}}>
                                        <input type="text" name="city" value={editAddrData.city} onChange={handleAddrChange} placeholder="City" className="addr-input" />
                                        <input type="text" name="zip" value={editAddrData.zip} onChange={handleAddrChange} placeholder="Zip" className="addr-input" />
                                    </div>
                                    <input type="text" name="mobile" value={editAddrData.mobile} onChange={handleAddrChange} placeholder="Mobile" className="addr-input" />
                                    
                                    <div className="address-footer">
                                        <button className="addr-btn save" onClick={() => saveAddress(addr.id)} style={{background:'#0da487', color:'#fff'}}>Save</button>
                                        <button className="addr-btn" onClick={cancelEditAddress}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                // --- VIEW MODE ---
                                <>
                                    <div className="address-header">
                                        <h6 className="addr-name">{displayUser.firstName} {displayUser.lastName}</h6>
                                        <span className={`addr-badge ${addr.type ? addr.type.toLowerCase() : 'home'}`}>
                                            {addr.type || 'Home'}
                                        </span>
                                    </div>

                                    <div className="address-body">
                                        <p>{addr.address}</p>
                                        <p>{addr.city} - {addr.zip}</p>
                                        <p className="addr-mobile">Mobile: {addr.mobile}</p>
                                    </div>

                                    <div className="address-footer">
                                        <button className="addr-btn" onClick={() => startEditingAddress(addr)}>Edit</button>
                                        <button className="addr-btn" onClick={() => deleteAddress(addr.id)}>Remove</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )) : (
                        <p style={{color: '#777', padding: '20px'}}>No addresses found.</p>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Profile;