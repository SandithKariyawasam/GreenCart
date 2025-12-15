import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AddProduct = ({ editingProduct, onFinish }) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        unit: 'Per Item',
    });

    const [categories, setCategories] = useState([]);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    const thumbnailInputRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categories");
                setCategories(response.data);
                if (!editingProduct && response.data.length > 0) {
                    setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
                }
            } catch (error) { console.error(error); }
        };
        fetchCategories();

        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                categoryId: editingProduct.category ? editingProduct.category.id : '',
                unit: editingProduct.unit || 'Per Item',
            });
            setExistingImageUrl(editingProduct.imageUrl);
        }
    }, [editingProduct]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) setThumbnailImage(e.target.files[0]);
    };

    const triggerThumbnailUpload = (e) => { e.preventDefault(); thumbnailInputRef.current.click(); };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price || !formData.categoryId) {
            alert("Please fill in Name, Price, and Category!");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("categoryId", formData.categoryId);
            data.append("unit", formData.unit);

            if (thumbnailImage) {
                data.append("image", thumbnailImage);
            }

            if (editingProduct) {
                await axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Product Updated!");
            } else {
                if (!thumbnailImage) { alert("Thumbnail is required for new products!"); return; }
                data.append("image", thumbnailImage);

                await axios.post("http://localhost:8080/api/products", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Product Added!");
            }

            onFinish();

        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save. Check console.");
        }
    };

    return (
        <div className="add-product-wrapper">
            <div className="form-card">
                <h5 className="card-title">{editingProduct ? 'Edit Product' : 'Product Information'}</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Unit</label>
                        <select name="unit" value={formData.unit} onChange={handleChange}>
                            <option value="Per Item">Per Item</option>
                            <option value="Weight">Weight (kg/g)</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </div>

                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea className="rte-content" name="description" value={formData.description} onChange={handleChange} style={{ height: '100px', width: '100%', padding: '10px', border: '1px solid #ddd' }} />
                    </div>

                    <div className="form-group full-width file-input-row">
                        <label>Thumbnail Image</label>
                        <input type="file" accept="image/*" ref={thumbnailInputRef} onChange={handleThumbnailChange} style={{ display: 'none' }} />
                        <div className="file-upload-box">
                            <button onClick={triggerThumbnailUpload}>
                                {editingProduct ? 'Change File' : 'Choose File'}
                            </button>
                            <span>{thumbnailImage ? thumbnailImage.name : (existingImageUrl ? "Keep existing image" : "No file chosen")}</span>
                        </div>
                        {/* Show Preview if Editing */}
                        {existingImageUrl && !thumbnailImage && (
                            <img src={existingImageUrl} alt="Current" style={{ width: '40px', height: '40px', marginLeft: '10px', borderRadius: '5px' }} />
                        )}
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button className="add-btn" onClick={handleSubmit}>
                    {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </div>
    );
};

export default AddProduct;