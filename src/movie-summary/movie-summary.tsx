import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './movie-summary.css';

const MovieSummary = () => {
    const navigate = useNavigate();

    const navigateToListPage = () => {
        navigate('/movieList');
    }

    return (
        <>
            <div className="header d-flex w-100 d-flex align-items-center">
                <i className="fa fa-arrow-left me-3 back-icon" onClick={() => { navigateToListPage(); }}></i>
                <span>
                    Movie Summary
                </span>
            </div>
        </>
    );
}

export default MovieSummary;