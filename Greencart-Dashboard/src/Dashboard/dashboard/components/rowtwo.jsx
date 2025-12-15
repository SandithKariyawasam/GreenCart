import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

const Rowtwo = () => {
  const [orderFilterText, setOrderFilterText] = useState('Today');
  const [openOrderFilter, setOpenOrderFilter] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  // Chart State
  const [earningChartData, setEarningChartData] = useState({
    series: [
      { name: 'Revenue', data: [] },
      { name: 'Cost', data: [] }
    ],
    options: {
      chart: { type: 'line', height: 350, toolbar: { show: false }, fontFamily: 'Poppins, sans-serif' },
      colors: ['#0da487', '#5c61f2'],
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 3 },
      markers: { size: 5, hover: { size: 7 } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 120, tickAmount: 6 },
      grid: { strokeDashArray: 4, borderColor: '#f0f0f0' },
      legend: { show: false }
    }
  });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/dashboard/analytics");

        // 1. Update Table Data
        if (res.data.recentOrders) {
          setRecentOrders(res.data.recentOrders);
        }

        // 2. Update Chart Data
        if (res.data.earningSeries) {
          setEarningChartData(prev => ({
            ...prev,
            series: [
              { name: 'Revenue', data: res.data.earningSeries.series1 },
              { name: 'Cost', data: res.data.earningSeries.series2 }
            ]
          }));
        }
      } catch (err) {
        console.error("Error loading Rowtwo data", err);
      }
    };

    fetchData();
  }, []);

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
                <div className="filter-item" onClick={() => { setOrderFilterText('Today'); setOpenOrderFilter(false) }}>Today</div>
                <div className="filter-item" onClick={() => { setOrderFilterText('Yesterday'); setOpenOrderFilter(false) }}>Yesterday</div>
                <div className="filter-item" onClick={() => { setOrderFilterText('This Week'); setOpenOrderFilter(false) }}>This Week</div>
              </div>
            )}
          </div>
        </div>

        <div className="table-responsive">
          <table className="product-table recent-orders-table">
            <thead>
              {/* Headers (Optional based on design) */}
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <div className="product-details">
                        <h6>{order.productName}</h6>
                        <span>{order.orderId}</span>
                      </div>
                    </td>
                    <td>
                      <span className="sub-text">Date Placed</span>
                      <span className="main-text">{order.date}</span>
                    </td>
                    <td>
                      <span className="sub-text">Price</span>
                      <span className="main-text">{order.price}</span>
                    </td>
                    <td>
                      <span className="sub-text">Order Status</span>
                      <span className="main-text">{order.status}</span>
                    </td>
                    <td>
                      <span className="sub-text">Payment</span>
                      <span className="status-success">{order.payment}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No orders found</td>
                </tr>
              )}
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