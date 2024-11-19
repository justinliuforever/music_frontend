import PropTypes from 'prop-types';
import React from 'react';

export default function UserInputsForm({ 
  files, 
  handleFileChange, 
  addFilesArrayItem,
  removeFilesArrayItem,
  isEditing = true,
  title = "User Recordings"
}) {
  const labelClassName = "block text-sm font-semibold leading-6 text-gray-900 mb-1";

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

  const handleAddRecording = () => {
    addFilesArrayItem('userInputs', null, {
      rawRecording: null,
      reverbAdded: null,
      noiseCancelled: null
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {isEditing && (
          <button
            type="button"
            onClick={handleAddRecording}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Recording Set
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {files.userInputs.map((recording, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
            {isEditing && (
              <button
                type="button"
                onClick={() => removeFilesArrayItem('userInputs', null, index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
            
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Recording Set {index + 1}</h4>

            {/* Raw Recording */}
            <div className="mb-6">
              <label htmlFor={`userInputs.${index}.rawRecording`} className={labelClassName}>
                Raw Recording
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name={`userInputs.${index}.rawRecording`}
                  id={`userInputs.${index}.rawRecording`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'rawRecording', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
              ) : (
                renderFileLink(recording.rawRecording, 'Raw Recording')
              )}
            </div>

            {/* Reverb Added */}
            <div className="mb-6">
              <label htmlFor={`userInputs.${index}.reverbAdded`} className={labelClassName}>
                Reverb Added Recording
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name={`userInputs.${index}.reverbAdded`}
                  id={`userInputs.${index}.reverbAdded`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'reverbAdded', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
              ) : (
                renderFileLink(recording.reverbAdded, 'Reverb Added Recording')
              )}
            </div>

            {/* Noise Cancelled */}
            <div>
              <label htmlFor={`userInputs.${index}.noiseCancelled`} className={labelClassName}>
                Noise Cancelled Recording
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name={`userInputs.${index}.noiseCancelled`}
                  id={`userInputs.${index}.noiseCancelled`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'noiseCancelled', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
              ) : (
                renderFileLink(recording.noiseCancelled, 'Noise Cancelled Recording')
              )}
            </div>
          </div>
        ))}

        {files.userInputs.length === 0 && isEditing && (
          <div className="text-center py-8 text-gray-500">
            No recordings added. Click "Add Recording Set" to begin.
          </div>
        )}
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
          PropTypes.instanceOf(File),
          PropTypes.oneOf([null])
        ]),
        reverbAdded: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(File),
          PropTypes.oneOf([null])
        ]),
        noiseCancelled: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(File),
          PropTypes.oneOf([null])
        ])
      })
    ).isRequired
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  addFilesArrayItem: PropTypes.func,
  removeFilesArrayItem: PropTypes.func,
  isEditing: PropTypes.bool,
  title: PropTypes.string,
};
