import PropTypes from 'prop-types';
import React from 'react';

export default function AdditionalFilesForm({ files, handleFileChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Additional Files</h3>
      
      {/* Recording Outputs Pre-Adjusted */}
      <div className="mt-4">
        <label 
          htmlFor="recordingOutputsPreAdjusted" 
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Recording Outputs Pre-Adjusted Files
        </label>
        <input
          type="file"
          name="recordingOutputsPreAdjusted"
          id="recordingOutputsPreAdjusted"
          multiple
          onChange={(e) => handleFileChange(e, 'recordingOutputsPreAdjusted')}
          accept="audio/*"
          className="mt-2 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        {files.recordingOutputsPreAdjusted && files.recordingOutputsPreAdjusted.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            Current files: {files.recordingOutputsPreAdjusted.map(file => file.name).join(', ')}
          </div>
        )}
      </div>

      {/* Pitch Match */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Pitch Match</h4>
        
        {/* User Input */}
        <div className="mb-4">
          <label 
            htmlFor="pitchMatch.userInput" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            User Input File
          </label>
          <input
            type="file"
            name="pitchMatch.userInput"
            id="pitchMatch.userInput"
            onChange={(e) => handleFileChange(e, 'pitchMatch', 'userInput')}
            accept="audio/*"
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.pitchMatch?.userInput && (
            <div className="mt-2 text-sm text-gray-500">
              Current file: {files.pitchMatch.userInput.name}
            </div>
          )}
        </div>

        {/* Original Track */}
        <div className="mb-4">
          <label 
            htmlFor="pitchMatch.originalTrack" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Original Track File
          </label>
          <input
            type="file"
            name="pitchMatch.originalTrack"
            id="pitchMatch.originalTrack"
            onChange={(e) => handleFileChange(e, 'pitchMatch', 'originalTrack')}
            accept="audio/*"
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.pitchMatch?.originalTrack && (
            <div className="mt-2 text-sm text-gray-500">
              Current file: {files.pitchMatch.originalTrack.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdditionalFilesForm.propTypes = {
  files: PropTypes.shape({
    recordingOutputsPreAdjusted: PropTypes.arrayOf(PropTypes.object),
    pitchMatch: PropTypes.shape({
      userInput: PropTypes.object,
      originalTrack: PropTypes.object,
    }),
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
};
