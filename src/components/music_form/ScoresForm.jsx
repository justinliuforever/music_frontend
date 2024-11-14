import PropTypes from 'prop-types';
import React from 'react';

export default function ScoresForm({ files, handleFileChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Scores</h3>
      
      {/* Full Score */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Full Score</h4>
        
        {/* Base XML File */}
        <div className="mb-4">
          <label 
            htmlFor="fullScore.baseXML" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Base XML File
          </label>
          <input
            type="file"
            name="fullScore.baseXML"
            id="fullScore.baseXML"
            onChange={(e) => handleFileChange(e, 'fullScore', 'baseXML')}
            accept=".xml,.musicxml"
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.fullScore?.baseXML && (
            <div className="mt-2 text-sm text-gray-500">
              Current file: {files.fullScore.baseXML.name}
            </div>
          )}
        </div>

        {/* Edited XMLs */}
        <div className="mb-4">
          <label 
            htmlFor="fullScore.editedXMLs" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Edited XML Files
          </label>
          <input
            type="file"
            name="fullScore.editedXMLs"
            id="fullScore.editedXMLs"
            onChange={(e) => handleFileChange(e, 'fullScore', 'editedXMLs')}
            accept=".xml,.musicxml"
            multiple
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.fullScore?.editedXMLs && files.fullScore.editedXMLs.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Current files: {files.fullScore.editedXMLs.map(file => file.name).join(', ')}
            </div>
          )}
        </div>

        {/* PDF File */}
        <div className="mb-4">
          <label 
            htmlFor="fullScore.pdf" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            PDF File
          </label>
          <input
            type="file"
            name="fullScore.pdf"
            id="fullScore.pdf"
            onChange={(e) => handleFileChange(e, 'fullScore', 'pdf')}
            accept=".pdf"
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.fullScore?.pdf && (
            <div className="mt-2 text-sm text-gray-500">
              Current file: {files.fullScore.pdf.name}
            </div>
          )}
        </div>
      </div>

      {/* Part Score */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Part Score</h4>
        
        {/* XML Solo Parts */}
        <div className="mb-4">
          <label 
            htmlFor="partScore.xmlSoloParts" 
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            XML Solo Part Files
          </label>
          <input
            type="file"
            name="partScore.xmlSoloParts"
            id="partScore.xmlSoloParts"
            onChange={(e) => handleFileChange(e, 'partScore', 'xmlSoloParts')}
            accept=".xml,.musicxml"
            multiple
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {files.partScore?.xmlSoloParts && files.partScore.xmlSoloParts.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Current files: {files.partScore.xmlSoloParts.map(file => file.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ScoresForm.propTypes = {
  files: PropTypes.shape({
    fullScore: PropTypes.shape({
      baseXML: PropTypes.object,
      editedXMLs: PropTypes.arrayOf(PropTypes.object),
      pdf: PropTypes.object,
    }),
    partScore: PropTypes.shape({
      xmlSoloParts: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
};
