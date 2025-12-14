import React, { useState, useRef } from 'react';

const AddProduct = () => {

    const [productImages, setProductImages] = useState([]);
    const [thumbnailImage, setThumbnailImage] = useState(null);

    const productImagesInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const triggerProductImagesUpload = (e) => {
        e.preventDefault();
        productImagesInputRef.current.click();
    };

    const triggerThumbnailUpload = (e) => {
        e.preventDefault();
        thumbnailInputRef.current.click();
    };

    const handleProductImagesChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setProductImages(filesArray);
        }
    };

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailImage(e.target.files[0]);
        }
    };
    return (
        <div className="add-product-wrapper">

            {/* 1. Product Information */}
            <div className="form-card">
                <h5 className="card-title">Product Information</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Product Name</label>
                        <input type="text" placeholder="Product Name" />
                    </div>
                    <div className="form-group">
                        <label>Product Type</label>
                        <select><option>Simple</option></select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select><option>Electronics</option></select>
                    </div>
                    <div className="form-group">
                        <label>Subcategory</label>
                        <select><option>Ethnic Wear</option></select>
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <select><option>Puma</option></select>
                    </div>
                    <div className="form-group">
                        <label>Unit</label>
                        <select><option>Kilogram</option></select>
                    </div>
                    <div className="form-group full-width">
                        <label>Tags</label>
                        <input type="text" placeholder="Type tag & hit enter" />
                    </div>

                    <div className="toggle-group">
                        <label>Exchangeable</label>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="toggle-group">
                        <label>Refundable</label>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* 2. Description (Rich Text Editor Mock) */}
            <div className="form-card">
                <h5 className="card-title">Description</h5>
                <div className="form-group full-width">
                    <label>Product Description</label>
                    <div className="rich-text-editor">
                        <div className="rte-toolbar">
                            <span>Paragraph <i className="ri-arrow-down-s-line"></i></span>
                            <div className="rte-separator"></div>
                            <i className="ri-bold"></i>
                            <i className="ri-italic"></i>
                            <i className="ri-link"></i>
                            <i className="ri-list-unordered"></i>
                            <i className="ri-list-ordered"></i>
                            <div className="rte-separator"></div>
                            <i className="ri-align-left"></i>
                            <i className="ri-align-center"></i>
                            <div className="rte-separator"></div>
                            <i className="ri-image-line"></i>
                            <i className="ri-double-quotes-l"></i>
                        </div>
                        <textarea className="rte-content"></textarea>
                    </div>
                </div>
            </div>

            {/* 3. Product Images */}
            <div className="form-card">
                <h5 className="card-title">Product Images</h5>
                <div className="form-group full-width file-input-row">
                    <label>Images</label>
                    <input
                        type="file"
                        multiple 
                        accept="image/*" 
                        ref={productImagesInputRef}
                        onChange={handleProductImagesChange}
                        style={{ display: 'none' }} 
                    />

                    <div className="file-upload-box">
                        <button onClick={triggerProductImagesUpload}>Choose Files</button>

                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {productImages.length > 0
                                ? productImages.map((file) => file.name).join(', ') // Join names with commas
                                : 'No file chosen'}
                        </span>
                    </div>
                </div>

                <div className="form-group full-width file-input-row">
                    <label>Thumbnail Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={thumbnailInputRef}
                        onChange={handleThumbnailChange}
                        style={{ display: 'none' }}
                    />

                    <div className="file-upload-box">
                        <button onClick={triggerThumbnailUpload}>Choose File</button>
                        <span>
                            {thumbnailImage
                                ? thumbnailImage.name
                                : 'No file chosen'}
                        </span>
                    </div>
                </div>
            </div>

            {/* 4. Product Variations */}
            <div className="form-card">
                <h5 className="card-title">Product Variations</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Option Name</label>
                        <select><option>Color</option></select>
                    </div>
                    <div className="form-group full-width">
                        <label>Option Value</label>
                        <input type="text" placeholder="Type tag & hit enter" />
                    </div>
                    <div className="add-option-link">
                        <i className="ri-add-line"></i> Add Another Option
                    </div>
                </div>
            </div>

            {/* 5. Product Inventory */}
            <div className="form-card">
                <h5 className="card-title">Product Inventory</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>SKU</label>
                        <input type="text" />
                    </div>
                    <div className="form-group full-width">
                        <label>Stock Status</label>
                        <select><option>In Stock</option></select>
                    </div>

                    {/* Inventory Table */}
                    <div className="inventory-table-wrapper full-width">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Variant</th>
                                    <th>Price</th>
                                    <th>SKU</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Red</td>
                                    <td><input type="number" defaultValue="0" /></td>
                                    <td><input type="text" defaultValue="0" /></td>
                                    <td><input type="number" defaultValue="0" /></td>
                                    <td><i className="ri-delete-bin-line delete-icon"></i></td>
                                </tr>
                                <tr>
                                    <td>Blue</td>
                                    <td><input type="number" defaultValue="0" /></td>
                                    <td><input type="text" defaultValue="0" /></td>
                                    <td><input type="number" defaultValue="0" /></td>
                                    <td><i className="ri-delete-bin-line delete-icon"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 6. Product Price */}
            <div className="form-card">
                <h5 className="card-title">Product Price</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Price</label>
                        <input type="number" placeholder="0" />
                    </div>
                    <div className="form-group full-width">
                        <label>Compare at price</label>
                        <input type="number" placeholder="0" />
                    </div>
                    <div className="form-group full-width price-row">
                        <div className="price-input">
                            <label>Cost per item</label>
                            <input type="number" placeholder="0" />
                        </div>
                        <div className="price-stats">
                            <span>Margin: 25%</span>
                            <span>Profit: $5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Link Products */}
            <div className="form-card">
                <h5 className="card-title">Link Products</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Upsells</label>
                        <input type="text" />
                    </div>
                    <div className="form-group full-width">
                        <label>Cross-Sells</label>
                        <input type="text" />
                    </div>
                </div>
            </div>

            {/* 8. Shipping */}
            <div className="form-card">
                <h5 className="card-title">Shipping</h5>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Weight (kg)</label>
                        <input type="text" placeholder="Weight" />
                    </div>
                    <div className="form-group full-width">
                        <label>Dimensions (cm)</label>
                        <select><option>Length</option></select>
                    </div>
                </div>
            </div>

            {/* Submit Action */}
            <div className="form-actions">
                <button className="add-btn">Add Product</button>
            </div>

        </div>
    )
}

export default AddProduct;