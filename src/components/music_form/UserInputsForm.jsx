import PropTypes from 'prop-types';
import React from 'react';

export default function UserInputsForm({ 
  files, 
  handleFileChange, 
  isEditing = true,
  title = "User Recordings"
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
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-6">
        {/* Raw Recordings */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label htmlFor="userInputs.rawRecording" className={labelClassName}>
            Raw Recordings
          </label>
          {isEditing ? (
            <input
              type="file"
              name="userInputs.rawRecording"
              id="userInputs.rawRecording"
              onChange={(e) => handleFileChange(e, 'userInputs', 'rawRecording')}
              accept="audio/*"
              multiple
              className={fileInputClassName}
              disabled={!isEditing}
            />
          ) : (
            <div className="space-y-2">
              {files.userInputs?.map((input, index) => 
                input.rawRecording && renderFileLink(input.rawRecording, `Raw Recording ${index + 1}`)
              )}
            </div>
          )}
        </div>

        {/* Reverb Added Recordings */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label htmlFor="userInputs.reverbAdded" className={labelClassName}>
            Reverb Added Recordings
          </label>
          {isEditing ? (
            <input
              type="file"
              name="userInputs.reverbAdded"
              id="userInputs.reverbAdded"
              onChange={(e) => handleFileChange(e, 'userInputs', 'reverbAdded')}
              accept="audio/*"
              multiple
              className={fileInputClassName}
              disabled={!isEditing}
            />
          ) : (
            <div className="space-y-2">
              {files.userInputs?.map((input, index) => 
                input.reverbAdded && renderFileLink(input.reverbAdded, `Reverb Added ${index + 1}`)
              )}
            </div>
          )}
        </div>

        {/* Noise Cancelled Recordings */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label htmlFor="userInputs.noiseCancelled" className={labelClassName}>
            Noise Cancelled Recordings
          </label>
          {isEditing ? (
            <input
              type="file"
              name="userInputs.noiseCancelled"
              id="userInputs.noiseCancelled"
              onChange={(e) => handleFileChange(e, 'userInputs', 'noiseCancelled')}
              accept="audio/*"
              multiple
              className={fileInputClassName}
              disabled={!isEditing}
            />
          ) : (
            <div className="space-y-2">
              {files.userInputs?.map((input, index) => 
                input.noiseCancelled && renderFileLink(input.noiseCancelled, `Noise Cancelled ${index + 1}`)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

UserInputsForm.propTypes = {
  files: PropTypes.shape({
    userInputs: PropTypes.arrayOf(
      PropTypes.shape({
        rawRecording: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(File)
        ]),
        reverbAdded: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(File)
        ]),
        noiseCancelled: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(File)
        ])
      })
    )
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  title: PropTypes.string,
};
