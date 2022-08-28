import React, { useEffect, useState } from 'react';
import { getShowsList } from '../api/movie.api';
import { useNavigate } from 'react-router-dom';
import './movie-list.css';

const MovieList = () => {
    const navigate = useNavigate();
    const [showList, setShowList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        getShowsList('all').then((res: any) => {
            if (res?.data?.length) {
                setShowList(res?.data);
            }
            else
                console.log("No movies found");
        }, (err) => {
            console.log("Something went wrong", err);
        });
    }

    const navigateToSummaryPage = () => {
        navigate('/movieSummary');
    }
    return (
        <>
            <div className="header d-flex w-100">
                Movie List
            </div>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-12">
                        <div className="show-list-wrapper">
                            {showList?.length && (
                                showList.map((item: any) => {
                                    return (
                                        <div className="row show-wrapper" key={item?.show?.id}>
                                            <div className="col-12 col-md-6 col-lg-3 ps-0 pt-3 pt-md-0 d-flex justify-content-center justify-content-md-start">
                                                <img src={item?.show?.image?.medium} alt="Movie poster" />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-9 py-3">
                                                <div className="movie-name">
                                                    {item.show.name}
                                                </div>
                                                <div className="movie-language movie-description">
                                                    <span className="heading"> Language :  </span>
                                                    {item.show.language}</div>
                                                <div className="movie-status movie-description">
                                                    <span className="heading"> Status :  </span>
                                                    {item.show.status}</div>
                                                <div className="movie-type movie-description">
                                                    <span className="heading"> Type :  </span>
                                                    {item.show.type}</div>
                                                <div className="movie-premiered movie-description">
                                                    <span className="heading"> Premiered Date:  </span>
                                                    {item.show.premiered}</div>
                                                <div className="movie-score movie-description">
                                                    <span className="heading"> Score :  </span>
                                                    {item.score}</div>
                                                <div className="movie-actions pt-3">
                                                    <button className="btn btn-primary" onClick={() => { navigateToSummaryPage() }}>Summary</button>
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MovieList;