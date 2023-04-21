import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Okrug from './components/Okrug';
import Grad from './components/Grad';
import Opstina from './components/Opstina';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/okrug" element={<Okrug />} />
        <Route path="/grad" element={<Grad />} />
        <Route path="/opstina" element={<Opstina />} />
      </Routes>
    </Router>
  );
}

export default App;