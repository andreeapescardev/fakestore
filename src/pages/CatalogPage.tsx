import React, {useState, useCallback, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../App.css';
import './CatalogPage.css';


import Layout from '../components/Layout';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';
import CatalogPageFilters from '../components/CatalogPageFilters';
import useFetch from '../hooks/useFetch';
import {productsUrl} from '../utils/urls';
import useIsMobile from "../hooks/useIsMobile";
import Button from "../components/Button";

function CatalogPage() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productsPerRow, setProductsPerRow] = useState<number>(2);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            setProductsPerRow(4);
        } else {
            setProductsPerRow(2);
        }
    }, [isMobile]);

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

    const toggleProductsPerRow = useCallback((value: number) => {
        setProductsPerRow((prev) => value);
    }, []);

    // modal handlers
    const openModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const navigateToCart = useCallback(() => {
        navigate('/cart');
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

            <h2>Catalog</h2>

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
                <Button
                    label='Go to Cart'
                    title='Go to Cart'
                    onClick={navigateToCart}
                />
            </Modal>
        </Layout>
    );
}

export default CatalogPage;
