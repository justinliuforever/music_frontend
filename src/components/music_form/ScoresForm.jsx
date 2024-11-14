import PropTypes from 'prop-types';
import React from 'react';

export default function ScoresForm({ files, handleFileChange }) {
  // Common input styles (matching BasicInfoForm)
  const inputClassName = `
    block w-full px-4 py-3 rounded-lg
    border-2 border-gray-200
    bg-gray-50 
    focus:bg-white
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
    transition duration-200 ease-in-out
    placeholder:text-gray-400 
    text-gray-900 text-base
    hover:border-indigo-300
  `;

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
        <h3 className="text-2xl font-bold text-gray-900">Scores</h3>
      </div>
      
      {/* Full Score Section */}
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Full Score</h4>
          
          {/* Base XML File */}
          <div className="mb-6">
            <label htmlFor="fullScore.baseXML" className={labelClassName}>
              Base XML File
            </label>
            <input
              type="file"
              name="fullScore.baseXML"
              id="fullScore.baseXML"
              onChange={(e) => handleFileChange(e, 'fullScore', 'baseXML')}
              accept=".xml,.musicxml"
              className={fileInputClassName}
            />
            {files.fullScore?.baseXML && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {files.fullScore.baseXML.name}
              </p>
            )}
          </div>

          {/* Edited XMLs */}
          <div className="mb-6">
            <label htmlFor="fullScore.editedXMLs" className={labelClassName}>
              Edited XML Files
            </label>
            <input
              type="file"
              name="fullScore.editedXMLs"
              id="fullScore.editedXMLs"
              onChange={(e) => handleFileChange(e, 'fullScore', 'editedXMLs')}
              accept=".xml,.musicxml"
              multiple
              className={fileInputClassName}
            />
            {files.fullScore?.editedXMLs?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {files.fullScore.editedXMLs.map(file => file.name).join(', ')}
              </p>
            )}
          </div>

          {/* PDF File */}
          <div>
            <label htmlFor="fullScore.pdf" className={labelClassName}>
              PDF File
            </label>
            <input
              type="file"
              name="fullScore.pdf"
              id="fullScore.pdf"
              onChange={(e) => handleFileChange(e, 'fullScore', 'pdf')}
              accept=".pdf"
              className={fileInputClassName}
            />
            {files.fullScore?.pdf && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {files.fullScore.pdf.name}
              </p>
            )}
          </div>
        </div>

        {/* Part Score Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Part Score</h4>
          
          {/* XML Solo Parts */}
          <div>
            <label htmlFor="partScore.xmlSoloParts" className={labelClassName}>
              XML Solo Part Files
            </label>
            <input
              type="file"
              name="partScore.xmlSoloParts"
              id="partScore.xmlSoloParts"
              onChange={(e) => handleFileChange(e, 'partScore', 'xmlSoloParts')}
              accept=".xml,.musicxml"
              multiple
              className={fileInputClassName}
            />
            {files.partScore?.xmlSoloParts?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {files.partScore.xmlSoloParts.map(file => file.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ScoresForm.propTypes = {
  files: PropTypes.shape({
    fullScore: PropTypes.shape({
      baseXML: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null])
      ]),
      editedXMLs: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.instanceOf(File))
      ]),
      pdf: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null])
      ]),
    }),
    partScore: PropTypes.shape({
      xmlSoloParts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.instanceOf(File))
      ]),
    }),
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
};
