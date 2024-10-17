import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Import the windowRef selector
import './MedicalSolutions.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';

const MedicalSolutions = () => {
    const [currentImage, setCurrentImage] = useState('');
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();

    const openImageWindow = (index) => {
        const imageSrc = getImageForIndex(index);
        console.log('Image Source:', imageSrc);

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=800,height=600');

            if (newWindow) {
                dispatch(openWindow(newWindow)); // Store the new window reference in Redux
                newWindow.document.write(`
                    <html>
                        <head><title>Image Display</title></head>
                        <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                            <img src="${imageSrc}" alt="Image" style="max-width: 100%; max-height: 100%;"/>
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
                    <head><title>Image Display</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                        <img src="${imageSrc}" alt="Image" style="max-width: 100%; max-height: 100%;"/>
                    </body>
                </html>
            `);
            windowRef.document.close();
        }

        setCurrentImage(imageSrc);
    };

    const goBack = () => {
        console.log('Go back');
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

            <button className="button-back" onClick={goBack}>
                <div className="button-text">Back</div>
            </button>

            <div className="container-medical">
                <div className="button-group-medical">
                    {Array.from({ length: 14 }, (_, index) => (
                        <div className="button-wrapper" key={index}>
                            <div className="button-number">{index + 1}</div>
                            <button className="button-green-medical" onClick={() => openImageWindow(index)}>
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
        'Critical Care Solutions',
        'Surgical Solutions',
        'Endoscopy Solutions',
        'Diagnostic Solutions',
        'Simulation',
        'Cardiovascular Solutions',
        'Digital and Automation Solutions',
        'Pharmaceutical Solutions',
        'Genetics Solutions',
        'Diabetes Solutions',
    ];
    return buttonTexts[index];
};

// Function to get the corresponding image source based on index
const getImageForIndex = (index) => {
    const imageSources = [
        require('../../images/9.png'), // Replace with actual image paths
        require('../../images/10.png'),
        require('../../images/11.png'),
        require('../../images/12.png'),
        require('../../images/13.png'),
        require('../../images/14.png'),
        require('../../images/15.png'),
        require('../../images/16.png'),
        require('../../images/17.png'),
        require('../../images/18.png'),
        require('../../images/19.png'),
        require('../../images/20.png'),
        require('../../images/21.png'),
        require('../../images/22.png'),
    ];
    return imageSources[index]; // Return the URL of the image
};

export default MedicalSolutions;
