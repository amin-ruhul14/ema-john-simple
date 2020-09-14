import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightGray',
        paddingBottom: '10px',
        marginBottom: '10px',
        marginLeft: '200px'

    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h2 className="product-name">{name}</h2>
            <p>Quantity: {quantity}</p>
            <small>$ {price}</small>
            <br />
            <button
                className="main-button"
                onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;