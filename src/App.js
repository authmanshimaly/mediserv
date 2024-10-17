import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import logo from './logo.svg';
import './App.css';
import Home from '../src/componenets/home/Home';
import MedicalSolutions from './componenets/MedicalSolutions/MedicalSolutions';
import Services from './componenets/Services/Services';
import HistoryPage from './componenets/HistoryPage/HistoryPage';
import AboutMediserv from './componenets/AboutMediserv/AboutMediserv';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMediserv" element={<AboutMediserv />} />
          <Route path="/HistoryPage" element={<HistoryPage />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/MedicalSolutions" element={<MedicalSolutions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
