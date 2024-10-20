import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Services.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Import Redux actions and selector
import { FaHome ,FaArrowLeft } from 'react-icons/fa'; // Importing Home Icon from react-icons

const Services = () => {
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const [clickedButtonIndex, setClickedButtonIndex] = useState(null); // Track clicked button index

    // Video URLs (relative to the public folder)
    const videos = {
        Project: '/videos/Project&TurnkeySoultion.mp4', // Replace with actual video paths
        HealthCare: '/videos/HealthSoftware.mp4',
        Service: '/videos/ServiceCintracts.mp4',
        Logistics: '/videos/Logistics&SupplyChaim.mp4',
        After: '/videos/AfterSalesServices.mp4',
    };

    const goBack = () => {
        navigate('/'); // Adjust the route to match your home page's path
    };

    const openVideoWindow = (videoKey, index) => {
        const videoSrc = videos[videoKey]; // Get the video source based on the button clicked

        setClickedButtonIndex(index); // Set the clicked button index

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840');
            dispatch(openWindow(newWindow)); // Dispatch action to store window reference

            newWindow.document.write(`
            <html>
                <head><title>MediServ</title></head>
                <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                    <video src="${videoSrc}" autoplay muted playsinline style="width: 150vw; height: 100vh; object-fit: contain;"></video>
                </body>
            </html>
            `);
            newWindow.document.close();
        } else {
            // Reuse the existing window
            windowRef.document.body.innerHTML = '';
            windowRef.document.write(`
            <html>
                <head><title>MediServ</title></head>
                <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                    <video src="${videoSrc}" autoplay muted playsinline style="width: 150vw; height: 100vh; object-fit: contain;"></video>
                </body>
            </html>
            `);
            windowRef.document.close();
        }
    };

    return (
        <div className="services-container">
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{width:"200px", height:"200px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{width:"200px", height:"200px"}}/>
            
            <img src={Logo} alt="Logo" className="services-logo4" />
            <h1 className="services-main-text">Services</h1>
            <div className="services-button-group">
                <div className="left-buttons">
                    <button 
                        className={`services-button-green ${clickedButtonIndex === 0 ? 'active' : ''}`} 
                        onClick={() => openVideoWindow('Project', 0)}
                    >
                        Project & Turnkey <br /> Solutions
                    </button>
                    <button 
                        className={`services-button-green ${clickedButtonIndex === 1 ? 'active' : ''}`} 
                        onClick={() => openVideoWindow('HealthCare', 1)}
                    >
                        Mediserv HealthCare <br /> Software
                    </button>
                </div>
                <div className="center-button">
                    <button 
                        className={`services-button-green ${clickedButtonIndex === 2 ? 'active' : ''}`} 
                        onClick={() => openVideoWindow('Service', 2)}
                    >
                        Service Contracts
                    </button>
                </div>
                <div className="right-buttons">
                    <button 
                        className={`services-button-green ${clickedButtonIndex === 3 ? 'active' : ''}`} 
                        onClick={() => openVideoWindow('Logistics', 3)}
                    >
                        Logistics & Supply <br /> Chain
                    </button>
                    <button 
                        className={`services-button-green ${clickedButtonIndex === 4 ? 'active' : ''}`} 
                        onClick={() => openVideoWindow('After', 4)}
                    >
                        After Sales <br /> Services
                    </button>
                </div>
            </div>
            
            
<div className="button-row14">
    <button className="button-back14" onClick={goBack}>
        <FaArrowLeft size={18} color="#d6d6d6" style={{ marginRight: '8px' }} /> {/* Back Icon */}
    </button>
    <button className="button-back14" style={{ marginLeft: '20px' }} onClick={() => navigate('/')}>
        <FaHome size={24} color="#d6d6d6" /> {/* Home Icon */}
        <div className="button-text14"></div>
    </button>
</div>

        </div>
    );
};

export default Services;
