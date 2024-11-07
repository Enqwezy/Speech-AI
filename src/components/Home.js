// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <header className="header-section">
        <h1 className="main-title">Welcome to Speech AI Platform</h1>
        <p className="main-subtitle">Transform speech into text with AI-powered recognition technology.</p>
        <div className="button-group">
          <Link to="/record">
            <button className="primary-btn">Start Recording</button>
          </Link>
          <Link to="/record">
            <button className="secondary-btn">Upload Audio</button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
