import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import HousingLaw from './components/HousingLaw';
import './App.css';

// Disclaimer - this is temporary text until we get more info from HAPO
const Disclaimer = () => {
  const [isOpen, setisOpen] = useState(true);
  return (
    <calcite-dialog modal open={isOpen} heading="HAPO Housing Law Library" id="app-disclaimer">
      Disclaimer text goes here...
      <calcite-button id="close-button" slot="footer-end" onClick={() => {setisOpen(false)}}>Close</calcite-button>
    </calcite-dialog>
  )
}

const App = () => {
  return (
    <HashRouter>
      <Disclaimer />
      <nav>
        <calcite-chip value={`Go Home`} icon="home" scale="s">
          <Link to="/">Home</Link>
        </calcite-chip>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laws" element={<Navigate to="/" replace />}/>
        <Route path="/laws/:law" element={<HousingLaw />} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </HashRouter>
  )
};

export default App;
