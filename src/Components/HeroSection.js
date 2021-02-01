import React from 'react';
import '../App.css';
import './HeroSection.css';
import SignInBox from './SignInBox';


// type rfce with es7 extension and js file setup is acquired
// <video src="/videos/video-1.mp4" autoPlay loop muted />
function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/Forest.mp4" autoPlay loop muted />
            <div className= "hero-content">
                <h1 className="hero-header"> Picture Perfect </h1>
                <SignInBox></SignInBox>
            </div>
        </div>
    )
}

export default HeroSection
