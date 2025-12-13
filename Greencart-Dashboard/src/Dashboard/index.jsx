import React from 'react'

import '../assets/css/index.css'

import Sidenav from '../components/sidenav'
import Header from '../components/header'

import Dashboard from './dashboard/dashboard'

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
                        <Dashboard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
