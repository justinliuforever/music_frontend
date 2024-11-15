import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import { REACT_APP_API_URL } from '../../config.js';

function DetailPage() {
  const { id } = useParams();
  const [musicDetail, setMusicDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/music/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setMusicDetail(data);
        setEditedData(data);
      })
      .catch(error => console.error('Error fetching music detail:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : Number(value)) : value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/music/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      const updatedData = await response.json();
      setMusicDetail(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating:', error);
      alert('Failed to update the information');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this music piece?')) {
      fetch(`${REACT_APP_API_URL}/music/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) throw new Error('Error deleting the music track');
        navigate('/music/library');
      })
      .catch(error => console.error('Error deleting music track:', error));
    }
  };

  if (!musicDetail) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const inputClassName = `
    block w-full px-3 py-2 rounded-md
    border border-gray-300
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    transition duration-150 ease-in-out
    disabled:bg-gray-100 disabled:text-gray-500
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Header Section */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{musicDetail.title}</h3>
                <p className="mt-1 text-sm text-gray-500">By {musicDetail.composerFullName}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/music/library')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedData(musicDetail);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Composer Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h5 className="text-md font-semibold text-gray-700 mb-4">Composer Details</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Composer Last Name</label>
                      <input
                        type="text"
                        name="composerLastName"
                        value={editedData.composerLastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Composer Full Name</label>
                      <input
                        type="text"
                        name="composerFullName"
                        value={editedData.composerFullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Composition Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h5 className="text-md font-semibold text-gray-700 mb-4">Composition Details</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editedData.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Opus Number</label>
                      <input
                        type="text"
                        name="opusNumber"
                        value={editedData.opusNumber || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h5 className="text-md font-semibold text-gray-700 mb-4">Additional Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key</label>
                  <input
                    type="text"
                    name="key"
                    value={editedData.key || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Movement Number</label>
                  <input
                    type="number"
                    name="movementNumber"
                    value={editedData.movementNumber || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Instrument/Voice Type</label>
                  <input
                    type="text"
                    name="instrumentOrVoiceType"
                    value={editedData.instrumentOrVoiceType || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timing Information */}
          {(musicDetail.preSelectedTempo || musicDetail.cadenzaTimeFrames?.length > 0 || 
            musicDetail.rehearsalNumbers?.length > 0 || musicDetail.rubatoSections?.length > 0 || 
            musicDetail.barNumbers?.length > 0) && (
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Timing Information</h4>
              <dl className="grid grid-cols-1 gap-4">
                {musicDetail.preSelectedTempo && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Pre-selected Tempo</dt>
                    <dd className="mt-1 text-sm text-gray-900">{musicDetail.preSelectedTempo}</dd>
                  </div>
                )}
                {musicDetail.cadenzaTimeFrames?.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cadenza Time Frames</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5">
                        {musicDetail.cadenzaTimeFrames.map((frame, index) => (
                          <li key={index}>
                            {frame.beginning} - {frame.ending}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {/* Add other timing information sections as needed */}
              </dl>
            </div>
          )}

          {/* Scores Section */}
          {(musicDetail.fullScore || musicDetail.partScore) && (
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Scores</h4>
              
              {/* Full Score */}
              {musicDetail.fullScore && (
                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-700 mb-2">Full Score</h5>
                  <div className="space-y-4">
                    {musicDetail.fullScore.baseXML && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Base XML:</span>
                        <a 
                          href={musicDetail.fullScore.baseXML} 
                          className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
                      </div>
                    )}
                    {/* Add other score sections */}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add sections for soundTracks, userInputs, etc. as needed */}
          
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
