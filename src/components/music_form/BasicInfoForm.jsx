import PropTypes from 'prop-types';
import React from 'react';

export default function BasicInfoForm({ formData, handleChange }) {
  // Add debug log for initial props
  console.log('BasicInfoForm rendered with formData:', formData);

  // Local handleChange with debug logs
  const localHandleChange = (e) => {
    const { name, value, type } = e.target;
    console.log('localHandleChange called with:', {
      name,
      value,
      type,
      'current formData': formData
    });
    handleChange(name, value, type);
  };

  // Add debug log before render
  console.log('BasicInfoForm about to render with values:', {
    composerLastName: formData.composerLastName,
    composerFullName: formData.composerFullName,
    title: formData.title
  });

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Information</h3>
      {/* Composer Last Name */}
      <div>
        <label htmlFor="composerLastName" className="block text-sm font-semibold leading-6 text-gray-900">
          Composer Last Name *
        </label>
        <input
          type="text"
          name="composerLastName"
          id="composerLastName"
          required
          value={formData.composerLastName}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Composer Full Name */}
      <div>
        <label htmlFor="composerFullName" className="block text-sm font-semibold leading-6 text-gray-900">
          Composer Full Name *
        </label>
        <input
          type="text"
          name="composerFullName"
          id="composerFullName"
          required
          value={formData.composerFullName}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
          Title *
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Opus Number */}
      <div>
        <label htmlFor="opusNumber" className="block text-sm font-semibold leading-6 text-gray-900">
          Opus Number
        </label>
        <input
          type="text"
          name="opusNumber"
          id="opusNumber"
          value={formData.opusNumber}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Key */}
      <div>
        <label htmlFor="key" className="block text-sm font-semibold leading-6 text-gray-900">
          Key
        </label>
        <input
          type="text"
          name="key"
          id="key"
          value={formData.key}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Movement Number */}
      <div>
        <label htmlFor="movementNumber" className="block text-sm font-semibold leading-6 text-gray-900">
          Movement Number
        </label>
        <input
          type="number"
          name="movementNumber"
          id="movementNumber"
          value={formData.movementNumber || ''}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Instrument or Voice Type */}
      <div>
        <label htmlFor="instrumentOrVoiceType" className="block text-sm font-semibold leading-6 text-gray-900">
          Instrument/Voice Type
        </label>
        <input
          type="text"
          name="instrumentOrVoiceType"
          id="instrumentOrVoiceType"
          value={formData.instrumentOrVoiceType}
          onChange={localHandleChange}
          className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 sm:text-sm"
        />
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
