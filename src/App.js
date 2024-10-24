import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Master/Login';
import Home from './Master/Home';
import Register from './Master/Register';

const App = () => {
  const usrToken = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={usrToken ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={usrToken ? <Home /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
