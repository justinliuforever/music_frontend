import Header from "../components/Header";
// MainPage.jsx
//import React from 'react';
import TotalList from '../components/TotalList'; // Adjust the import path based on your actual project structure

function MusicLibraryPage() {
  return (
    <div>
      <Header />

      <h1 className="text-2xl font-bold text-center my-8">Music Library</h1>
      
      <div className="py-6 px-5">
        <TotalList />
      </div>
    </div>
  );
}

export default MusicLibraryPage;
