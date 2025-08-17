import React from 'react'
import '../css/HeroSection.css'; // Import CSS file for styling

import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();
    return (
        <div className='hero-section text-light text-center p-5 rounded'>
            <div className="hero-content">
                <h1 className='display-4'>Welcome to Our Book Store</h1>
                <p className='lead'>Discover your next great read, your one stop shop for all genres and titles.</p>
                <button 
                    className='btn btn-primary' 
                    onClick={() => navigate('/search')}>
                        Search Books
                </button>
            </div>
        </div>
    )
}

export default HeroSection
