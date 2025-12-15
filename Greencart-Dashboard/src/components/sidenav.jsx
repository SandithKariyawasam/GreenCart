import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom' // Import useNavigate
import '../assets/css/sidenav.css'
import logo from '../../public/greencart.png'

const Sidenav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');

    navigate('/');
  };

  return (
    <div className="sidenav-container">
      <div className="sidenav-img">
        <img src={logo} alt="GreenCart" />
      </div>
      <ul className="sidenav-list">

        <Link to="/dashboard" className="link-style">
          <li className={`list-item ${location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? 'active' : ''}`}>
            <i className="ri-home-line"></i> Dashboard
          </li>
        </Link>

        <Link to="/dashboard/products" className="link-style">
          <li className={`list-item ${isActive('/products')}`}>
            <i className="ri-store-3-line"></i> Product
          </li>
        </Link>

        <Link to="/dashboard/category" className="link-style">
          <li className={`list-item ${isActive('/category')}`}>
            <i className="ri-list-check-2"></i> Category
          </li>
        </Link>

        <Link to="/dashboard/users" className="link-style">
          <li className={`list-item ${isActive('/users')}`}>
            <i className="ri-user-3-line"></i> Users
          </li>
        </Link>

        <Link to="/dashboard/roles" className="link-style">
          <li className={`list-item ${isActive('/roles')}`}>
            <i className="ri-user-2-line"></i> Roles
          </li>
        </Link>

        <Link to="/dashboard/media" className="link-style">
          <li className={`list-item ${isActive('/media')}`}>
            <i className="ri-image-line"></i> Media
          </li>
        </Link>

        <Link to="/dashboard/orders" className="link-style">
          <li className={`list-item ${isActive('/orders')}`}>
            <i className="ri-archive-line"></i> Orders
          </li>
        </Link>

        <Link to="/dashboard/coupons" className="link-style">
          <li className={`list-item ${isActive('/coupons')}`}>
            <i className="ri-price-tag-3-line"></i> Coupons
          </li>
        </Link>

        <Link to="/dashboard/reviews" className="link-style">
          <li className={`list-item ${isActive('/reviews')}`}>
            <i className="ri-star-line"></i> Product Review
          </li>
        </Link>

        <Link to="/dashboard/support" className="link-style">
          <li className={`list-item ${isActive('/support')}`}>
            <i className="ri-phone-line"></i> Support Ticket
          </li>
        </Link>

        <Link to="/dashboard/profile" className="link-style">
          <li className={`list-item ${isActive('/profile')}`}>
            <i className="ri-settings-line"></i> Settings
          </li>
        </Link>

        <div className="link-style" onClick={handleLogout} style={{ color:'red', cursor: 'pointer' }}>
          <li className="list-item" style={{ color:'#F88379'}}>
            <i className="ri-logout-circle-r-line"></i> Log Out
          </li>
        </div>

      </ul>
    </div>
  )
}

export default Sidenav