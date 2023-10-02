import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';

function Header() {
    const location = useLocation();

    return (
        <header>
            <nav>
                <div className='links-wrapper'>
                    <Link className='link' to="/"><strong>Home</strong></Link>
                    {location.pathname !== '/catalog' &&
                        <Link className='link' to="/catalog">Go to <strong>Catalog</strong></Link>}
                    {location.pathname !== '/cart' &&
                        <Link className='link' to="/cart">Go to <strong>Cart</strong></Link>}
                </div>
            </nav>
        </header>
    );
}

export default Header;
