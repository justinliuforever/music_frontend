import PropTypes from 'prop-types';
import React from 'react';

export default function BasicInfoForm({ formData, handleChange }) {
  const localHandleChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };

  // Common input styles
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
        <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
        <span className="ml-3 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
          * Required fields
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Composer Information Group */}
        <div className="space-y-6 md:pr-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Composer Details</h4>
            {/* Composer Last Name */}
            <div className="mb-6">
              <label htmlFor="composerLastName" className={labelClassName}>
                Composer Last Name <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="composerLastName"
                  id="composerLastName"
                  required
                  placeholder="e.g., Mozart"
                  value={formData.composerLastName}
                  onChange={localHandleChange}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Composer Full Name */}
            <div>
              <label htmlFor="composerFullName" className={labelClassName}>
                Composer Full Name <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="composerFullName"
                  id="composerFullName"
                  required
                  placeholder="e.g., Wolfgang Amadeus Mozart"
                  value={formData.composerFullName}
                  onChange={localHandleChange}
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Composition Information Group */}
        <div className="space-y-6 md:pl-4 md:border-l border-gray-200">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Composition Details</h4>
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className={labelClassName}>
                Title <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="e.g., Symphony No. 40"
                  value={formData.title}
                  onChange={localHandleChange}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Opus Number */}
            <div>
              <label htmlFor="opusNumber" className={labelClassName}>
                Opus Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="opusNumber"
                  id="opusNumber"
                  placeholder="e.g., Op. 550"
                  value={formData.opusNumber}
                  onChange={localHandleChange}
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Group */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key */}
          <div>
            <label htmlFor="key" className={labelClassName}>
              Key
            </label>
            <div className="relative">
              <input
                type="text"
                name="key"
                id="key"
                placeholder="e.g., G minor"
                value={formData.key}
                onChange={localHandleChange}
                className={inputClassName}
              />
            </div>
          </div>

          {/* Movement Number */}
          <div>
            <label htmlFor="movementNumber" className={labelClassName}>
              Movement Number
            </label>
            <div className="relative">
              <input
                type="number"
                name="movementNumber"
                id="movementNumber"
                placeholder="e.g., 1"
                min="1"
                value={formData.movementNumber || ''}
                onChange={localHandleChange}
                className={inputClassName}
              />
            </div>
          </div>

          {/* Instrument or Voice Type */}
          <div>
            <label htmlFor="instrumentOrVoiceType" className={labelClassName}>
              Instrument/Voice Type
            </label>
            <div className="relative">
              <input
                type="text"
                name="instrumentOrVoiceType"
                id="instrumentOrVoiceType"
                placeholder="e.g., Piano"
                value={formData.instrumentOrVoiceType}
                onChange={localHandleChange}
                className={inputClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BasicInfoForm.propTypes = {
  formData: PropTypes.shape({
    composerLastName: PropTypes.string.isRequired,
    composerFullName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    opusNumber: PropTypes.string,
    key: PropTypes.string,
    movementNumber: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null])
    ]),
    instrumentOrVoiceType: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
