import React, { useEffect, useState } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; // Adjust the import path
import { useNavigate } from 'react-router-dom';
import './AboutMediserv.css';
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import { FaHome ,FaArrowLeft } from 'react-icons/fa'; // Importing Home Icon from react-icons

const AboutMediserv = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowRef = useSelector(selectWindowRef); // Get the stored window reference from Redux

    // State to track the active button
    const [activeButton, setActiveButton] = useState(null);

    // Video URLs (relative to the public folder)
    const videos = {
        company: '/videos/Company.mp4', // Path to Vision video
        location: '/videos/Location.mp4', // Path to Flower video
    };

    const openVideoWindow = (videoType) => {
        const videoSrc = videos[videoType]; // Get the video source based on the button clicked

        if (!windowRef || windowRef.closed) {
            // If there's no window reference or it's closed, open a new window
            const newWindow = window.open('', '_blank', 'width=1176,height=840'); // Set window size to 1176x840
            dispatch(openWindow(newWindow)); // Dispatch action to store window reference

            newWindow.document.write(`
                <html>
                    <head><title>MediServ</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
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
                    <head><title>MediServ</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width:100%; height:100%;"></video>
                    </body>
                </html>
            `);
            windowRef.document.close();
        }
    };

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

    // Function to navigate to the home page
    const goHome = () => {
        navigate('/'); // Adjust the route to match your home page's path
    };

    // Function to navigate to the history page
    const openHistory = () => {
        navigate('/HistoryPage'); // Adjust the route to match your history page's path
    };

    // Function to handle button click
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Set the active button
    };

    return (
        <div>
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{ width: "200px", height: "200px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{ width: "300px", height: "300px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{ width: "300px", height: "300px" }} />
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{ width: "200px", height: "200px" }} />

            <div className="container-new">
                <img src={Logo} className="logo-new" />
                <h1 className="main-text-new">About Mediserv</h1>

                <div className="button-group-new1">
                    {/* Button to open Vision video */}
                    <button
                        className={`button-green-new ${activeButton === 'company' ? 'active' : ''}`} // Apply active class if clicked
                        onClick={() => {
                            openVideoWindow('company');
                            handleButtonClick('company'); // Set active button
                        }}
                    >
                        Company
                    </button>
                    {/* Button to open History page */}
                    <button
                        className={`button-green-new ${activeButton === 'history' ? 'active' : ''}`} // Apply active class if clicked
                        onClick={() => {
                            openHistory();
                            handleButtonClick('history'); // Set active button
                        }}
                    >
                        History
                    </button>

                    {/* Button to open Flower video */}
                    <button
                        className={`button-green-new ${activeButton === 'location' ? 'active' : ''}`} // Apply active class if clicked
                        onClick={() => {
                            openVideoWindow('location');
                            handleButtonClick('location'); // Set active button
                        }}
                    >
                        Location
                    </button>
                </div>

                <div style={{ height: "120px" }}></div>
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
        </div>
    );
};

export default AboutMediserv;
