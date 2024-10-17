import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './HistoryPage.css'; 
import Logo from '../../images/Logo.png';
import LineImage from '../../images/lineimage.png';

const HistoryPage = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const windowRef = useSelector(selectWindowRef);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation

    const openVideoWindow = (index) => {
        const videoSrc = getVideoForIndex(index);

        if (!windowRef || windowRef.closed) {
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            dispatch(openWindow(newWindow));

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

        setCurrentVideo(videoSrc);
    };

    const goBack = () => {
        navigate('/'); // Navigate back to the home page
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

            {/* Render first 7 buttons */}
            <div className="button-container">
                {Array.from({ length: 7 }, (_, index) => (
                    <div className="button-wrapper" key={index}>
                        <button
                            className={`history-button ${getButtonClass(index)}`}
                            onClick={() => openVideoWindow(index)}
                        >
                            {getButtonText(index)}
                        </button>
                    </div>
                ))}
            </div>

            {/* Image placed between buttons and back button */}
            <div className="image-container">
                <img src={LineImage} alt="Line Image" className="centered-image" />
            </div>

            {/* Render last 7 buttons */}
            <div className="button-container">
                {Array.from({ length: 7 }, (_, index) => (
                    <div className="button-wrapper" key={index + 7}>
                        <button
                            className={`history-button ${getButtonClass(index + 7)}`}
                            onClick={() => openVideoWindow(index + 7)} 
                        >
                            {getButtonText(index + 7)} 
                        </button>
                    </div>
                ))}
            </div>

            <button className="button-back" onClick={goBack}>
                Back to Home
            </button>
        </div>
    );
};

const getButtonText = (index) => {
    const buttonTexts = [
        '1980', '1985', '1988', '1990', '2000', '2005', '2015', 
        '2017', '2019', '2020', '2021', '2022', '2023', '2024',
    ];
    return buttonTexts[index];
};

const getButtonClass = (index) => {
    if (index < 2) return 'history-button-gray';
    if (index < 5) return 'history-button-red';
    return 'history-button-green';
};

const getVideoForIndex = (index) => {
    const videoSources = [
        '/videos/1980.mp4', '/videos/1985.mp4', '/videos/1988.mp4', '/videos/1990.mp4',
        '/videos/2000.mp4', '/videos/2005.mp4', '/videos/2015.mp4', '/videos/2017.mp4',
        '/videos/2019.mp4', '/videos/2020.mp4', '/videos/2021.mp4', '/videos/2022.mp4',
        '/videos/2023.mp4', '/videos/2024.mp4',
    ];
    return videoSources[index];
};

export default HistoryPage;
