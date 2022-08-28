import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MovieList from "./movie-list/movie-list";
import MovieSummary from "./movie-summary/movie-summary";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to='/movieList' />} />
          <Route path="/movieList" element={<MovieList />} />
          <Route path="/movieSummary" element={<MovieSummary />} />
        </Routes>
      </main >
      <ToastContainer />
    </Router >
  );
}

export default App;
