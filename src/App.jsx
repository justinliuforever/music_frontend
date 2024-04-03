import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

//import React from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/music" element={<MainPage/>} />
        <Route path="/music/:id" element={<DetailPage />} /> 
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}
