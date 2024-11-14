import PropTypes from 'prop-types';
import React from 'react';

export default function SoundTracksForm({ files, handleFileChange, addFilesArrayItem, removeFilesArrayItem }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Sound Tracks</h3>
      
      {files.soundTracks.map((track, index) => (
        <div key={index} className="mt-6 p-4 border rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">Sound Track {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeFilesArrayItem('soundTracks', null, index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove Sound Track
            </button>
          </div>

          {/* WAV File */}
          <div className="mb-4">
            <label 
              htmlFor={`soundTracks.${index}.wav`}
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              WAV File
            </label>
            <input
              type="file"
              name={`soundTracks.${index}.wav`}
              id={`soundTracks.${index}.wav`}
              onChange={(e) => handleFileChange(e, 'soundTracks', 'wav', index)}
              accept=".wav"
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {track.wav && (
              <div className="mt-2 text-sm text-gray-500">
                Current file: {track.wav.name}
              </div>
            )}
          </div>

          {/* MIDI File */}
          <div className="mb-4">
            <label 
              htmlFor={`soundTracks.${index}.midi`}
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              MIDI File
            </label>
            <input
              type="file"
              name={`soundTracks.${index}.midi`}
              id={`soundTracks.${index}.midi`}
              onChange={(e) => handleFileChange(e, 'soundTracks', 'midi', index)}
              accept=".mid,.midi"
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {track.midi && (
              <div className="mt-2 text-sm text-gray-500">
                Current file: {track.midi.name}
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addFilesArrayItem('soundTracks', null, { wav: null, midi: null })}
        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 
          rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-indigo-500"
      >
        Add Sound Track
      </button>
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
