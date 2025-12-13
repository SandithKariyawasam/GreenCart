import React from 'react'
import '../assets/css/sidenav.css'
import logo from '../../public/greencart.png'

const Sidenav = () => {
  return (
    <>
      <div className="sidenav-container">
        <div className="sidenav-img">
          <img src={logo} alt='' />
        </div>

        <ul className="sidenav-list">
          <li className="list-item">
            <i className="ri-home-line"></i>
            Dashboard
          </li>
          <li className="list-item">
            <i className="ri-store-3-line"></i>
            Product
          </li>
          <li className="list-item">
            <i className="ri-list-check-2"></i>
            Category
          </li>
          <li className="list-item">
            <i className="ri-user-3-line"></i>
            Users
          </li>
          <li className="list-item">
            <i className="ri-user-3-line"></i>
            Roles
          </li>
          <li className="list-item">
            <i className="ri-price-tag-3-line"></i>
            Media
          </li>
          <li className="list-item">
            <i className="ri-archive-line"></i>
            Orders
          </li>
          <li className="list-item">
            <i className="ri-price-tag-3-line"></i>
            Coupons
          </li>
          <li className="list-item">
            <i className="ri-star-line"></i>
            Product Review
          </li>
          <li className="list-item">
            <i className="ri-phone-line"></i>
            Support Ticket
          </li>
          <li className="list-item">
            <i className="ri-settings-line"></i>
            Settings
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidenav
