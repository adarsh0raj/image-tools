// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Removebg from './removebg/Removebg';
import Home from './home/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/removebg">BG Removal Tool</Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/removebg" element={<Removebg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
