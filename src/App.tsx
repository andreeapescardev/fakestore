import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {CartProvider} from './contexts/CartContext';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
    return (
        <Router>
            <CartProvider>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/catalog" element={<CatalogPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                </Routes>
            </CartProvider>
        </Router>
    );
};

export default App;
