import React, {useState, useEffect} from 'react';

import useIsMobile from '../hooks/useIsMobile';
import {categoriesUrl} from '../utils/urls';
import './CatalogPageFilters.css';

interface CatalogPageFiltersProps {
    productsPerRow: number;
    toggleProductsPerRow: (target: number) => void,
    selectedCategory: string,
    handleCategoryChange: (category: string) => void,
    sortOrder: string,
    handleSortChange: (sortOrder: string) => void
}

const CatalogPageFilters: React.FC<CatalogPageFiltersProps> = (props) => {
    const {
        productsPerRow,
        toggleProductsPerRow,
        handleCategoryChange,
        selectedCategory,
        sortOrder,
        handleSortChange
    } = props;
    const isMobile = useIsMobile();
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch(categoriesUrl)
            .then((res) => res.json())
            .then((json) => setCategories(json));
    }, [categoriesUrl]);

    const productsPerRowOptions = isMobile ? {low: 1, high: 2} : {low: 2, high: 4};

    return (
        <div className='filters-wrapper'>
            <div className="filter-container">
                <label>Products per row:</label>
                <label>
                    <input
                        type="radio"
                        name="products-per-row"
                        value={productsPerRowOptions.low}
                        checked={productsPerRow === productsPerRowOptions.low}
                        onChange={(e) => toggleProductsPerRow(parseInt(e.target.value))}
                    />
                    {productsPerRowOptions.low}
                </label>
                <label>
                    <input
                        type="radio"
                        name="products-per-row"
                        value={productsPerRowOptions.high}
                        checked={productsPerRow === productsPerRowOptions.high}
                        onChange={(e) => toggleProductsPerRow(parseInt(e.target.value))}
                    />
                    {productsPerRowOptions.high}
                </label>
            </div>

            <div className="filter-container">
                <label>Select Category:</label>
                <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryChange(e.target.value)}
                    value={selectedCategory}
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className='filter-container'>
                <label>Sort By:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
}

export default CatalogPageFilters;
