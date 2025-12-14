import React, { useState } from 'react';
import './review.css';

const Review = () => {
    const [reviews, setReviews] = useState([
        { id: 1, no: '01', customer: 'Maureen Biologist', product: 'Outwear & Coats', rating: 2, comment: 'The Product is No Longer Needed', status: 'published' },
        { id: 2, no: '02', customer: 'Caroline Harris', product: 'Slim Fit Plastic Coat', rating: 5, comment: 'The Product is No Longer Needed', status: 'published' },
        { id: 3, no: '03', customer: 'Lucy Morile', product: "Men's Sweatshirt", rating: 3, comment: 'The Product is No Longer Needed', status: 'published' },
        { id: 4, no: '04', customer: 'Jennifer Straight', product: "Men's Hoodie t-shirt", rating: 4, comment: 'The Product is No Longer Needed', status: 'unpublished' },
        { id: 5, no: '05', customer: 'Kevin Millett', product: 'Outwear & Coats', rating: 3, comment: 'The Product is No Longer Needed', status: 'published' },
        { id: 6, no: '06', customer: 'czxc', product: 'Slim Fit Plastic Coat', rating: 2, comment: 'The Product is No Longer Needed', status: 'unpublished' },
        { id: 7, no: '07', customer: 'Kevin Millett', product: "Men's Sweatshirt", rating: 5, comment: 'The Product is No Longer Needed', status: 'unpublished' },
        { id: 8, no: '08', customer: 'Dillon Bradshaw', product: "Men's Hoodie t-shirt", rating: 5, comment: 'The Product is No Longer Needed', status: 'published' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleReviewAction = (id, newStatus) => {
        setReviews(reviews.map(review =>
            review.id === id ? { ...review, status: newStatus } : review
        ));
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="ri-star-fill star-gold"></i>);
            } else {
                stars.push(<i key={i} className="ri-star-fill star-gray"></i>);
            }
        }
        return stars;
    };

    const filteredReviews = reviews.filter(item =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="review-page">
            <div className="page-header">
                <h3>Product Reviews</h3>
            </div>

            <div className="review-container">

                {/* Search Bar */}
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

                {/* Reviews Table */}
                <div className="table-responsive">
                    <table className="review-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Customer Name</th>
                                <th>Product Name</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th className="text-center">Published</th>
                                <th className="text-center">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.no}</td>
                                    <td className="fw-500">{item.customer}</td>
                                    <td>{item.product}</td>
                                    <td>
                                        <div className="rating-box">
                                            {renderStars(item.rating)}
                                        </div>
                                    </td>
                                    <td className="comment-text">{item.comment}</td>

                                    <td className="text-center">
                                        {item.status === 'published' ? (
                                            <div className="status-circle success">
                                                <i className="ri-checkbox-circle-line"></i>
                                            </div>
                                        ) : (
                                            <div className="status-circle danger">
                                                <i className="ri-close-circle-line"></i>
                                            </div>
                                        )}
                                    </td>

                                    <td className="text-center">
                                        <div className="action-buttons">
                                            <button
                                                className="btn-action accept"
                                                onClick={() => handleReviewAction(item.id, 'published')}
                                                title="Accept Review"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn-action reject"
                                                onClick={() => handleReviewAction(item.id, 'unpublished')}
                                                title="Reject Review"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredReviews.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center">No reviews found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Review;