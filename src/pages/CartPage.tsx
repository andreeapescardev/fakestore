import React from 'react';
import '../App.css';
import './CartPage.css';

import Layout from '../components/Layout';
import {useCartContext} from '../contexts/CartContext';
import {CartProduct} from '../types/types';
import CartItem from "../components/CartItem";
import Button from "../components/Button";

function CartPage() {
    const {cartState, dispatch} = useCartContext();
    const items: CartProduct[] = Object.values(cartState.items);

    return (
        <Layout>
            <h2>Shopping Cart</h2>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="wrapper">
                    {items.map((item: CartProduct) => (
                        <CartItem product={item} key={item.id}/>
                    ))}
                    <div className='total-price'>
                        <p>Total Cart Price: ${calculateTotalPrice(items).toFixed(2)}</p>
                    </div>
                    <Button title='Clear Cart' label='Clear Cart' onClick={() => dispatch({type: 'CLEAR_CART'})}/>
                </div>
            )}
        </Layout>
    );
}

// Helper function to calculate total price
function calculateTotalPrice(items: CartProduct[]) {
    return items.reduce((totalPrice, item) => {
        const itemPrice = parseFloat(item.price);
        return totalPrice + itemPrice * item.quantity;
    }, 0);
}

export default CartPage;
