import React from 'react';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }
    let shipping = 0;
    if (shipping > 35) {
        shipping = 0;
    }
    else if (total > 35) {
        shipping = 4.99
    }
    else if (shipping > 0) {
        shipping = 12.99;
    }
    const tex = (total / 5).toFixed(2);
    const grandTotal = (total + shipping + Number(tex)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tex + VAT: {tex}</small></p>
            <p>Total Price: {grandTotal}</p>
        </div>
    );
};

export default Cart;