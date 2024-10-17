// Services.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Services.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Import Redux actions and selector

const Services = () => {
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    // Video URLs (relative to the public folder)
    const videos = {
        Project: '/videos/Project&TurnkeySolution.mp4', // Replace with actual video paths
        HealthCare: '/videos/MediServHealthcare.mp4',
        Service: '/videos/Service.mp4',
        Logistics: '/videos/Logistics&SupplyChain.mp4',
        After: '/videos/AfterSalesServices.mp4',
    };
    const goBack = () => {
        navigate('/'); // Adjust the route to match your home page's path
    };
    const openVideoWindow = (videoKey) => {
        const videoSrc = videos[videoKey]; // Get the video source based on the button clicked

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840');
            dispatch(openWindow(newWindow)); // Dispatch action to store window reference

            newWindow.document.write(`
                <html>
                    <head><title>Video Display</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width: 1176px; height: 840px;"></video>
                    </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            // Reuse the existing window
            windowRef.document.body.innerHTML = '';
            windowRef.document.write(`
                <html>
                    <head><title>Video Display</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width: 1176px; height: 840px;"></video>
                    </body>
                </html>
            `);
            windowRef.document.close();
        }
    };

    return (
        <div className="services-container" >
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{width:"300px", height:"300px"}}/>
            
            <img src={Logo} alt="Logo" className="services-logo4" />
            <h1 className="services-main-text" >Services</h1>
            <div className="services-button-group">
                <div className="left-buttons">
                    <button className="services-button-green" onClick={() => openVideoWindow('Project')}>Project & Turnkey <br></br> Solutions</button>
                    <button className="services-button-green" onClick={() => openVideoWindow('HealthCare')}>Mediserv HealthCare <br></br> Software</button>
                </div>
                <div className="center-button">
                    <button className="services-button-green" onClick={() => openVideoWindow('Service')}>Service Contracts</button>
                </div>
                <div className="right-buttons">
                    <button className="services-button-green" onClick={() => openVideoWindow('Logistics')}>Logistics & Supply <br></br>  Chain</button>
                    <button className="services-button-green" onClick={() => openVideoWindow('After')}>After Sales <br></br> Services</button>
                </div>
            </div>
            
            {/* Back to Home Button */}
            <button className="button-back4" onClick={goBack}>
                <div className="button-text4">Home</div>
            </button> 
        </div>
    );
};

export default Services;
