import React, { useState } from 'react'
import './category.css'

import AddCategory from './components/addcategory'

const Category = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Aata Buscuit',
            date: '26-12-2021',
            icon: 'ri-plant-line',
            slug: 'buscuit'
        },
        {
            id: 2,
            name: 'Cold Brew Coffee',
            date: '21-05-2022',
            icon: 'ri-cup-line',
            slug: 'coffee'
        },
        {
            id: 3,
            name: 'Peanut Butter Cookies',
            date: '25-12-2021',
            icon: 'ri-cake-3-line',
            slug: 'cookies'
        },
        {
            id: 4,
            name: 'Wheet Flakes',
            date: '10-05-2022',
            icon: 'ri-bread-line',
            slug: 'flakes'
        },
        {
            id: 5,
            name: 'Potato Chips',
            date: '05-01-2022',
            icon: 'ri-snowflake-line',
            slug: 'chips'
        },
        {
            id: 6,
            name: 'Tuwer Dal',
            date: '20-08-2022',
            icon: 'ri-cake-line',
            slug: 'dal'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="category-page">

            {/* Header Section */}
            <div className="page-header">
                <h3>{showAddForm ? 'Add Category' : 'All Category'}</h3>
                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Back to List' : '+ Add New'}
                </button>
            </div>

            {/* Main Content */}
            <div className="category-container">

                {showAddForm ? (
                    <div className="add-category-form">
                        <AddCategory />
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
                                        <th>Category Name</th>
                                        <th>Date</th>
                                        <th>Icon</th>
                                        <th>Slug</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((item) => (
                                        <tr key={item.id}>
                                            <td className="c-name">{item.name}</td>
                                            <td className="c-date">{item.date}</td>
                                            <td>
                                                <div className="table-icon">
                                                    <i className={item.icon}></i>
                                                </div>
                                            </td>
                                            <td className="c-slug">{item.slug}</td>
                                            <td>
                                                <div className="action-icons">
                                                    <button className="icon-btn view"><i className="ri-eye-line"></i></button>
                                                    <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                                                    <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCategories.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center">No categories found</td>
                                        </tr>
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
