import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Adjust the import path
import { useNavigate } from 'react-router-dom';
import './AboutMediserv.css';

const AboutMediserv = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux

    // Video URLs (relative to the public folder)
    const videos = {
        vision: '/videos/video1.mp4', // Path to Vision video
        flower: '/videos/visionMission.mp4', // Path to Flower video
    };

    const openVideoWindow = (videoType) => {
        const videoSrc = videos[videoType]; // Get the video source based on the button clicked

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840'); // Set window size to 1176x840
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
    };

    useEffect(() => {
        return () => {
            if (windowRef && windowRef.closed) {
                dispatch(closeWindow());
            }
        };
    }, [dispatch, windowRef]);

    // Function to navigate to the history page
    const openHistoryPage = () => {
        navigate('/HistoryPage'); // Adjust the route to match your history page's path
    };

    return (
        <div>
            <img src="images/shape1.png" alt="Corner Shape" className="corner-image top-left" />
            <img src="images/shape2.png" alt="Corner Shape" className="corner-image top-right" />
            <img src="images/shape2.png" alt="Corner Shape" className="corner-image bottom-left" />
            <img src="images/shape1.png" alt="Corner Shape" className="corner-image bottom-right" />

            <div className="container-new">
                <img src="images/Logo.png" alt="Mediserv Logo" className="logo-new" />
                <h1 className="main-text-new">About Mediserv</h1>
                <button className="button-back" onClick={() => window.history.back()}>Back</button>

                <div className="button-group-new">
                    {/* Button to open Vision video */}
                    <button
                        className="button-green-new"
                        onClick={() => openVideoWindow('vision')}
                    >
                        Open Vision Video
                    </button>

                    {/* Button to open Flower video */}
                    <button
                        className="button-green-new"
                        onClick={() => openVideoWindow('flower')}
                    >
                        Open Flower Video
                    </button>

                    <button className="button-history-new" onClick={openHistoryPage}>
                        Open History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutMediserv;
