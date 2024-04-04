//import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation

// UploadSuccess component definition
const UploadSuccessPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Upload Successful!</h1>
        <p className="mt-2 text-lg text-gray-500">Your music has been uploaded successfully.</p>
        <Link to="/music" className="mt-6 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Go DashBoard
        </Link>
        <Link to="/music/upload" className="mt-6 ml-4 inline-block rounded bg-slate-50 px-6 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue Upload
        </Link>
      </div>
    </div>
  );
};

export default UploadSuccessPage;
