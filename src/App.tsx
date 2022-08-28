import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MovieList from "./movie-list/movie-list";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to='/movieList' />} />
          <Route path="/movieList" element={<MovieList />} />
        </Routes>
      </main >
    </Router >
  );
}

export default App;
