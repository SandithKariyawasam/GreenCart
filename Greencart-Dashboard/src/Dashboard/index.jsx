import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import '../assets/css/index.css'

import Sidenav from '../components/sidenav'
import Header from '../components/header'

import Dashboard from './dashboard/dashboard'
import Product from './product/product'
import Category from './category/category'
import Users from './users/users'
import Roles from './roles/roles'
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

                        <Routes>
                            <Route index element={<Dashboard />} />

                            <Route path="products" element={<Product />} />
                            <Route path="category" element={<Category />} />
                            <Route path="users" element={<Users />} />
                            <Route path="roles" element={<Roles />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="coupons" element={<Coupons />} />
                            <Route path="reviews" element={<Review />} />
                            <Route path="support" element={<Support />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="media" element={<Media />} />

                            <Route path="*" element={<Navigate to="." replace />} />
                        </Routes>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
