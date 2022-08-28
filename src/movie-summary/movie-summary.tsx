import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import './movie-summary.css';
import { Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment'

const MovieSummary = () => {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState<any>();
    const location: any = useLocation();
    const [showModal, setModalShow] = useState(false);
    const handleModalClose = () => {
        setModalShow(false);
        setBookingDetails({
            noOfSeats: '',
            date: ''
        })
    }
    const handleModalShow = () => setModalShow(true);
    const [bookingDetails, setBookingDetails] = useState({
        noOfSeats: '',
        date: ''
    });

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

    const bookShow = () => {
        if (!bookingDetails.noOfSeats || parseInt(bookingDetails.noOfSeats) <= 0) {
            return toast.error("Please select atleast one seat", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        const futuredate = moment(bookingDetails.date).isAfter((moment().subtract(1, 'days')).format('YYYY-MM-DD'));
        if (!futuredate) {
            return toast.error("Please select today's or future date", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        else {
            let bookedShowsFromStorage = localStorage.getItem("bookedShows");
            let alreadyBookedShows = bookedShowsFromStorage ? JSON.parse(bookedShowsFromStorage) : [];
            alreadyBookedShows.push({ ...bookingDetails, id: selectedMovie?.id, name: selectedMovie?.name });
            localStorage.setItem("bookedShows", JSON.stringify(alreadyBookedShows));
            handleModalClose();
            return toast.success("Congratulations!, Show Booked", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    }

    const setNoofSeats = (e: any) => {
        if (e?.target?.value) {
            const oldBookingDetails = bookingDetails;
            setBookingDetails({
                noOfSeats: e.target.value,
                date: oldBookingDetails.date
            });
        }
    }

    const setBookingDate = (e: any) => {
        if (e?.target?.value) {
            const oldBookingDetails = bookingDetails;
            setBookingDetails({
                noOfSeats: oldBookingDetails.noOfSeats,
                date: e.target.value
            });
        }
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
                                {selectedMovie?.show?.summary && Parser(selectedMovie.show.summary)}
                            </div>
                            <div className="movie-actions d-flex justify-content-end w-100">
                                <button className="btn btn-primary" onClick={() => { handleModalShow() }}>Book the Show</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <form>

                    <Modal.Header closeButton>
                        <Modal.Title>Book the show</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                            <div className="row movie-booking-details">
                                <div className="label col-6">Movie Name :</div>
                                <div className="value col-6">{selectedMovie?.show?.name}</div>
                            </div>

                            <div className="row movie-booking-details">
                                <div className="label col-6">Premiered :</div>
                                <div className="value col-6">{selectedMovie?.show?.premiered}</div>
                            </div>

                            <div className="row movie-booking-details">
                                <div className="label col-6">Status :</div>
                                <div className="value col-6">{selectedMovie?.show?.status}</div>
                            </div>

                            <div className="row movie-booking-details">
                                <div className="label col-6">Runtime :</div>
                                <div className="value col-6">{selectedMovie?.show?.runtime}</div>
                            </div>

                            <div className="row movie-booking-details">
                                <div className="label col-6">Average Runtime :</div>
                                <div className="value col-6">{selectedMovie?.show?.averageRuntime}</div>
                            </div>

                            <div className="row movie-booking-details">
                                <div className="col-12 mt-3">
                                    <Form.Group controlId="noOfSeats">
                                        <Form.Label className="mb-1 label" >No. of Seats</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Number" onChange={(e) => { setNoofSeats(e) }} />
                                    </Form.Group>
                                </div>

                                <div className="col-12 mt-3">
                                    <Form.Group controlId="noOfSeats">
                                        <Form.Label className="mb-1 label" >Date of Booking</Form.Label>
                                        <Form.Control type="date" min="2022/08/28" placeholder="DD/MM/YYYY" onChange={(e) => { setBookingDate(e) }} />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" type="button" onClick={handleModalClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="button" onClick={() => { bookShow() }}>
                            Book Show
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default MovieSummary;