import React, { useState } from 'react';
import './profile.css';

const Profile = () => {
    const [addresses] = useState([
        {
            id: 1,
            name: 'Mark Jugal',
            type: 'Home',
            address: '549 Sulphur Springs Road',
            city: 'Downers Grove, IL',
            zip: '60515',
            mobile: '+1-123-456-7890'
        },
        {
            id: 2,
            name: 'Method Zaki',
            type: 'Office',
            address: '549 Sulphur Springs Road',
            city: 'Downers Grove, IL',
            zip: '60515',
            mobile: '+1-123-456-7890'
        },
        {
            id: 3,
            name: 'Mark Jugal',
            type: 'Home',
            address: '549 Sulphur Springs Road',
            city: 'Downers Grove, IL',
            zip: '60515',
            mobile: '+1-123-456-7890'
        }
    ]);

    return (
        <div className="profile-page">

            <div className="profile-card">
                <h5 className="section-title">Profile Setting</h5>

                <form className="profile-form" onSubmit={(e) => e.preventDefault()}>

                    <div className="profile-row">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter Your First Name" />
                    </div>

                    <div className="profile-row">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter Your Last Name" />
                    </div>

                    <div className="profile-row">
                        <label>Your Phone Number</label>
                        <input type="text" placeholder="Enter Your Number" />
                    </div>

                    <div className="profile-row">
                        <label>Enter Email Address</label>
                        <input type="email" placeholder="Enter Your Email Address" />
                    </div>

                    <div className="profile-row">
                        <label>Photo</label>
                        <div className="custom-file-input">
                            <button>Choose Files</button>
                            <span>No file chosen</span>
                        </div>
                    </div>

                    <div className="profile-row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Your Password" />
                    </div>

                    <div className="profile-row">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Enter Your Confirm Password" />
                    </div>

                    <div className="profile-row" style={{ justifyContent: 'flex-end' }}>
                        <button className="save-btn">Save Changes</button>
                    </div>

                </form>
            </div>

            <div className="address-section-wrapper">
                <h5 className="section-title">Address</h5>

                <div className="address-grid">
                    {addresses.map((addr) => (
                        <div className="address-card" key={addr.id}>

                            <div className="address-header">
                                <h6 className="addr-name">{addr.name}</h6>
                                <span className={`addr-badge ${addr.type.toLowerCase()}`}>
                                    {addr.type}
                                </span>
                            </div>

                            <div className="address-body">
                                <p>{addr.address}</p>
                                <p>{addr.city}</p>
                                <p>{addr.zip}</p>
                                <p className="addr-mobile">Mobile No. {addr.mobile}</p>
                            </div>

                            <div className="address-footer">
                                <button className="addr-btn">Edit</button>
                                <button className="addr-btn">Remove</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Profile;