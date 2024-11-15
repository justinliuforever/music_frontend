import PropTypes from 'prop-types';
import React from 'react';

export default function AdditionalFilesForm({ files, handleFileChange }) {
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
      <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Additional Files</h3>
          <p className="mt-1 text-sm text-gray-500">Upload additional recordings and pitch match files.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Recording Outputs Pre-Adjusted */}
        <div>
          <label 
            htmlFor="recordingOutputsPreAdjusted" 
            className={labelClassName}
          >
            Recording Outputs Pre-Adjusted Files
            <span className="text-gray-500 text-xs ml-2">(Optional)</span>
          </label>
          <input
            type="file"
            name="recordingOutputsPreAdjusted"
            id="recordingOutputsPreAdjusted"
            multiple
            onChange={(e) => handleFileChange(e, 'recordingOutputsPreAdjusted')}
            accept="audio/*"
            className={fileInputClassName}
          />
          {files.recordingOutputsPreAdjusted?.length > 0 && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Selected: {files.recordingOutputsPreAdjusted.map(file => file.name).join(', ')}</span>
            </div>
          )}
        </div>

        {/* Pitch Match Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Pitch Match Files</h4>
          
          {/* User Input */}
          <div className="mb-6">
            <label 
              htmlFor="pitchMatch.userInput" 
              className={labelClassName}
            >
              User Input File
              <span className="text-gray-500 text-xs ml-2">(Optional)</span>
            </label>
            <input
              type="file"
              name="pitchMatch.userInput"
              id="pitchMatch.userInput"
              onChange={(e) => handleFileChange(e, 'pitchMatch', 'userInput')}
              accept="audio/*"
              className={fileInputClassName}
            />
            {files.pitchMatch?.userInput && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{files.pitchMatch.userInput.name}</span>
              </div>
            )}
          </div>

          {/* Original Track */}
          <div>
            <label 
              htmlFor="pitchMatch.originalTrack" 
              className={labelClassName}
            >
              Original Track File
              <span className="text-gray-500 text-xs ml-2">(Optional)</span>
            </label>
            <input
              type="file"
              name="pitchMatch.originalTrack"
              id="pitchMatch.originalTrack"
              onChange={(e) => handleFileChange(e, 'pitchMatch', 'originalTrack')}
              accept="audio/*"
              className={fileInputClassName}
            />
            {files.pitchMatch?.originalTrack && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{files.pitchMatch.originalTrack.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AdditionalFilesForm.propTypes = {
  files: PropTypes.shape({
    recordingOutputsPreAdjusted: PropTypes.arrayOf(PropTypes.object),
    pitchMatch: PropTypes.shape({
      userInput: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
      originalTrack: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
    }),
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
};
