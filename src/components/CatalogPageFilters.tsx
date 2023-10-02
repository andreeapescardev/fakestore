import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

import {categoriesUrl} from '../utils/urls';

interface CatalogPageFiltersProps {
    productsPerRow: number;
    toggleProductsPerRow: () => void,
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
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch(categoriesUrl)
            .then((res) => res.json())
            .then((json) => setCategories(json));
    }, [categoriesUrl]);

    return (
        <div>
            <Link to="/">Home</Link>

            <div className="switch-container">
                <label>Products per row:</label>
                <label>
                    <input
                        type="radio"
                        name="products-per-row"
                        value="2"
                        checked={productsPerRow === 2}
                        onChange={toggleProductsPerRow}
                    />
                    2
                </label>
                <label>
                    <input
                        type="radio"
                        name="products-per-row"
                        value="4"
                        checked={productsPerRow === 4}
                        onChange={toggleProductsPerRow}
                    />
                    4
                </label>
            </div>

            <div className="category-select">
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

            <div>
                <label>Sort By:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <Link to="/cart">View Cart</Link>
        </div>
    );
}

export default CatalogPageFilters;
