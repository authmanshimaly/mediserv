import { Route, Routes, useLocation } from 'react-router-dom'; // Import necessary components
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Home from '../src/componenets/home/Home';
import MedicalSolutions from './componenets/MedicalSolutions/MedicalSolutions';
import Services from './componenets/Services/Services';
import HistoryPage from './componenets/HistoryPage/HistoryPage';
import AboutMediserv from './componenets/AboutMediserv/AboutMediserv';
import '../src/transitions.css'; // Create a CSS file for transitions

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page"
        timeout={500}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMediserv" element={<AboutMediserv />} />
          <Route path="/HistoryPage" element={<HistoryPage />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/MedicalSolutions" element={<MedicalSolutions />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <div className="App">
      <AnimatedRoutes />
    </div>
  );
}

export default App;
