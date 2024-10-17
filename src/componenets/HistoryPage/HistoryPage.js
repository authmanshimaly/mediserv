import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; 
import { useNavigate } from 'react-router-dom'; 
import './HistoryPage.css'; 
import Logo from '../../images/Logo.png';
import LineImage from '../../images/ColoredLine.jpg';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';

const HistoryPage = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const windowRef = useSelector(selectWindowRef);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openVideoWindow = (index) => {
        const videoSrc = getVideoForIndex(index);

        if (!windowRef || windowRef.closed) {
            const newWindow = window.open('', '_blank', 'width: 1176px; height: 840px;');
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
        navigate('/'); 
    };

    useEffect(() => {
        return () => {
            if (windowRef && windowRef.closed) {
                dispatch(closeWindow());
            }
        };
    }, [dispatch, windowRef]);

    return (
        <div className="services-container1">
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{ width: "300px", height: "300px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{ width: "300px", height: "300px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{ width: "300px", height: "300px" }} />
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{ width: "300px", height: "300px" }} />

            <div className="container">
                <img src={Logo} alt="Logo" className="logo" />
                <h1 className="history-title">History</h1>

                {/* Render top row of buttons */}
                <div className="button-container">
                    {[
                        { text: '1980', className: 'history-button-gray' },
                        { text: '1988', className: 'history-button-gray' },
                        { text: '2000', className: 'history-button-red' },
                        { text: '2015', className: 'history-button-red' },
                        { text: '2019', className: 'history-button-red' },
                        { text: '2021', className: 'history-button-green' },
                        { text: '2023', className: 'history-button-green' },
                    ].map((button, index) => (
                        <div className="button-wrapper" key={index}>
                            <button
                                className={`history-button ${button.className}`}
                                onClick={() => openVideoWindow(index)}
                            >
                                {button.text}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="image-container">
                    <img src={LineImage} alt="Line Image" className="centered-image" />
                </div>

                {/* Render bottom row of buttons */}
                <div className="button-container2">
                    {[
                        {  className: 'empty-button' },
                        { text: '1985', className: 'history-button-gray' },
                        { text: '1990', className: 'history-button-gray' },
                        { text: '2005', className: 'history-button-red' },
                        { text: '2017', className: 'history-button-red' },
                        { text: '2020', className: 'history-button-green' },
                        { text: '2022', className: 'history-button-green' },
                        { text: '2024', className: 'history-button-green' },
                    ].map((button, index) => (
                        <div className="button-wrapper" key={index + 7}>
                            <button
                                className={`history-button ${button.className}`}
                                onClick={() => openVideoWindow(index + 7)}
                            >
                                {button.text}
                            </button>
                        </div>
                    ))}
                </div> 
                    {/* <div style={{height:'40px'}}></div> */}
            </div>
                <button className="button-back"  style={{marginRight:'30px' }} onClick={()=>navigate('/AboutMediserv')}>
                    <div className="button-text">Back</div>
                </button>
                
                <button className="button-back" onClick={goBack}>
                    <div className="button-text">Home</div>
                </button>
        </div>
    );
};

const getVideoForIndex = (index) => {
    const videoSources = [
        '/videos/1980.mp4',
        '/videos/1988.mp4',
        '/videos/2000.mp4',
        '/videos/2015.mp4',
        '/videos/2019.mp4',
        '/videos/2021.mp4',
        '/videos/2023.mp4',
        '/videos/2023.mp4',
        '/videos/1985.mp4',  // Bottom row starts here
        '/videos/1990.mp4',
        '/videos/2005.mp4',
        '/videos/2017.mp4',
        '/videos/2020.mp4',
        '/videos/2022.mp4',
        '/videos/2024.mp4',
    ];
    return videoSources[index];
};

export default HistoryPage;
