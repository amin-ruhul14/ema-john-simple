import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Produt.css';

const Product = (props) => {
    // console.log(props);


    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4 className='product-name'>{name}</h4>
                <br />
                <p><small>{seller}</small></p>
                <br />
                <p>${price}</p>
                <br />
                <p><small>Only{stock} left in stock - Order soon</small></p>
                <button className='main-button'
                    onClick={() => props.handleAddProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>
            </div>

        </div>
    );
};

export default Product;