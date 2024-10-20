import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import Welcome from '../../images/Welcome.png'
import Logo from '../../images/Logo.png';
import Shape1 from '../../images/shape1.png';
import Shape2 from '../../images/shape2.png';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow, closeWindow, selectWindowRef } from '../Redux/windowSlice';

const Home = () => {
    const navigate = useNavigate(); // Use useNavigate for navigation
    const dispatch = useDispatch();
    const windowRef = useSelector(selectWindowRef);
    const [imageOpened, setImageOpened] = useState(false);

    const openPage = (pageUrl) => {
        localStorage.setItem('lastVisitedPage', pageUrl);
        navigate(pageUrl); // Navigate to the page using React Router
    };

    const openImageWindow = () => {
        if (!windowRef || windowRef.closed) {
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            dispatch(openWindow(newWindow));

            newWindow.document.write(`
                <html>
                    <head><title>MediServ</title></head>
                <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: white;">
                        <img src="${Welcome}" alt="Welcome" style="width: 150vw; height: 100vh; object-fit: contain; />
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
                        <img src="${Welcome}" alt="Welcome" style="width: 150vw; height: 100vh; object-fit: contain;" />
                    </body>
                </html>
            `);
            windowRef.document.close();
        }

        setImageOpened(true);
    };

    React.useEffect(() => {
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
            
            <div className="container">
                <img src={Logo} alt="Mediserv Logo" className="logo" />
                
                <p className="main-text" onClick={openImageWindow} style={{cursor: 'pointer'}}>Welcome</p> 
                <p className="sub-text" style={{fontSize:'27px'}}>Tap to explore our journey in advancing healthcare</p>

                <div className="button-group">
                    <button className="green"  onClick={() => openPage('/AboutMediserv')}>About Mediserv</button>
                    <button className="pink" onClick={() => openPage('/Services')}>Services</button>
                    <button className="green" onClick={() => openPage('/MedicalSolutions')}>Medical Solutions</button>
                </div>

                <div style={{height:'55px'}}></div>
                <p className="sub2-text">Devoted to healthcare since 1980.</p>

                <div className="footer-text">
                    <div>
                        <p>• Abha</p>
                        <p>أبــــها</p>
                    </div>
                    <div>
                        <p>• Jeddah</p>
                        <p>جـــــدة</p>
                    </div>
                    <div>
                        <p>• Khobar</p>
                        <p>الخــــبر</p>
                    </div>
                    <div>
                        <p>• Riyadh</p>
                        <p>الــريـاض</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
