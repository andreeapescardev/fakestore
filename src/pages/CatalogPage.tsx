import React, {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';


import Layout from '../components/Layout';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';
import CatalogPageFilters from '../components/CatalogPageFilters';
import useFetch from '../hooks/useFetch';
import {productsUrl} from '../utils/urls';

function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productsPerRow, setProductsPerRow] = useState<number>(4);
    const [showModal, setShowModal] = useState(false);

    const {data: productsData, loading, error} = useFetch(
        `${selectedCategory
            ? `${productsUrl}/category/${selectedCategory}`
            : productsUrl}?sort=${sortOrder}`
    );

    // filter handlers
    const handleSortChange = useCallback((newSortOrder: string) => {
        setSortOrder(newSortOrder);
    }, []);

    const handleCategoryChange = useCallback((newCategory: string) => {
        setSelectedCategory(newCategory);
    }, []);

    const toggleProductsPerRow = useCallback(() => {
        setProductsPerRow((prev) => (prev === 2 ? 4 : 2));
    }, []);

    // modal handlers
    const openModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    // rendering
    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            {error && <div>There was an error loading the products: {error}</div>}

            <CatalogPageFilters
                productsPerRow={productsPerRow}
                toggleProductsPerRow={toggleProductsPerRow}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
            />

            {/*TODO this is just a first concept, only oriented on functionality, not on rendering items - next step is rendering items and UI */}
            {(productsData && productsData.length > 0) ? (
                <div className="product-list">
                    {productsData.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            productsPerRow={productsPerRow}
                            openModal={openModal}
                        />
                    ))}
                </div>
            ) : (
                <div>No products available{selectedCategory ? 'for the selected category' : ''}.</div>
            )}

            {/* Modal that shows up when product is added in cart */}
            <Modal show={showModal} handleClose={closeModal}>
                <h2>Item was added in cart!</h2>
                <Link to="/cart">View Cart</Link>
            </Modal>
        </Layout>
    );
}

export default CatalogPage;
