import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SystemInfo from './components/SystemInfo';
import Weather from './components/Weather';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Dashboard</h1>
          <p>React + Python Flask Example</p>
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/system">System Info</NavLink>
            <NavLink to="/weather">Weather</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/system" element={<SystemInfo />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
