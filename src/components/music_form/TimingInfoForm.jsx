import PropTypes from 'prop-types';
import React from 'react';

export default function TimingInfoForm({ formData, handleChange, handleArrayChange, addArrayItem, removeArrayItem }) {
  const localHandleChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };

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

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Timing and Tempo Information</h3>
      </div>

      <div className="space-y-6">
        {/* Duration and Tempo Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration */}
          <div>
            <label htmlFor="duration" className={labelClassName}>
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={localHandleChange}
              className={inputClassName}
              placeholder="e.g., 3:45"
            />
          </div>

          {/* Pre-Selected Tempo */}
          <div>
            <label htmlFor="preSelectedTempo" className={labelClassName}>
              Pre-Selected Tempo
            </label>
            <input
              type="text"
              name="preSelectedTempo"
              id="preSelectedTempo"
              value={formData.preSelectedTempo}
              onChange={localHandleChange}
              className={inputClassName}
              placeholder="e.g., 120 BPM"
            />
          </div>
        </div>

        {/* Cadenza Time Frames */}
        <div>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Cadenza Time Frames
          </label>
          {formData.cadenzaTimeFrames.map((timeFrame, index) => (
            <div key={index} className="mt-2.5 space-y-2 p-4 border rounded-md">
              <div className="flex gap-4">
                {/* Beginning Time */}
                <div className="flex-1">
                  <label htmlFor={`cadenza-beginning-${index}`} className="block text-sm font-medium text-gray-700">
                    Beginning
                  </label>
                  <input
                    type="text"
                    id={`cadenza-beginning-${index}`}
                    value={timeFrame.beginning}
                    onChange={(e) => handleArrayChange(e, index, 'cadenzaTimeFrames', 'beginning')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 2:30"
                  />
                </div>
                {/* Ending Time */}
                <div className="flex-1">
                  <label htmlFor={`cadenza-ending-${index}`} className="block text-sm font-medium text-gray-700">
                    Ending
                  </label>
                  <input
                    type="text"
                    id={`cadenza-ending-${index}`}
                    value={timeFrame.ending}
                    onChange={(e) => handleArrayChange(e, index, 'cadenzaTimeFrames', 'ending')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 3:15"
                  />
                </div>
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem('cadenzaTimeFrames', index)}
                  className="mt-6 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('cadenzaTimeFrames', { beginning: '', ending: '' })}
            className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Cadenza Time Frame
          </button>
        </div>

        {/* Rehearsal Numbers */}
        <div>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Rehearsal Numbers
          </label>
          {formData.rehearsalNumbers.map((number, index) => (
            <div key={index} className="mt-2.5 flex gap-2">
              <input
                type="text"
                value={number}
                onChange={(e) => handleArrayChange(e, index, 'rehearsalNumbers')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter rehearsal number"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('rehearsalNumbers', index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('rehearsalNumbers', '')}
            className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Rehearsal Number
          </button>
        </div>

        {/* Rubato Sections */}
        <div>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Rubato Sections
          </label>
          {formData.rubatoSections.map((section, index) => (
            <div key={index} className="mt-2.5 flex gap-2">
              <input
                type="text"
                value={section}
                onChange={(e) => handleArrayChange(e, index, 'rubatoSections')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter rubato section"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('rubatoSections', index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('rubatoSections', '')}
            className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Rubato Section
          </button>
        </div>

        {/* Bar Numbers */}
        <div>
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Bar Numbers
          </label>
          {formData.barNumbers.map((number, index) => (
            <div key={index} className="mt-2.5 flex gap-2">
              <input
                type="number"
                value={number}
                onChange={(e) => handleArrayChange(e, index, 'barNumbers')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter bar number"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('barNumbers', index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('barNumbers', '')}
            className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Bar Number
          </button>
        </div>
      </div>
    </div>
  );
}

TimingInfoForm.propTypes = {
  formData: PropTypes.shape({
    duration: PropTypes.string,
    preSelectedTempo: PropTypes.string,
    cadenzaTimeFrames: PropTypes.arrayOf(
      PropTypes.shape({
        beginning: PropTypes.string,
        ending: PropTypes.string,
      })
    ),
    rehearsalNumbers: PropTypes.arrayOf(PropTypes.string),
    rubatoSections: PropTypes.arrayOf(PropTypes.string),
    barNumbers: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string // Allow empty string for initial state
    ])),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleArrayChange: PropTypes.func.isRequired,
  addArrayItem: PropTypes.func.isRequired,
  removeArrayItem: PropTypes.func.isRequired,
};
