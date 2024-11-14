import PropTypes from 'prop-types';
import React from 'react';

export default function UserInputsForm({ files, handleFileChange, addFilesArrayItem, removeFilesArrayItem }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">User Inputs</h3>
      
      {files.userInputs.map((input, index) => (
        <div key={index} className="mt-6 p-4 border rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">User Input {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeFilesArrayItem('userInputs', null, index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove User Input
            </button>
          </div>

          {/* Raw Recording */}
          <div className="mb-4">
            <label 
              htmlFor={`userInputs.${index}.rawRecording`} 
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Raw Recording
            </label>
            <input
              type="file"
              name={`userInputs.${index}.rawRecording`}
              id={`userInputs.${index}.rawRecording`}
              onChange={(e) => handleFileChange(e, 'userInputs', 'rawRecording', index)}
              accept="audio/*"
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {input.rawRecording && (
              <div className="mt-2 text-sm text-gray-500">
                Current file: {input.rawRecording.name}
              </div>
            )}
          </div>

          {/* Reverb Added */}
          <div className="mb-4">
            <label 
              htmlFor={`userInputs.${index}.reverbAdded`} 
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Reverb Added Recording
            </label>
            <input
              type="file"
              name={`userInputs.${index}.reverbAdded`}
              id={`userInputs.${index}.reverbAdded`}
              onChange={(e) => handleFileChange(e, 'userInputs', 'reverbAdded', index)}
              accept="audio/*"
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {input.reverbAdded && (
              <div className="mt-2 text-sm text-gray-500">
                Current file: {input.reverbAdded.name}
              </div>
            )}
          </div>

          {/* Noise Cancelled */}
          <div className="mb-4">
            <label 
              htmlFor={`userInputs.${index}.noiseCancelled`} 
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Noise Cancelled Recording
            </label>
            <input
              type="file"
              name={`userInputs.${index}.noiseCancelled`}
              id={`userInputs.${index}.noiseCancelled`}
              onChange={(e) => handleFileChange(e, 'userInputs', 'noiseCancelled', index)}
              accept="audio/*"
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {input.noiseCancelled && (
              <div className="mt-2 text-sm text-gray-500">
                Current file: {input.noiseCancelled.name}
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          addFilesArrayItem('userInputs', null, {
            rawRecording: null,
            reverbAdded: null,
            noiseCancelled: null
          })
        }
        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 
          rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-indigo-500"
      >
        Add User Input
      </button>
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
