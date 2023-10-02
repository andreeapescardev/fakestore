import React from 'react';
import './CartItem.css';

import {useCartContext} from '../contexts/CartContext';
import {CartProduct} from '../types/types';
import Button from "./Button";

interface ProductCardProps {
    product: CartProduct;
}

const CartItem: React.FC<ProductCardProps> = ({product}) => {
    const {id, title, price, image, quantity} = product;

    const {dispatch} = useCartContext();

    return (
        <>
            <img className='cart-item-img' src={image} alt={title}/>
            <p className='cart-product-title'>{title}</p>
            <span className='cart-product-price'>${parseFloat(price).toFixed(2)}</span>
            <div className='cart-product-quantity'>
                <Button
                    title='-'
                    label='Decrease Quantity'
                    onClick={() => dispatch({type: 'DECREASE_QUANTITY', payload: id})}/>

                <span className='quantity-count'>{quantity}</span>

                <Button
                    title='+'
                    label='Increase Quantity'
                    onClick={() => dispatch({type: 'INCREASE_QUANTITY', payload: id})}/>
            </div>
            <span>${(parseFloat(price) * quantity).toFixed(2)}</span>
            <Button
                title='Delete'
                label='Delete Item from cart'
                onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: id})}/>
        </>
    );
};

export default CartItem;
