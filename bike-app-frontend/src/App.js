
import './App.css';
import MapTest from './components/testMap'
import React from 'react'
import NavBar from './components/navbar';
import Stats from './components/stats';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';


function App() {
  return (
    <div>
    <NavBar />
    <Routes>
          <Route path='/'  element={ <MapTest /> } />
          <Route path="/stats" element={ <Stats />} />        
    </Routes>
    </div>
  );
}

export default App;
