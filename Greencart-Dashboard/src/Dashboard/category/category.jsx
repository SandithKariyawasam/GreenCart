import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './category.css'
import AddCategory from './components/addcategory'

const Category = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`https://166720c8-b530-49b2-b541-bf6a0cec22d8-prod.e1-us-east-azure.choreoapis.dev/greencart/greencart-backend/v1/api/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error("Delete failed", error);
                alert("Cannot delete category (It might be in use)");
            }
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowAddForm(true);
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setShowAddForm(true);
    };

    const handleBackToList = () => {
        setShowAddForm(false);
        setEditingCategory(null);
        fetchCategories();
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="category-page">
            <div className="page-header">
                <h3>{showAddForm ? (editingCategory ? 'Edit Category' : 'Add Category') : 'All Category'}</h3>
                <button className="add-btn" onClick={showAddForm ? handleBackToList : handleAddNew}>
                    {showAddForm ? 'Back to List' : '+ Add New'}
                </button>
            </div>

            <div className="category-container">
                {showAddForm ? (
                    <div className="add-category-form">
                        {/* Pass props to child */}
                        <AddCategory
                            editingCategory={editingCategory}
                            onFinish={handleBackToList}
                        />
                    </div>
                ) : (
                    <>
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
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Category Name</th>
                                        <th>Icon Class</th>
                                        <th>Image</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="table-icon">
                                                    <i className={item.icon || 'ri-folder-line'}></i>
                                                </div>
                                            </td>
                                            <td className="c-name">{item.name}</td>
                                            <td className="c-date">{item.icon}</td>
                                            <td>
                                                {item.imageUrl && <img src={item.imageUrl} alt="icon" style={{ width: '40px', borderRadius: '5px' }} />}
                                            </td>
                                            <td>
                                                <div className="action-icons">
                                                    <button className="icon-btn edit" onClick={() => handleEdit(item)}>
                                                        <i className="ri-pencil-line"></i>
                                                    </button>
                                                    <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCategories.length === 0 && (
                                        <tr><td colSpan="5" className="text-center">No categories found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Category
