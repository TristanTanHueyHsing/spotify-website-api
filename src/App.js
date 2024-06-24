import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="split left">
        <div className="content">
          <h1 className="left-title">Movie API</h1>
          <a href="#" className="button">Movie</a>
        </div>
      </div>
      <div className="split right">
        <div className="content">
          <h1 className="right-title">Spotify API</h1>
          <a href="#" className="button">Music Player</a>
        </div>
      </div>
    </div>
  );
}

export default App;
