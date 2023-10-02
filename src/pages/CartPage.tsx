import React from 'react';
import '../App.css';

import Layout from '../components/Layout';
import {useCartContext} from '../contexts/CartContext';
import {CartProduct} from '../types/types';
import CartItem, {CartHeader} from "../components/CartItem";

function CartPage() {
    const {cartState, dispatch} = useCartContext();
    const items: CartProduct[] = Object.values(cartState.items);

    return (
        <Layout>
            <h2>Shopping Cart</h2>

            <button
                className='fake-store-btn'
                onClick={() => dispatch({type: 'CLEAR_CART'})}
                aria-label="Clear Cart"
            >
                Clear Cart
            </button>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table>
                        <thead>
                        <CartHeader/>
                        </thead>
                        <tbody>
                        {/*TODO this is just a first concept, only oriented on functionality, not on rendering items - next step is rendering items and UI */}
                        {items.map((item: CartProduct) => (
                            <CartItem product={item} key={item.id}/>
                        ))}
                        </tbody>
                    </table>
                    <p>Total Cart Price: ${calculateTotalPrice(items).toFixed(2)}</p>
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
