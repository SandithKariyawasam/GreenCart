import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const Rowtwo = () => {

    const [orderFilterText, setOrderFilterText] = useState('Today');
  const [openOrderFilter, setOpenOrderFilter] = useState(false);

  const [earningChartData] = useState({
    series: [
      { name: 'Series 1', data: [35, 40, 60, 42, 30, 37, 36, 50, 32, 35] },
      { name: 'Series 2', data: [85, 57, 74, 99, 48, 61, 47, 81, 57, 44] }
    ],
    options: {
      chart: { type: 'line', height: 350, toolbar: { show: false }, fontFamily: 'Poppins, sans-serif' },
      colors: ['#0da487', '#5c61f2'], // Green and Blue
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 3 }, // Straight lines as per screenshot
      markers: { size: 5, hover: { size: 7 } }, // Dots on the lines
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 120, tickAmount: 6 },
      grid: { strokeDashArray: 4, borderColor: '#f0f0f0' },
      legend: { show: false }
    }
  });

  return (
    <>
      {/* LEFT: Recent Orders Table */}
          <div className="dashboard-col table-container">
            <div className="col-header">
              <h5>Recent Orders</h5>
              
              {/* Dropdown for Orders */}
              <div className="header-filter-wrapper">
                <div className="header-filter" onClick={() => setOpenOrderFilter(!openOrderFilter)}>
                  Short By: <span className="filter-active">{orderFilterText}</span> 
                  <i className="ri-arrow-down-s-line"></i>
                </div>
                {openOrderFilter && (
                  <div className="filter-menu">
                    <div className="filter-item" onClick={() => {setOrderFilterText('Today'); setOpenOrderFilter(false)}}>Today</div>
                    <div className="filter-item" onClick={() => {setOrderFilterText('Yesterday'); setOpenOrderFilter(false)}}>Yesterday</div>
                    <div className="filter-item" onClick={() => {setOrderFilterText('This Week'); setOpenOrderFilter(false)}}>This Week</div>
                  </div>
                )}
              </div>

            </div>

            <div className="table-responsive">
              <table className="product-table recent-orders-table">
                <thead>
                   {/* Optional: Add headers if you want, screenshot doesn't show explicit headers but data implies them */}
                </thead>
                <tbody>
                  {/* Order 1 */}
                  <tr>
                    <td>
                      <div className="product-details">
                        <h6>Aata Biscuit</h6>
                        <span>#64548</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-text">Date Placed</span>
                      <span className="main-text">5/1/22</span>
                    </td>
                    <td>
                      <span className="sub-text">Price</span>
                      <span className="main-text">$250.00</span>
                    </td>
                    <td>
                      <span className="sub-text">Order Status</span>
                      <span className="main-text">Completed</span>
                    </td>
                    <td>
                      <span className="sub-text">Payment</span>
                      <span className="status-success">Paid</span>
                    </td>
                  </tr>
                  
                  {/* Order 2 */}
                  <tr>
                    <td>
                      <div className="product-details">
                        <h6>Aata Biscuit</h6>
                        <span>26-08-2022</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-text">Date Placed</span>
                      <span className="main-text">5/1/22</span>
                    </td>
                    <td>
                      <span className="sub-text">Price</span>
                      <span className="main-text">$250.00</span>
                    </td>
                    <td>
                      <span className="sub-text">Order Status</span>
                      <span className="main-text">Completed</span>
                    </td>
                    <td>
                      <span className="sub-text">Payment</span>
                      <span className="status-success">Paid</span>
                    </td>
                  </tr>

                  {/* Order 3 */}
                  <tr>
                    <td>
                      <div className="product-details">
                        <h6>Aata Biscuit</h6>
                        <span>26-08-2022</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-text">Date Placed</span>
                      <span className="main-text">5/1/22</span>
                    </td>
                    <td>
                      <span className="sub-text">Price</span>
                      <span className="main-text">$250.00</span>
                    </td>
                    <td>
                      <span className="sub-text">Order Status</span>
                      <span className="main-text">Completed</span>
                    </td>
                    <td>
                      <span className="sub-text">Payment</span>
                      <span className="status-success">Paid</span>
                    </td>
                  </tr>
                  
                  {/* Order 4 */}
                  <tr>
                    <td>
                      <div className="product-details">
                        <h6>Aata Biscuit</h6>
                        <span>26-08-2022</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-text">Date Placed</span>
                      <span className="main-text">5/1/22</span>
                    </td>
                    <td>
                      <span className="sub-text">Price</span>
                      <span className="main-text">$250.00</span>
                    </td>
                    <td>
                      <span className="sub-text">Order Status</span>
                      <span className="main-text">Completed</span>
                    </td>
                    <td>
                      <span className="sub-text">Payment</span>
                      <span className="status-success">Paid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: Earning Chart */}
          <div className="dashboard-col chart-container">
            <div className="col-header">
              <h5>Earning</h5>
            </div>
            <div className="chart-body">
              <ReactApexChart 
                options={earningChartData.options} 
                series={earningChartData.series} 
                type="line" 
                height={320} 
              />
            </div>
          </div>
    </>
  )
}

export default Rowtwo
