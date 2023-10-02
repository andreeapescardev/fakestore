import React, {useCallback, useMemo} from 'react';
import '../App.css';
import './ProductCard.css';

import {useCartContext} from '../contexts/CartContext';
import {Product} from '../types/types';

interface ProductCardProps {
    product: Product;
    productsPerRow: number;
    openModal: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({product, productsPerRow, openModal}) => {
    const {title, price, image} = product;

    const {dispatch} = useCartContext();

    const handleAddToCart = useCallback(() => {
        dispatch({type: 'ADD_TO_CART', payload: product});
        openModal();
    }, []);

    // Define the card style with the calculated width
    const cardStyle: React.CSSProperties = useMemo(() => {
        // Calculate the width dynamically based on the number of products per row
        return {
            width: `calc(${100 / productsPerRow}% - 32px)`,
        };
    }, [productsPerRow]);

    return (
        <div style={cardStyle} className="product-card">
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p>Price: {price}</p>
            <button
                className='fake-store-btn'
                onClick={handleAddToCart}
            >Add to Cart
            </button>
        </div>
    );
};

export default React.memo(ProductCard);
