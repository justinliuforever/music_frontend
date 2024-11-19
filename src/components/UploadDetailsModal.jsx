import React from 'react';

function UploadDetailsModal({ data, onClose }) {
  const renderFileUrl = (url) => {
    if (!url) return 'None';
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
        View File
      </a>
    );
  };

  const renderArraySection = (array, title) => {
    if (!array || array.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <ul className="list-disc pl-5">
          {array.map((item, index) => (
            <li key={index}>
              {typeof item === 'string' ? renderFileUrl(item) : 
                Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    {key}: {renderFileUrl(value)}
                  </div>
                ))
              }
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upload Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="font-medium">Composer Last Name:</span> {data.composerLastName}</p>
              <p><span className="font-medium">Composer Full Name:</span> {data.composerFullName}</p>
              <p><span className="font-medium">Title:</span> {data.title}</p>
              <p><span className="font-medium">Opus Number:</span> {data.opusNumber}</p>
              <p><span className="font-medium">Key:</span> {data.key}</p>
              <p><span className="font-medium">Movement Number:</span> {data.movementNumber}</p>
              <p><span className="font-medium">Instrument/Voice:</span> {data.instrumentOrVoiceType}</p>
              <p><span className="font-medium">Duration:</span> {data.duration}</p>
              <p><span className="font-medium">Pre-selected Tempo:</span> {data.preSelectedTempo}</p>
            </div>
          </div>

          {/* Score Files */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Score Files</h3>
            <div className="ml-4">
              <p><span className="font-medium">Base XML:</span> {renderFileUrl(data.fullScore?.baseXML)}</p>
              <div className="mb-2">
                <span className="font-medium">Edited XMLs:</span>
                {renderArraySection(data.fullScore?.editedXMLs, '')}
              </div>
              <p><span className="font-medium">PDF:</span> {renderFileUrl(data.fullScore?.pdf)}</p>
              <div className="mb-2">
                <span className="font-medium">Solo Parts:</span>
                {renderArraySection(data.partScore?.xmlSoloParts, '')}
              </div>
            </div>
          </div>

          {/* Sound Tracks */}
          {renderArraySection(data.soundTracks, 'Sound Tracks')}

          {/* User Inputs */}
          {renderArraySection(data.userInputs, 'User Inputs')}

          {/* Additional Files */}
          {renderArraySection(data.recordingOutputsPreAdjusted, 'Recording Outputs')}

          {/* Pitch Match */}
          {data.pitchMatch && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Pitch Match</h3>
              <div className="ml-4">
                <p><span className="font-medium">User Input:</span> {renderFileUrl(data.pitchMatch.userInput)}</p>
                <p><span className="font-medium">Original Track:</span> {renderFileUrl(data.pitchMatch.originalTrack)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDetailsModal;
