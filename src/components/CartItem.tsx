import React from 'react';
import '../App.css';
import './CartItem.css';

import {useCartContext} from '../contexts/CartContext';
import {CartProduct} from '../types/types';

interface ProductCardProps {
    product: CartProduct;
}

export const CartHeader: React.FC = () => (
    <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
    </tr>
);

const CartItem: React.FC<ProductCardProps> = ({product}) => {
    const {id, title, price, image, quantity} = product;

    const {dispatch} = useCartContext();

    return (
        <tr key={id} className='cart-item'>
            <td>
                <img src={image} alt={title} style={{width: '50px', height: '50px'}}/>
                <p>{title}</p>
            </td>
            <td>${parseFloat(price).toFixed(2)}</td>
            <td>
                <button
                    className='fake-store-btn'
                    aria-label='Decrease Quantity'
                    onClick={() => dispatch({type: 'DECREASE_QUANTITY', payload: product.id})}
                >-
                </button>

                {quantity}

                <button
                    className='fake-store-btn'
                    aria-label='Increase Quantity'
                    onClick={() => dispatch({type: 'INCREASE_QUANTITY', payload: product.id})}
                >+
                </button>
            </td>
            <td>${(parseFloat(price) * quantity).toFixed(2)}</td>
            <td>
                <button
                    className='fake-store-btn'
                    aria-label='Delete Item from cart'
                    onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: product.id})}
                >Delete
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
