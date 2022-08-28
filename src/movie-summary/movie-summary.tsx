import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import './movie-summary.css';

const MovieSummary = () => {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState<any>();
    const location: any = useLocation();

    useEffect(() => {
        if (location.state.selectedMovie) {
            setSelectedMovie(location.state.selectedMovie);
        }
        else
            navigateToListPage();
    }, [location]);

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-3">
                        <div className="summary-page-wrapper">
                            <div className="movie-name">
                                {selectedMovie?.show?.name}
                            </div>
                            <div className="movie-summary">
                                {Parser(selectedMovie?.show?.summary)}
                            </div>
                            <div className="movie-actions d-flex justify-content-end w-100">
                                <button className="btn btn-primary">Book the Show</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieSummary;