import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './product.css'

import defaultImg from '../../assets/images/2.png'
import AddProduct from './components/addproduct'

const Product = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        fetchProducts();
        alert("Product deleted!");
      } catch (error) {
        console.error("Error deleting product:", error);
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert("Failed to delete product.");
        }
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowAddForm(true);
  };

  const handleBackToList = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">

      <div className="page-header">
        <h3>{showAddForm ? (editingProduct ? 'Edit Product' : 'Add New Product') : 'Products List'}</h3>

        {/* Toggle Button */}
        <button className="add-btn" onClick={showAddForm ? handleBackToList : handleAddNew}>
          {showAddForm ? 'Back to List' : 'Add Product'}
        </button>
      </div>

      {showAddForm ? (
        <AddProduct
          editingProduct={editingProduct}
          onFinish={handleBackToList}
        />
      ) : (
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
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-img">
                        <img src={item.imageUrl || defaultImg} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                      </div>
                    </td>
                    <td className="p-name">{item.name}</td>
                    <td className="p-category">{item.category ? item.category.name : 'N/A'}</td>
                    <td>{item.unit}</td>
                    <td className="p-price">${item.price}</td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn view"><i className="ri-eye-line"></i></button>

                        {/* EDIT BUTTON */}
                        <button className="icon-btn edit" onClick={() => handleEdit(item)}>
                          <i className="ri-pencil-line"></i>
                        </button>

                        {/* DELETE BUTTON */}
                        <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                          <i className="ri-delete-bin-line"></i>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product