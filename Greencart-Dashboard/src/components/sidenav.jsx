import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../assets/css/sidenav.css'
import logo from '../../public/greencart.png'

const Sidenav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidenav-container">
      <div className="sidenav-img">
        <img src={logo} alt='' />
      </div>
      <ul className="sidenav-list">

        <Link to="/dashboard" className="link-style">
          <li className={`list-item ${isActive('/dashboard')}`}>
            <i className="ri-home-line"></i> Dashboard
          </li>
        </Link>

        <Link to="/products" className="link-style">
          <li className={`list-item ${isActive('/products')}`}>
            <i className="ri-store-3-line"></i> Product
          </li>
        </Link>

        <Link to="/category" className="link-style">
          <li className={`list-item ${isActive('/category')}`}>
            <i className="ri-list-check-2"></i> Category
          </li>
        </Link>

        <Link to="/users" className="link-style">
          <li className={`list-item ${isActive('/users')}`}>
            <i className="ri-user-3-line"></i> Users
          </li>
        </Link>

        <Link to="/roles" className="link-style">
          <li className={`list-item ${isActive('/roles')}`}>
            <i className="ri-user-2-line"></i> Roles
          </li>
        </Link>

        <Link to="/media" className="link-style">
          <li className={`list-item ${isActive('/media')}`}>
            <i className="ri-image-line"></i> Media
          </li>
        </Link>

        <Link to="/orders" className="link-style">
          <li className={`list-item ${isActive('/orders')}`}>
            <i className="ri-archive-line"></i> Orders
          </li>
        </Link>

        <Link to="/coupons" className="link-style">
          <li className={`list-item ${isActive('/coupons')}`}>
            <i className="ri-price-tag-3-line"></i> Coupons
          </li>
        </Link>

        <Link to="/reviews" className="link-style">
          <li className={`list-item ${isActive('/reviews')}`}>
            <i className="ri-star-line"></i> Product Review
          </li>
        </Link>

        <Link to="/support" className="link-style">
          <li className={`list-item ${isActive('/support')}`}>
            <i className="ri-phone-line"></i> Support Ticket
          </li>
        </Link>

        <Link to="/profile" className="link-style">
          <li className={`list-item ${isActive('/profile')}`}>
            <i className="ri-settings-line"></i> Settings
          </li>
        </Link>

      </ul>
    </div>
  )
}

export default Sidenav