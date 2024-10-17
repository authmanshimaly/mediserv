import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Import the windowRef selector
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MedicalSolutions.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';

const MedicalSolutions = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const openVideoWindow = (index) => {
        const videoSrc = getVideoForIndex(index);
        console.log('Video Source:', videoSrc);

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840');

            if (newWindow) {
                dispatch(openWindow(newWindow)); // Store the new window reference in Redux
                newWindow.document.write(`
                    <html>
                        <head><title>Video Display</title></head>
                        <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                            <video src="${videoSrc}" autoplay muted style="width: 1176px; height: 840px;"></video>
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
                    <head><title>Video Display</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                        <video src="${videoSrc}" autoplay muted style="width: 1176px; height: 840px;"></video>
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
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left-shape" />
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right-shape" />
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left-shape" />
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right-shape" />
            
            <div className="logo-container">
                <img src={Logo} alt="Medical Solutions Logo" />
            </div>

            <h1>Medical Solutions</h1>

            {/* Button to go back to the home page */}
            <button className="button-back" onClick={goBack}>
                <div className="button-text">Back to Home</div>
            </button>

            <div className="container-medical">
                <div className="button-group-medical">
                    {Array.from({ length: 15 }, (_, index) => (
                        <div className="button-wrapper" key={index}>
                            {/* <div className="button-number">{index + 1}</div> */}
                            <button className="button-green-medical" onClick={() => openVideoWindow(index)}>
                                <div className="button-text">{getButtonText(index)}</div>
                            </button>
                        </div>
                    ))}
                </div>
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
        'Simulation',
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
        '/videos/abbott.mp4', // Replace these paths with actual video paths
        '/videos/Loboratory.mp4',
        '/videos/RenalCare.mp4',
        '/videos/RobticsandCompounding.mp4',
        '/videos/Imaging.mp4',
        '/videos/CiticalCare.mp4',
        '/videos/SurgicalSolution.mp4',
        '/videos/Endoscopy.mp4',
        '/videos/DigtialandAutomation.mp4',
        '/videos/Diagnostic.mp4',
        '/videos/SimulationSolution.mp4',
        '/videos/CardiovascularSolution.mp4',
        '/videos/PharmaceutialSoultion.mp4',
        '/videos/Diabeles.mp4',
        '/videos/GeneticsSolution.mp4',
    ];
    return videoSources[index]; // Return the URL of the video
};

export default MedicalSolutions;
