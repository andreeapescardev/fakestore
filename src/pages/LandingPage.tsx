import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleOpenCatalog = useCallback(() => {
        navigate('/catalog');
    }, []);

    return (
        <div className="landing-page">
            <h1>Welcome to Our Store!</h1>
            <p>Discover a wide range of amazing products.</p>

            <button
                className='fake-store-btn'
                aria-label="Open Catalog"
                onClick={handleOpenCatalog}>
                Open Catalog
            </button>
        </div>
    );
};

export default LandingPage;
