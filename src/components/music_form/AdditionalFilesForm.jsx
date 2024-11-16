import PropTypes from 'prop-types';
import React from 'react';

export default function AdditionalFilesForm({ 
  files, 
  handleFileChange, 
  isEditing = true,
  title = "Additional Files" 
}) {
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
    ${!isEditing && 'hidden'}
  `;

  const renderFileLink = (url, defaultLabel) => {
    if (!url) return null;

    const getFileName = (url) => {
      try {
        const decodedUrl = decodeURIComponent(url);
        const matches = decodedUrl.match(/\/([^/?]+)\?/);
        if (matches && matches[1]) {
          return matches[1].replace(/^\d+_/, '');
        }
        return defaultLabel;
      } catch (error) {
        console.error('Error parsing file name:', error);
        return defaultLabel;
      }
    };

    return (
      <a
        key={url}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {getFileName(url)}
      </a>
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">Upload additional recordings and pitch match files.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Recording Outputs Pre-Adjusted */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label htmlFor="recordingOutputsPreAdjusted" className={labelClassName}>
            Recording Outputs Pre-Adjusted Files
          </label>
          {isEditing ? (
            <input
              type="file"
              name="recordingOutputsPreAdjusted"
              id="recordingOutputsPreAdjusted"
              multiple
              onChange={(e) => handleFileChange(e, 'recordingOutputsPreAdjusted')}
              accept="audio/*"
              className={fileInputClassName}
            />
          ) : (
            <div className="space-y-2">
              {Array.isArray(files.recordingOutputsPreAdjusted) && 
                files.recordingOutputsPreAdjusted.map((file, index) => 
                  renderFileLink(file, `Pre-Adjusted Recording ${index + 1}`)
              )}
            </div>
          )}
        </div>

        {/* Pitch Match Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Pitch Match Files</h4>
          
          {/* User Input */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <label htmlFor="pitchMatch.userInput" className={labelClassName}>
              User Input File
            </label>
            {isEditing ? (
              <input
                type="file"
                name="pitchMatch.userInput"
                id="pitchMatch.userInput"
                onChange={(e) => handleFileChange(e, 'pitchMatch', 'userInput')}
                accept="audio/*"
                className={fileInputClassName}
              />
            ) : (
              files.pitchMatch?.userInput && 
              renderFileLink(files.pitchMatch.userInput, 'User Input File')
            )}
          </div>

          {/* Original Track */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <label htmlFor="pitchMatch.originalTrack" className={labelClassName}>
              Original Track File
            </label>
            {isEditing ? (
              <input
                type="file"
                name="pitchMatch.originalTrack"
                id="pitchMatch.originalTrack"
                onChange={(e) => handleFileChange(e, 'pitchMatch', 'originalTrack')}
                accept="audio/*"
                className={fileInputClassName}
              />
            ) : (
              files.pitchMatch?.originalTrack && 
              renderFileLink(files.pitchMatch.originalTrack, 'Original Track File')
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AdditionalFilesForm.propTypes = {
  files: PropTypes.shape({
    recordingOutputsPreAdjusted: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.instanceOf(File))
    ]),
    pitchMatch: PropTypes.shape({
      userInput: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.instanceOf(File), 
        PropTypes.oneOf([null])
      ]),
      originalTrack: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.instanceOf(File), 
        PropTypes.oneOf([null])
      ]),
    }),
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  title: PropTypes.string,
};
