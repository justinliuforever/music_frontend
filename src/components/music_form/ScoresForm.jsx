import PropTypes from 'prop-types';
import React from 'react';

export default function ScoresForm({ 
  files, 
  handleFileChange, 
  isEditing = true,
  title = "Scores"
}) {
  const inputClassName = `
    block w-full px-4 py-3 rounded-lg
    border-2 border-gray-200
    ${isEditing ? 'bg-white' : 'bg-gray-50'}
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
    transition duration-200 ease-in-out
    placeholder:text-gray-400 
    text-gray-900 text-base
    ${isEditing ? 'hover:border-indigo-300' : ''}
    disabled:bg-gray-100 disabled:text-gray-500
  `;

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

    // Extract filename from Firebase URL
    const getFileName = (url) => {
      try {
        const decodedUrl = decodeURIComponent(url);
        const matches = decodedUrl.match(/\/([^/?]+)\?/);
        if (matches && matches[1]) {
          // Remove timestamp prefix (e.g., 1731738494741_)
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
      
      <div className="space-y-8">
        {/* Full Score Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Full Score</h4>
          
          {/* Base XML File */}
          <div className="mb-6">
            <label htmlFor="fullScore.baseXML" className={labelClassName}>
              Base XML File
            </label>
            {isEditing ? (
              <input
                type="file"
                name="fullScore.baseXML"
                id="fullScore.baseXML"
                onChange={(e) => handleFileChange(e, 'fullScore', 'baseXML')}
                accept=".xml,.musicxml"
                className={fileInputClassName}
                disabled={!isEditing}
              />
            ) : (
              renderFileLink(files.fullScore?.baseXML, 'Base XML')
            )}
          </div>

          {/* Edited XMLs */}
          <div className="mb-6">
            <label htmlFor="fullScore.editedXMLs" className={labelClassName}>
              Edited XML Files
            </label>
            {isEditing ? (
              <input
                type="file"
                name="fullScore.editedXMLs"
                id="fullScore.editedXMLs"
                onChange={(e) => handleFileChange(e, 'fullScore', 'editedXMLs')}
                accept=".xml,.musicxml"
                multiple
                className={fileInputClassName}
                disabled={!isEditing}
              />
            ) : (
              <div className="space-y-2">
                {files.fullScore?.editedXMLs?.map((url, index) => (
                  <div key={url}>{renderFileLink(url, `Edited XML ${index + 1}`)}</div>
                ))}
              </div>
            )}
          </div>

          {/* PDF File */}
          <div>
            <label htmlFor="fullScore.pdf" className={labelClassName}>
              PDF File
            </label>
            {isEditing ? (
              <input
                type="file"
                name="fullScore.pdf"
                id="fullScore.pdf"
                onChange={(e) => handleFileChange(e, 'fullScore', 'pdf')}
                accept=".pdf"
                className={fileInputClassName}
                disabled={!isEditing}
              />
            ) : (
              renderFileLink(files.fullScore?.pdf, 'Download PDF')
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
            {isEditing ? (
              <input
                type="file"
                name="partScore.xmlSoloParts"
                id="partScore.xmlSoloParts"
                onChange={(e) => handleFileChange(e, 'partScore', 'xmlSoloParts')}
                accept=".xml,.musicxml"
                multiple
                className={fileInputClassName}
                disabled={!isEditing}
              />
            ) : (
              <div className="space-y-2">
                {files.partScore?.xmlSoloParts?.map((url, index) => (
                  <div key={url}>{renderFileLink(url, `Solo Part ${index + 1}`)}</div>
                ))}
              </div>
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
        PropTypes.string,
        PropTypes.instanceOf(File),
        PropTypes.oneOf([null])
      ]),
      editedXMLs: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.instanceOf(File)),
        PropTypes.oneOf([null, undefined])
      ]),
      pdf: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(File),
        PropTypes.oneOf([null])
      ]),
    }),
    partScore: PropTypes.shape({
      xmlSoloParts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.instanceOf(File)),
        PropTypes.oneOf([null, undefined]),
        PropTypes.array
      ]),
    }),
  }),
  handleFileChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  title: PropTypes.string,
};

ScoresForm.defaultProps = {
  files: {
    fullScore: {
      baseXML: null,
      editedXMLs: [],
      pdf: null
    },
    partScore: {
      xmlSoloParts: []
    }
  },
  isEditing: false,
  title: "Scores"
};
