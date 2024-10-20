import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice'; 
import { useNavigate } from 'react-router-dom'; 
import { FaHome } from 'react-icons/fa'; 
import './HistoryPage.css'; 
import Logo from '../../images/Logo.png';
import LineImage from '../../images/NewLine.PNG';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import LineImage2 from '../../images/ColoredLine.jpg'
import p1 from '../../images/p1.png'

const HistoryPage = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const [activeButton, setActiveButton] = useState(null); // Manage active button state
    const windowRef = useSelector(selectWindowRef);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openVideoWindow = (index) => {
        setActiveButton(index); // Set the clicked button as active
        const videoIndex = index >= 7 ? index - 7 + 7 : index; // Map bottom row indices correctly
        const videoSrc = getVideoForIndex(videoIndex);

        if (!windowRef || windowRef.closed) {
            const newWindow = window.open('', '_blank', 'width: 1176px; height: 840px;');
            dispatch(openWindow(newWindow));

            newWindow.document.write(`
                <html>
                    <head><title>MediServ</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width: 100vw; height: 100vh; object-fit: contain;"></video>
                    </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            windowRef.document.body.innerHTML = '';
            windowRef.document.write(`
                <html>
                    <head><title>MediServ</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                        <video src="${videoSrc}" autoplay muted playsinline style="width: 100vw; height: 100vh; object-fit: contain;"></video>
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
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{ width: "200px", height: "200px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{ width: "300px", height: "300px" }} />
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{ width: "300px", height: "300px" }} />
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{ width: "200px", height: "200px" }} />

            <div className="container">
                <img src={Logo} alt="Logo" className="logo10" />
                <h1 className="history-title">History</h1>

                {/* Render top row of buttons */}
                <div className="button-container">
                    {[
                      { text: '1980', className: 'history-button-gray move-left1980', color: 'gray', darkColor: '#D2D2D2' }, 
                        { text: '1988', className: 'history-button-gray move-left1988', color: 'gray', darkColor: '#D2D2D2' },
                        { text: '2000', className: 'history-button-red move-left2000', color: 'red', darkColor: '#CB5252' },
                        { text: '2015', className: 'history-button-red move-left2015', color: 'red', darkColor: '#CB5252' },
                        { text: '2019', className: 'history-button-red move-left2019', color: 'red', darkColor: '#CB5252' },
                        { text: '2021', className: 'history-button-green move-left2021', color: 'green', darkColor: '#69B685' },
                        { text: '2023', className: 'history-button-green move-left2023', color: 'green', darkColor: '#69B685' },
                    ].map((button, index) => (
                        <div className="button-wrapper" key={index}>
                            <button
                                className={`history-button ${button.className}`}
                                onClick={() => openVideoWindow(index)}
                                style={{
                                    backgroundColor: activeButton === index ? button.darkColor : 'white',
                                    color: activeButton === index ? 'white' : button.color,
                                }}
                            >
                                {button.text}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="image-container">
                    <img src={p1} alt="Line Image" className="centered-image" />
                </div>

                {/* Render bottom row of buttons */}
                <div className="button-container2">
                    {[
                        { className: 'empty-button' },
                        { text: '1985', className: 'history-button-gray move-left1985', color: 'gray', darkColor: '#D2D2D2' }, 
                        { text: '1990', className: 'history-button-gray move-left1990', color: 'gray', darkColor: '#D2D2D2' }, 
                        { text: '2005', className: 'history-button-red move-left2005', color: 'red', darkColor: '#CB5252' },
                        { text: '2017', className: 'history-button-red move-left2017', color: 'red', darkColor: '#CB5252' },
                        { text: '2020', className: 'history-button-green move-left2020', color: 'green', darkColor: '#69B685' },
                        { text: '2022', className: 'history-button-green move-left2022', color: 'green', darkColor: '#69B685' },
                        { text: '2024', className: 'history-button-green move-left2024', color: 'green', darkColor: '#69B685' },
                    ].map((button, index) => (
                        <div className="button-wrapper" key={index + 7}>
                            <button
                                className={`history-button ${button.className}`}
                                onClick={() => openVideoWindow(index + 7)}
                                style={{
                                    backgroundColor: activeButton === index + 7 ? button.darkColor : 'white',
                                    color: activeButton === index + 7 ? 'white' : button.color,
                                }}
                            >
                                {button.text}
                            </button>
                        </div>
                    ))}
                </div> 
            </div>
            
            <button className="button-back10"  style={{marginRight:'30px' }} onClick={()=>navigate('/AboutMediserv')}>
                <div className="button-text2">Back</div>
            </button>

            {/* Home Icon Button */}
            <button className="button-back10" onClick={goBack}>
                <FaHome size={24} color="#d6d6d6 " /> {/* Home Icon */}
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
        '/videos/1985.mp4', 
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
