import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AddCategory = ({ editingCategory, onFinish }) => {

    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null); // Preview for edit
    const [showIconDropdown, setShowIconDropdown] = useState(false);

    const fileInputRef = useRef(null);

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

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setSelectedIcon(editingCategory.icon || '');
            setExistingImageUrl(editingCategory.imageUrl);
        }
    }, [editingCategory]);

    const handleIconSelect = (iconClass) => {
        setSelectedIcon(iconClass);
        setShowIconDropdown(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
        }
    };

    const triggerFileUpload = () => { fileInputRef.current.click(); };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) { alert("Please enter a Category Name"); return; }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("icon", selectedIcon);

            if (categoryImage) {
                formData.append("image", categoryImage);
            }

            if (editingCategory) {
                await axios.put(`http://localhost:8080/api/categories/${editingCategory.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Category Updated!");
            } else {
                await axios.post("http://localhost:8080/api/categories", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Category Created!");
            }

            onFinish();

        } catch (error) {
            console.error("Error saving category:", error);
            alert("Failed to save category.");
        }
    };

    return (
        <div className="add-category-wrapper">
            <div className="form-card">
                <h5 className="card-title">{editingCategory ? 'Edit Category' : 'Category Information'}</h5>

                <form onSubmit={handleSubmit}>
                    {/* 1. Category Name */}
                    <div className="form-group full-width">
                        <label>Category Name</label>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* 2. Category Image */}
                    <div className="form-group full-width">
                        <label>Category Image</label>
                        <div className="image-upload-area" onClick={triggerFileUpload} style={{ cursor: 'pointer' }}>
                            <div className="upload-content">
                                <i className="ri-upload-cloud-2-line"></i>
                                <p>
                                    {categoryImage
                                        ? `Selected: ${categoryImage.name}`
                                        : (existingImageUrl ? "Click to change image" : "Drop files here or click to upload.")}
                                </p>
                            </div>
                            <input type="file" className="hidden-input" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        </div>
                        {/* Preview existing image if editing */}
                        {existingImageUrl && !categoryImage && (
                            <div style={{ marginTop: '10px' }}>
                                <span style={{ fontSize: '12px', color: '#666' }}>Current Image: </span>
                                <img src={existingImageUrl} alt="Current" style={{ width: '50px', borderRadius: '5px', verticalAlign: 'middle' }} />
                            </div>
                        )}
                    </div>

                    {/* 3. Icon Picker */}
                    <div className="form-group full-width relative-group">
                        <label>Select Category Icon</label>
                        <div className="icon-select-input" onClick={() => setShowIconDropdown(!showIconDropdown)}>
                            {selectedIcon ? (
                                <span className="selected-value"><i className={selectedIcon}></i> {selectedIcon}</span>
                            ) : (
                                <span className="placeholder">Select Icon</span>
                            )}
                            <i className="ri-arrow-down-s-line arrow"></i>
                        </div>

                        {showIconDropdown && (
                            <div className="icon-grid-dropdown">
                                {iconList.map((icon) => (
                                    <div key={icon.id} className={`icon-item ${selectedIcon === icon.class ? 'active' : ''}`} onClick={() => handleIconSelect(icon.class)}>
                                        <i className={icon.class}></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button className="add-btn" type="submit">
                            {editingCategory ? 'Update Category' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;