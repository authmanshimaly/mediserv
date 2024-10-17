import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Adjust the import path
import './HistoryPage.css'; 
import Logo from '../../images/Logo.png';
import LineImage from '../../images/lineimage.png';

const HistoryPage = () => {
    const [currentImage, setCurrentImage] = useState('');
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();

    const openImageWindow = (index) => {
        const imageSrc = getImageForIndex(index); // Get the image source based on the button clicked

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            dispatch(openWindow(newWindow)); // Dispatch action to store window reference

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
            // Reuse the existing window
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

        setCurrentImage(imageSrc); // Set the current image for potential future use
    };

    const goBack = () => {
        console.log('Going back...');
    };

    useEffect(() => {
        return () => {
            if (windowRef && windowRef.closed) {
                dispatch(closeWindow());
            }
        };
    }, [dispatch, windowRef]);


    return (
        <div className="container">
            <img src={Logo} alt="Logo" className="logo" />
            <h1 className="history-title">History</h1>
            <button className="button-back" onClick={goBack}>
                Back
            </button>

            <div className="button-container">
                {/* 14 buttons for the history page */}
                {Array.from({ length: 14 }, (_, index) => (
                    <div className="button-wrapper" key={index}>
                        <button
                            className={`history-button ${index < 2 ? 'history-button-gray' : index < 5 ? 'history-button-red' : 'history-button-green'}`}
                            onClick={() => openImageWindow(index)}
                        >
                            {getButtonText(index)}
                        </button>
                    </div>
                ))}
            </div>

            <div className="image-container">
                <img src={LineImage} alt="Line Image" className="centered-image" />
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
        require('../../images/9.png'), // Adjust paths accordingly
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

export default HistoryPage;
