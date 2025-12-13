import React from 'react'
import '../assets/css/header.css'
import user from '../assets/images/me2.jpeg'

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-container">

        <div className="header-search">
          <input
            type="text"
            placeholder="Search Fastkart .."
          />
          <button className="search-btn">
            <i className="ri-search-line"></i>
          </button>
        </div>

        <div className="header-details">
          <div className="profile-section">
            <img
              src={user}
              alt="user"
              className="profile-img"
            />
            <div className="profile-info">
              <h4 className="user-name">Emay Walter</h4>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header
