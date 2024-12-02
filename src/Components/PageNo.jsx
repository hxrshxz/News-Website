import React from 'react';
import { useGlobalContext } from '../context';

const PageNo = () => {
    const { pageNo, setPageNo, nbPages, } = useGlobalContext();

    const handlePrev = () => {
        setPageNo((prevPage) => Math.max(prevPage - 1, 1)); // Decrease page but not below 1
    };

    const handleNext = () => {
        setPageNo((prevPage) => Math.min(prevPage + 1, nbPages)); // Increase page but not above nbPages
    };

    return (
        <div className="page-no-container">
            <button onClick={handlePrev} disabled={pageNo === 1}>
                Prev
            </button>
            <span>{pageNo} of {nbPages}</span>
            <button onClick={handleNext} disabled={pageNo === nbPages}>
                Next
            </button>
        </div>
    );
};

export default PageNo;
