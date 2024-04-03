import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

//import React from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/mainpage" element={<MainPage/>} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}
