// SearchBar.jsx
import React from 'react';
import { useGlobalContext } from '../context'; // Import the context

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useGlobalContext(); // Get searchTerm and setSearchTerm from context

    return (
        <div className="search-bar-container">
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm in context
            />
        </div>
    );
};

export default SearchBar;
