import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'
import img from '../../../assets/images/2.png' // Default fallback image

const Rowone = () => {
    const [filterText, setFilterText] = useState('Today');
    const [openFilter, setOpenFilter] = useState(false);

    // 1. State for Dynamic Data
    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    // 2. State for Chart
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Revenue',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0] // Default empty
        }],
        options: {
            chart: { type: 'area', height: 350, toolbar: { show: false }, fontFamily: 'Poppins, sans-serif' },
            colors: ['#0da487'],
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], axisBorder: { show: false }, axisTicks: { show: false } },
            yaxis: { labels: { formatter: (value) => { return "$" + value } } },
            grid: { strokeDashArray: 4, borderColor: '#f0f0f0' },
            tooltip: { y: { formatter: function (val) { return "$ " + val } } }
        }
    });

    // 3. Fetch Data from Backend
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/dashboard/analytics");

                // Update Chart
                setChartData(prev => ({
                    ...prev,
                    series: [{ name: 'Revenue', data: response.data.revenueData }]
                }));

                // Update Table
                setBestSellingProducts(response.data.bestSelling);

            } catch (error) {
                console.error("Error loading dashboard analytics:", error);
            }
        };

        fetchAnalytics();
    }, []);

    const handleFilterClick = (text) => {
        setFilterText(text);
        setOpenFilter(false);
    }

    return (
        <>
            {/* Left: Revenue Report Chart */}
            <div className="dashboard-col chart-container">
                <div className="col-header">
                    <h5>Revenue Report</h5>
                </div>
                <div className="chart-body">
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="area"
                        height={320}
                    />
                </div>
            </div>

            {/* Right: Best Selling Product Table */}
            <div className="dashboard-col table-container">
                <div className="col-header">
                    <h5>Best Selling Product</h5>
                    <div className="header-filter-wrapper">
                        <div className="header-filter" onClick={() => setOpenFilter(!openFilter)}>
                            Short By: <span className="filter-active">{filterText}</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        {openFilter && (
                            <div className="filter-menu">
                                <div className="filter-item" onClick={() => handleFilterClick('Today')}>Today</div>
                                <div className="filter-item" onClick={() => handleFilterClick('Yesterday')}>Yesterday</div>
                                <div className="filter-item" onClick={() => handleFilterClick('This Week')}>This Week</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="product-table">
                        <tbody>
                            {/* DYNAMIC MAPPING: Loop through products from DB */}
                            {bestSellingProducts.length > 0 ? (
                                bestSellingProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-wrapper">
                                                <div className="img-box">
                                                    {/* Use product image if available, else use default */}
                                                    <img src={product.imageUrl || img} alt="product"
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                                                </div>
                                                <div className="product-details">
                                                    <h6>{product.name}</h6>
                                                    <span>ID: #{product.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="sub-text">Price</span>
                                            <span className="main-text">${product.price}</span>
                                        </td>
                                        <td>
                                            <span className="sub-text">Category</span>
                                            <span className="main-text">{product.category ? product.category.name : 'N/A'}</span>
                                        </td>
                                        <td>
                                            <span className="sub-text">Stock</span>
                                            {/* Assuming you might add stock later, hardcoding for visual consistency */}
                                            <span className="main-text">In Stock</span>
                                        </td>
                                        <td>
                                            <span className="sub-text">Action</span>
                                            <span className="main-text" style={{ cursor: 'pointer', color: '#0da487' }}>View</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                        No products found. Please add products via Postman.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Rowone
