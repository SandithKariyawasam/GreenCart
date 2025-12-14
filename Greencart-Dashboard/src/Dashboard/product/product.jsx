import React, { useState } from 'react'
import './product.css'
// Import your new component
import AddProduct from './components/addproduct' 

const Product = () => {
  // --- State to toggle views ---
  const [showAddForm, setShowAddForm] = useState(false);

  // --- Mock Data ---
  const [products] = useState([
    { id: 1, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/1.jpg', name: 'Aata Biscuit', category: 'Biscuit', qty: 12, price: '$95.97', status: 'Pending' },
    { id: 2, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/2.jpg', name: 'Cold Brew Coffee', category: 'Drinks', qty: 10, price: '$95.97', status: 'Approved' },
    { id: 3, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/3.jpg', name: 'Peanut Butter Cookies', category: 'Cookies', qty: 9, price: '$86.35', status: 'Approved' },
    { id: 4, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/4.jpg', name: 'Wheet Flakes', category: 'Flakes', qty: 8, price: '$95.97', status: 'Pending' },
    { id: 5, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/5.jpg', name: 'Potato Chips', category: 'Chips', qty: 23, price: '$95.97', status: 'Approved' },
    { id: 6, img: 'https://themes.pixelstrap.com/fastkart/assets/images/grocery/product/6.jpg', name: 'Tuwer Dal', category: 'Dals', qty: 50, price: '$95.97', status: 'Approved' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Toggle Handler ---
  const handleToggle = () => {
    setShowAddForm(!showAddForm);
  }

  return (
    <div className="product-page">
      
      {/* Header Section */}
      <div className="page-header">
        {/* Dynamic Title */}
        <h3>{showAddForm ? 'Add New Product' : 'Products List'}</h3>
        
        {/* Toggle Button Functionality */}
        <button className="add-btn" onClick={handleToggle}>
          {showAddForm ? 'Back to List' : 'Add Product'}
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      {showAddForm ? (
        // IF TRUE: Show AddProduct Component
        <AddProduct />
      ) : (
        // IF FALSE: Show Product Table
        <div className="product-container">
          
          <div className="table-controls">
            <div className="search-box">
              <label>Search:</label>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Current Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-img">
                        <img src={item.img} alt={item.name} />
                      </div>
                    </td>
                    <td className="p-name">{item.name}</td>
                    <td className="p-category">{item.category}</td>
                    <td>{item.qty}</td>
                    <td className="p-price">{item.price}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn view"><i className="ri-eye-line"></i></button>
                        <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                        <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}
      {/* End Conditional Rendering */}

    </div>
  )
}

export default Product