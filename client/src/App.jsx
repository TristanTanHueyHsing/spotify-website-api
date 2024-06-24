// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import SavedTracks from './SavedTracks'; // Import SavedTracks component

const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={code ? <Dashboard code={code} /> : <Login />} />
                <Route path="/saved-tracks" element={<SavedTracks />} />
            </Routes>
        </Router>
    );
}

export default App;
