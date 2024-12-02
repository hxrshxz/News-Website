// AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Context provider
const AppProvider = ({ children }) => {
    const [info, setInfo] = useState([]); // State for API data
    const [error, setError] = useState(null); // State for errors
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    const [pageNo, setPageNo] = useState(''); // State for page number
    const [nbPages, setnbPages] = useState(''); // State for number of pages
    // Fetch data based on the search term
    useEffect(() => {
        if (searchTerm) { // Only fetch if there's a search term
            fetch(`http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${pageNo}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    setPageNo(data.page);
                    setnbPages(data.nbPages);
                    setInfo(data.hits);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setError(error.message);
                });
        }
    }, [searchTerm, pageNo]); // Trigger fetch when the search term changes

    const removePost = (id) => {
        const updatedInfo = info.filter((post) => post.objectID !== id);
        setInfo(updatedInfo);
    };


    // Value to share via context
    const value = {
        info,
        error,
        searchTerm,
        setSearchTerm, // Provide a function to update the search term
        pageNo,
        setPageNo,
        nbPages,
        setnbPages,
        removePost

    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use context
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
