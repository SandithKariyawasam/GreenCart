import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' // Import Router components

import '../assets/css/index.css'

import Sidenav from '../components/sidenav'
import Header from '../components/header'

// Import all your page components
import Dashboard from './dashboard/dashboard'
import Product from './product/product'
import Category from './category/category'
import Users from './users/users'
import Roles from './roles/roles' // Fixed double slash
import Orders from './order/order'
import Coupons from './coupons/coupons'
import Review from './review/review'
import Support from './support/support'
import Profile from './profile/profile'
import Media from './media/media'

const Index = () => {
    return (
        <>
            <div className="index">
                <div className="index-left">
                    <Sidenav />
                </div>
                <div className="index-right">
                    <div className="index-header">
                        <Header />
                    </div>
                    <div className="index-container">
                        
                        {/* --- ROUTING LOGIC HERE --- */}
                        <Routes>
                            {/* Default path redirects to Dashboard */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Product />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/roles" element={<Roles />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/coupons" element={<Coupons />} />
                            <Route path="/reviews" element={<Review />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/media" element={<Media />} />
                        </Routes>
                        {/* -------------------------- */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
