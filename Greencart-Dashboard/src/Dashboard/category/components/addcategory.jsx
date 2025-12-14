import React, { useState } from 'react';

const AddCategory = () => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [showIconDropdown, setShowIconDropdown] = useState(false);

    const iconList = [
        { id: 'veg', class: 'ri-plant-line', name: 'Veg' },
        { id: 'cup', class: 'ri-cup-line', name: 'Cup' },
        { id: 'meat', class: 'ri-restaurant-2-line', name: 'Meat' },
        { id: 'bread', class: 'ri-cake-3-line', name: 'Bakery' },
        { id: 'snow', class: 'ri-snowflake-line', name: 'Frozen' },
        { id: 'cake', class: 'ri-cake-line', name: 'Sweet' },
        { id: 'leaf', class: 'ri-leaf-line', name: 'Organic' },
        { id: 'wine', class: 'ri-goblet-line', name: 'Wine' },
        { id: 'bag', class: 'ri-shopping-bag-3-line', name: 'Bag' },
        { id: 'dog', class: 'ri-bear-smile-line', name: 'Pet' },
    ];

    const handleIconSelect = (iconClass) => {
        setSelectedIcon(iconClass);
        setShowIconDropdown(false);
    };

    return (
        <div className="add-category-wrapper">

            <div className="form-card">
                <h5 className="card-title">Category Information</h5>

                <form onSubmit={(e) => e.preventDefault()}>

                    {/* 1. Category Name */}
                    <div className="form-group full-width">
                        <label>Category Name</label>
                        <input type="text" placeholder="Category Name" />
                    </div>

                    {/* 2. Category Image (Upload Box) */}
                    <div className="form-group full-width">
                        <label>Category Image</label>
                        <div className="image-upload-area">
                            <div className="upload-content">
                                <i className="ri-upload-cloud-2-line"></i>
                                <p>Drop files here or click to upload.</p>
                            </div>
                            <input type="file" className="hidden-input" />
                        </div>
                    </div>

                    {/* 3. Custom Icon Picker */}
                    <div className="form-group full-width relative-group">
                        <label>Select Category Icon</label>

                        <div
                            className="icon-select-input"
                            onClick={() => setShowIconDropdown(!showIconDropdown)}
                        >
                            {selectedIcon ? (
                                <span className="selected-value">
                                    <i className={selectedIcon}></i> {selectedIcon}
                                </span>
                            ) : (
                                <span className="placeholder">Select Icon</span>
                            )}
                            <i className="ri-arrow-down-s-line arrow"></i>
                        </div>

                        {showIconDropdown && (
                            <div className="icon-grid-dropdown">
                                {iconList.map((icon) => (
                                    <div
                                        key={icon.id}
                                        className={`icon-item ${selectedIcon === icon.class ? 'active' : ''}`}
                                        onClick={() => handleIconSelect(icon.class)}
                                    >
                                        <i className={icon.class}></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button className="add-btn">Create Category</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddCategory