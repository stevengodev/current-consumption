import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SensorPage from './pages/SensorPager';
import 'bootstrap/dist/css/bootstrap.min.css';
import PanelDashboardPage from './pages/PanelDashboardPage';
import MonthlyConsumptionPage from './pages/MonthlyConsumptionPage';
import ConsumptionPercentagePage from './pages/ConsumptionPercentagePage';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consumption-history" element={ <SensorPage />} />
        <Route path="/about" element={ <AboutPage />} />
        <Route path="/realtime-consumption" element={ <PanelDashboardPage />} />
        <Route path="/home" element={ <WelcomePage />} />
        <Route path="/monthly-consumption" element={ <MonthlyConsumptionPage />} />
        <Route path="/consumption-percentaje" element={ <ConsumptionPercentagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
