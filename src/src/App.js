// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login';
import UserPage from './pages/userPage'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userPage" element={<UserPage />} />
          </Routes>
      </Router>
  );
};

export default App;
