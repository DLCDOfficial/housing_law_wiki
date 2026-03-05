import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import HousingLaw from './components/HousingLaw';
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laws" element={<Navigate to="/" replace />}/>
        <Route path="/laws/:law" element={<HousingLaw />} />
      </Routes>
    </HashRouter>
  )
};

export default App;
