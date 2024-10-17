import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import Logo from '../../images/Logo.png'
import Shape1 from '../../images/shape1.png'
import Shape2 from '../../images/shape2.png'

const Home = () => {
    const navigate = useNavigate(); // Use useNavigate for navigation

    const openPage = (pageUrl) => {
        // Save the page URL in local storage
        localStorage.setItem('lastVisitedPage', pageUrl);
        navigate(pageUrl); // Navigate to the page using React Router
    };

    // Optional: Restore the last visited page when the component mounts
    React.useEffect(() => {
        const lastVisitedPage = localStorage.getItem('lastVisitedPage');
        if (lastVisitedPage) {
            console.log(`Last visited page: ${lastVisitedPage}`); // For debugging purposes
            // Uncomment the following line to automatically redirect to the last visited page
            // navigate(lastVisitedPage); 
        }
    }, [navigate]);

    return (
        <div className="app-container">
            <img src={Shape1} alt="Corner Shape" className="corner-image top-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image top-right" style={{width:"300px", height:"300px"}}/>
            <img src={Shape2} alt="Corner Shape" className="corner-image bottom-left" style={{width:"300px", height:"300px"}}/>
            <img src={Shape1} alt="Corner Shape" className="corner-image bottom-right" style={{width:"300px", height:"300px"}}/>
            
            <div className="container">
                <img src={Logo} alt="Mediserv Logo" className="logo" />
                
                <p className="main-text">Welcome</p>
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
