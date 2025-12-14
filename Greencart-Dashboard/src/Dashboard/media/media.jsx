import React, { useState, useEffect } from 'react';
import './media.css';

import img from '../../assets/images/2.png'

const Media = () => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const [mediaFiles] = useState([
        { id: 1, url: img, alt: 'Biscuits' },
        { id: 2, url: img, alt: 'Coffee' },
        { id: 3, url: img, alt: 'Chips Box' },
        { id: 4, url: img, alt: 'Snack Bowl' },
        { id: 5, url: img, alt: 'Chips Packet' },
        { id: 6, url: img, alt: 'Dal Bowl' },
        { id: 7, url: img, alt: 'Milk' },
        { id: 8, url: img, alt: 'Pet Food' },
        { id: 9, url: img, alt: 'Meat' },
        { id: 10, url: img, alt: 'Coffee Jar' },
        { id: 11, url: img, alt: 'Buns' },
        { id: 12, url: img, alt: 'Chilies' },
    ]);

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDropdownClick = (e, id) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="media-page">
            <div className="media-container">

                {/* --- Header --- */}
                <div className="media-header">
                    <div className="header-left">
                        <h3>Media Library</h3>
                        <div className="selection-controls">
                            <span className="select-count">selected({selectedIds.length})</span>
                            <button className="control-icon" title="Download"><i className="ri-download-line"></i></button>
                            <button className="control-icon" title="Delete"><i className="ri-delete-bin-line"></i></button>
                        </div>
                    </div>
                </div>

                {/* --- Grid --- */}
                <div className="media-grid">
                    {mediaFiles.map((file) => {
                        const isSelected = selectedIds.includes(file.id);
                        const isMenuOpen = activeDropdown === file.id;

                        return (
                            <div
                                key={file.id}
                                className={`media-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleSelection(file.id)}
                            >
                                {isSelected && (
                                    <div className="check-badge">
                                        <i className="ri-check-line"></i>
                                    </div>
                                )}

                                <div className="img-wrapper">
                                    <img src={file.url} alt={file.alt} />
                                </div>

                                <div
                                    className={`option-btn ${isMenuOpen ? 'active' : ''}`}
                                    onClick={(e) => handleDropdownClick(e, file.id)}
                                >
                                    <i className="ri-more-fill"></i>

                                    {isMenuOpen && (
                                        <div className="media-dropdown">
                                            <div className="m-item">
                                                <i className="ri-download-line"></i> Download
                                            </div>
                                            <div className="m-item">
                                                <i className="ri-delete-bin-line"></i> Delete
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default Media;