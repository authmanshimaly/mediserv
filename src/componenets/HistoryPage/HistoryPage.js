import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Adjust the import path
import './HistoryPage.css'; 
import Logo from '../../images/Logo.png';
import LineImage from '../../images/lineimage.png';

const HistoryPage = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux
    const dispatch = useDispatch();

    const openVideoWindow = (index) => {
        const videoSrc = getVideoForIndex(index); // Get the video source based on the button clicked

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            dispatch(openWindow(newWindow)); // Dispatch action to store window reference

            newWindow.document.write(`
                <html>
                    <head><title>Video Display</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width:100%; height:100%;"></video>
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
                        <video src="${videoSrc}" autoplay muted playsinline style="width:100%; height:100%;"></video>
                    </body>
                </html>
            `);
            windowRef.document.close();
        }

        setCurrentVideo(videoSrc); // Set the current video for potential future use
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
                            onClick={() => openVideoWindow(index)}
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
        '1980',
        '1985',
        '1988',
        '1990',
        '2000',
        '2005',
        '2015',
        '2017',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
    ];
    return buttonTexts[index];
};

// Function to get the corresponding video source based on index
const getVideoForIndex = (index) => {
    const videoSources = [
        '/videos/1980.mp4', // Replace these paths with actual video paths
        '/videos/1985.mp4',
        '/videos/1988.mp4',
        '/videos/1990.mp4',
        '/videos/2000.mp4',
        '/videos/2005.mp4',
        '/videos/2015.mp4',
        '/videos/2017.mp4',
        '/videos/2019.mp4',
        '/videos/2020.mp4',
        '/videos/2021.mp4',
        '/videos/2022.mp4',
        '/videos/2023.mp4',
        '/videos/2024.mp4',
    ];
    return videoSources[index]; // Return the URL of the video
};

export default HistoryPage;
