import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Import the windowRef selector
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MedicalSolutions.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import { FaHome ,FaArrowLeft } from 'react-icons/fa'; // Importing Home Icon from react-icons

const MedicalSolutions = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const [clickedButtonIndex, setClickedButtonIndex] = useState(null); // Track clicked button index
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const openVideoWindow = (index) => {
        setClickedButtonIndex(index); // Set the clicked button index
        const videoSrc = getVideoForIndex(index);
        console.log('Video Source:', videoSrc);

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840');

            if (newWindow) {
                dispatch(openWindow(newWindow)); // Store the new window reference in Redux
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
                console.error("Failed to open new window. It may have been blocked by a popup blocker.");
                alert("The new window could not be opened. Please check your popup blocker settings.");
            }
        } else {
            // Reuse the existing window if it's still open
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

        setCurrentVideo(videoSrc);
    };

    // Function to navigate back to the home page
    const goBack = () => {
        navigate('/'); // Adjust the route to match your home page's path
    };

    useEffect(() => {
        return () => {
            if (windowRef && windowRef.closed) {
                dispatch(closeWindow());
            }
        };
    }, [dispatch, windowRef]);

    return (
        <div className="app-container">
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{width:"200px", height:"200px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{width:"200px", height:"200px"}}/>
            
            <div className="logo-container">
                <img src={Logo} alt="Medical Solutions Logo" />

            <h1>Medical Solutions</h1>

            <div className="container-medical">
                <div className="button-group-medical">
                    {Array.from({ length: 15 }, (_, index) => (
                        <div className="button-wrapper" key={index}>
                            <button
                                className={`button-green-medical ${clickedButtonIndex === index ? 'clicked' : ''}`}
                                onClick={() => openVideoWindow(index)}
                            >
                                <div className="button-text">{getButtonText(index)}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            </div>
                                
            <div className="button-row">
    <button className="button-back11" style={{ marginRight: '30px' }} onClick={() => navigate('/')}>
        <FaArrowLeft size={18} color="#d6d6d6" style={{ marginRight: '8px' }} /> {/* Back Icon */}
        <div className="button-text2"></div>
    </button>
    <button className="button-back11" onClick={goBack}>
        <FaHome size={24} color="#d6d6d6" /> {/* Home Icon */}
    </button>
</div>

        </div>
    );
};

// Function to get button text based on index
const getButtonText = (index) => {
    const buttonTexts = [
        'Abbott',
        'Laboratory Solutions',
        'Renal Care Solutions',
        'Robotics and Compounding Devices Solutions',
        'Imaging Solutions',
        'Critical Care Solutions',
        'Surgical Solutions',
        'Endoscopy Solutions',
        'Digital and Automation Solutions',
        'Diagnostic Solutions',
        'Simulation Solutions',
        'Cardiovascular Solutions',
        'Pharmaceutical Solutions',
        'Diabetes Solutions',
        'Genetics Solutions',
    ];
    return buttonTexts[index];
};

// Function to get the corresponding video source based on index
const getVideoForIndex = (index) => {
    const videoSources = [
        '/videos/Abbot.mp4', // Replace these paths with actual video paths
        '/videos/LaboratorySolution.mp4',
        '/videos/RenalCareSoultion.mp4',
        '/videos/Robotics&CompoundingDeviceSolution.mp4',
        '/videos/ImagingSoultions.mp4',
        '/videos/CriticalCareSolutions.mp4',
        '/videos/SurgicalSoultions.mp4',
        '/videos/EndsCopyandDiagnosticSolutions.mp4',
        '/videos/DigitalandAutomationSolution.mp4',
        '/videos/DiagnosticsSoutions.mp4',
        '/videos/SimulationSolution.mp4',
        '/videos/CardiovascularSoultion.mp4',
        '/videos/PharmacaeuticalSolution.mp4',
        '/videos/DiabetesSolutions.mp4',
        '/videos/GeneticsSolutions.mp4',
    ];
    return videoSources[index]; // Return the URL of the video
};

export default MedicalSolutions;
