// Services.js
import React from 'react';
import './Services.css';
import Logo from '../../images/Logo.png'
import Shape1 from '../../images/shape1.png'
import Shape2 from '../../images/shape2.png'

const Services = () => {
    return (
        <div className="services-container">
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" />
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" />
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" />
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" />
            
            <img src={Logo} alt="Logo" className="services-logo" />
            <h1 className="services-main-text">Our Services</h1>
            <div className="services-button-group">
                <div className="left-buttons">
                    <button className="services-button-green">Laboratory Solutions</button>
                    <button className="services-button-green">Renal Care Solutions</button>
                </div>
                <div className="center-button">
                    <button className="services-button-green">Critical Care Solutions</button>
                </div>
                <div className="right-buttons">
                    <button className="services-button-green">Surgical Solutions</button>
                    <button className="services-button-green">Endoscopy Solutions</button>
                </div>
            </div>
            <p className="services-sub-text">Delivering excellence in healthcare solutions.</p>
            <div className="corner-image top-left-shape">
                <img src="path/to/top-left-image.png" alt="Top Left" />
            </div>
            <div className="corner-image top-right-shape">
                <img src="path/to/top-right-image.png" alt="Top Right" />
            </div>
            <div className="corner-image bottom-left-shape">
                <img src="path/to/bottom-left-image.png" alt="Bottom Left" />
            </div>
            <div className="corner-image bottom-right-shape">
                <img src="path/to/bottom-right-image.png" alt="Bottom Right" />
            </div>
        </div>
    );
};

export default Services;
