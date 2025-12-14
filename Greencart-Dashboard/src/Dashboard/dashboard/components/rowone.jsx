import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const Rowone = () => {

    const [filterText, setFilterText] = useState('Today');
    const [openFilter, setOpenFilter] = useState(false);

    const [chartData] = useState({
        series: [{
            name: 'Revenue',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                toolbar: { show: false },
                fontFamily: 'Poppins, sans-serif'
            },
            colors: ['#0da487'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.05,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    formatter: (value) => { return "$" + value }
                }
            },
            grid: {
                strokeDashArray: 4,
                borderColor: '#f0f0f0'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val
                    }
                }
            }
        }
    });

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

                        {/* Dropdown Menu */}
                        {openFilter && (
                            <div className="filter-menu">
                                <div className="filter-item" onClick={() => handleFilterClick('Today')}>Today</div>
                                <div className="filter-item" onClick={() => handleFilterClick('Yesterday')}>Yesterday</div>
                                <div className="filter-item" onClick={() => handleFilterClick('This Week')}>This Week</div>
                                <div className="filter-item" onClick={() => handleFilterClick('This Month')}>This Month</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="product-table">
                        <tbody>
                            {/* Product 1 */}
                            <tr>
                                <td>
                                    <div className="product-wrapper">
                                        <div className="img-box">
                                            {/* Replace with actual image */}
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/1.jpg" alt="product" />
                                        </div>
                                        <div className="product-details">
                                            <h6>Aata Biscuit</h6>
                                            <span>26-08-2022</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="sub-text">Price</span>
                                    <span className="main-text">$29.00</span>
                                </td>
                                <td>
                                    <span className="sub-text">Orders</span>
                                    <span className="main-text">62</span>
                                </td>
                                <td>
                                    <span className="sub-text">Stock</span>
                                    <span className="main-text">510</span>
                                </td>
                                <td>
                                    <span className="sub-text">Amount</span>
                                    <span className="main-text">$1,798</span>
                                </td>
                            </tr>

                            {/* Product 2 */}
                            <tr>
                                <td>
                                    <div className="product-wrapper">
                                        <div className="img-box">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/2.jpg" alt="product" />
                                        </div>
                                        <div className="product-details">
                                            <h6>Snack Packet</h6>
                                            <span>26-08-2022</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="sub-text">Price</span>
                                    <span className="main-text">$15.00</span>
                                </td>
                                <td>
                                    <span className="sub-text">Orders</span>
                                    <span className="main-text">120</span>
                                </td>
                                <td>
                                    <span className="sub-text">Stock</span>
                                    <span className="main-text">300</span>
                                </td>
                                <td>
                                    <span className="sub-text">Amount</span>
                                    <span className="main-text">$1,800</span>
                                </td>
                            </tr>

                            {/* Product 3 */}
                            <tr>
                                <td>
                                    <div className="product-wrapper">
                                        <div className="img-box">
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/3.jpg" alt="product" />
                                        </div>
                                        <div className="product-details">
                                            <h6>Orange Juice</h6>
                                            <span>26-08-2022</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="sub-text">Price</span>
                                    <span className="main-text">$12.00</span>
                                </td>
                                <td>
                                    <span className="sub-text">Orders</span>
                                    <span className="main-text">85</span>
                                </td>
                                <td>
                                    <span className="sub-text">Stock</span>
                                    <span className="main-text">150</span>
                                </td>
                                <td>
                                    <span className="sub-text">Amount</span>
                                    <span className="main-text">$1,020</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Rowone
