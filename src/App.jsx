import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MusicLibraryPage from './pages/MusicLibraryPage';
import UploadPage from './pages/UploadPage';
import UploadSuccessPage from './pages/UploadSuccessPage';

//import React from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/music" element={<MainPage/>} />
        <Route path="/music/upload" element={<UploadPage/>} />
        <Route path="/music/upload/success" element={<UploadSuccessPage/>} />
        <Route path="/music/library" element={<MusicLibraryPage/>} />
        <Route path="/music/library/:id" element={<DetailPage />} /> 
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}
