import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <ul>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
