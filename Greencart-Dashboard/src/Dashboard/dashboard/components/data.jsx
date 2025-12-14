import React from 'react'

const Data = () => {
    return (
        <>
            {/* Card 1: Total Revenue */}
            <div className="data-card revenue-card">
                <div className="media-body">
                    <span className="card-title">Total Revenue</span>
                    <h4 className="card-number">$6659</h4>
                </div>
                <div className="icon-box">
                    <i className="ri-database-2-line"></i>
                </div>
            </div>

            {/* Card 2: Total Orders */}
            <div className="data-card orders-card">
                <div className="media-body">
                    <span className="card-title">Total Orders</span>
                    <h4 className="card-number">9856</h4>
                </div>
                <div className="icon-box">
                    <i className="ri-shopping-bag-line"></i>
                </div>
            </div>

            {/* Card 3: Total Products */}
            <div className="data-card products-card">
                <div className="media-body">
                    <span className="card-title">Total Products</span>
                    <h4 className="card-number">
                        893
                        <span className="badge">ADD NEW</span>
                    </h4>
                </div>
                <div className="icon-box">
                    <i className="ri-chat-3-line"></i>
                </div>
            </div>

            {/* Card 4: Total Customers */}
            <div className="data-card customers-card">
                <div className="media-body">
                    <span className="card-title">Total Customers</span>
                    <h4 className="card-number">4.6k</h4>
                </div>
                <div className="icon-box">
                    <i className="ri-user-add-line"></i>
                </div>
            </div>
        </>
    )
}

export default Data
