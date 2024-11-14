import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SensorPage from './pages/SensorPager';
import 'bootstrap/dist/css/bootstrap.min.css';
import PanelDashboardPage from './pages/PanelDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <SensorPage />} />
        <Route path="/dashboard" element={ <PanelDashboardPage />} />

      </Routes>
    </Router>
  );
}

export default App;
