import PropTypes from 'prop-types';
import React from 'react';

export default function UserInputsForm({ files, handleFileChange, addFilesArrayItem, removeFilesArrayItem }) {
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
        <div>
          <h3 className="text-2xl font-bold text-gray-900">User Recordings</h3>
          <p className="mt-1 text-sm text-gray-500">Upload your performance recordings here.</p>
        </div>
        <button
          type="button"
          onClick={() => addFilesArrayItem('userInputs', null, { 
            rawRecording: null,
            reverbAdded: null,
            noiseCancelled: null
          })}
          className="inline-flex items-center px-4 py-2 
            bg-indigo-600 hover:bg-indigo-700 
            text-white text-sm font-medium rounded-md
            transition duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Recording Set
        </button>
      </div>
      
      <div className="space-y-6">
        {files.userInputs.map((input, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Recording Set {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeFilesArrayItem('userInputs', null, index)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                title="Remove Recording Set"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Raw Recording */}
              <div>
                <label 
                  htmlFor={`userInputs.${index}.rawRecording`}
                  className={labelClassName}
                >
                  Raw Recording
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="file"
                  name={`userInputs.${index}.rawRecording`}
                  id={`userInputs.${index}.rawRecording`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'rawRecording', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
                {input.rawRecording && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{input.rawRecording.name}</span>
                  </div>
                )}
              </div>

              {/* Reverb Added Recording */}
              <div>
                <label 
                  htmlFor={`userInputs.${index}.reverbAdded`}
                  className={labelClassName}
                >
                  Reverb Added Recording
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="file"
                  name={`userInputs.${index}.reverbAdded`}
                  id={`userInputs.${index}.reverbAdded`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'reverbAdded', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
                {input.reverbAdded && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{input.reverbAdded.name}</span>
                  </div>
                )}
              </div>

              {/* Noise Cancelled Recording */}
              <div>
                <label 
                  htmlFor={`userInputs.${index}.noiseCancelled`}
                  className={labelClassName}
                >
                  Noise Cancelled Recording
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  type="file"
                  name={`userInputs.${index}.noiseCancelled`}
                  id={`userInputs.${index}.noiseCancelled`}
                  onChange={(e) => handleFileChange(e, 'userInputs', 'noiseCancelled', index)}
                  accept="audio/*"
                  className={fileInputClassName}
                />
                {input.noiseCancelled && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{input.noiseCancelled.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {files.userInputs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recordings added</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new recording set.</p>
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
        rawRecording: PropTypes.object,
        reverbAdded: PropTypes.object,
        noiseCancelled: PropTypes.object,
      })
    ).isRequired,
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  addFilesArrayItem: PropTypes.func.isRequired,
  removeFilesArrayItem: PropTypes.func.isRequired,
};
