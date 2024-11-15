import PropTypes from 'prop-types';
import React from 'react';

export default function SoundTracksForm({ files, handleFileChange, addFilesArrayItem, removeFilesArrayItem }) {
  // Common styles matching ScoresForm
  const labelClassName = `
    block text-sm font-semibold leading-6 text-gray-900
    mb-1 transition-colors duration-200
  `;

  const fileInputClassName = `
    block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-indigo-50 file:text-indigo-700
    hover:file:bg-indigo-100
    border-2 border-gray-200 rounded-lg
    focus:outline-none focus:border-indigo-500
  `;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Sound Tracks</h3>
        <button
          type="button"
          onClick={() => addFilesArrayItem('soundTracks', null, { wav: null, midi: null })}
          className="inline-flex items-center px-4 py-2 
            bg-indigo-600 hover:bg-indigo-700 
            text-white text-sm font-medium rounded-md
            transition duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Sound Track
        </button>
      </div>
      
      <div className="space-y-6">
        {files.soundTracks.map((track, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Sound Track {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeFilesArrayItem('soundTracks', null, index)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                title="Remove Sound Track"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WAV File */}
              <div>
                <label 
                  htmlFor={`soundTracks.${index}.wav`}
                  className={labelClassName}
                >
                  WAV File
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="file"
                  name={`soundTracks.${index}.wav`}
                  id={`soundTracks.${index}.wav`}
                  onChange={(e) => handleFileChange(e, 'soundTracks', 'wav', index)}
                  accept=".wav"
                  className={fileInputClassName}
                />
                {track.wav && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{track.wav.name}</span>
                  </div>
                )}
              </div>

              {/* MIDI File */}
              <div>
                <label 
                  htmlFor={`soundTracks.${index}.midi`}
                  className={labelClassName}
                >
                  MIDI File
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="file"
                  name={`soundTracks.${index}.midi`}
                  id={`soundTracks.${index}.midi`}
                  onChange={(e) => handleFileChange(e, 'soundTracks', 'midi', index)}
                  accept=".mid,.midi"
                  className={fileInputClassName}
                />
                {track.midi && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{track.midi.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {files.soundTracks.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sound tracks</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new sound track.</p>
          </div>
        )}
      </div>
    </div>
  );
}

SoundTracksForm.propTypes = {
  files: PropTypes.shape({
    soundTracks: PropTypes.arrayOf(
      PropTypes.shape({
        wav: PropTypes.object,
        midi: PropTypes.object,
      })
    ).isRequired,
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  addFilesArrayItem: PropTypes.func.isRequired,
  removeFilesArrayItem: PropTypes.func.isRequired,
};
