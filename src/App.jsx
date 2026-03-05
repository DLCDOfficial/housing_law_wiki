import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import HousingLaw from './components/HousingLaw';
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <nav>
        <calcite-chip value={`Go Home`} icon="home" scale="s">
          <Link to="/">Home</Link>
        </calcite-chip>
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
