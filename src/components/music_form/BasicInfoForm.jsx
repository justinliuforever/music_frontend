import PropTypes from 'prop-types';
import React from 'react';

export default function BasicInfoForm({ 
  formData, 
  handleChange, 
  isEditing = true,
  title = "Basic Information"
}) {
  const localHandleChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };

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

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {isEditing && (
          <span className="ml-3 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
            * Required fields
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Cover Image Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Cover Image</h4>
          <div>
            <label htmlFor="coverImageUrl" className={labelClassName}>
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImageUrl"
              id="coverImageUrl"
              value={formData.coverImageUrl || ''}
              onChange={localHandleChange}
              disabled={!isEditing}
              className={inputClassName}
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Main Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Composer Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Composer Details</h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="composerLastName" className={labelClassName}>
                  Composer Last Name {isEditing && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="composerLastName"
                  id="composerLastName"
                  required={isEditing}
                  value={formData.composerLastName}
                  onChange={localHandleChange}
                  disabled={!isEditing}
                  className={inputClassName}
                  placeholder="e.g., Mozart"
                />
              </div>
              <div>
                <label htmlFor="composerFullName" className={labelClassName}>
                  Composer Full Name {isEditing && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="composerFullName"
                  id="composerFullName"
                  required={isEditing}
                  value={formData.composerFullName}
                  onChange={localHandleChange}
                  disabled={!isEditing}
                  className={inputClassName}
                  placeholder="e.g., Wolfgang Amadeus Mozart"
                />
              </div>
            </div>
          </div>

          {/* Composition Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Composition Details</h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className={labelClassName}>
                  Title {isEditing && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required={isEditing}
                  value={formData.title}
                  onChange={localHandleChange}
                  disabled={!isEditing}
                  className={inputClassName}
                  placeholder="e.g., Symphony No. 40"
                />
              </div>
              <div>
                <label htmlFor="opusNumber" className={labelClassName}>
                  Opus Number
                </label>
                <input
                  type="text"
                  name="opusNumber"
                  id="opusNumber"
                  value={formData.opusNumber || ''}
                  onChange={localHandleChange}
                  disabled={!isEditing}
                  className={inputClassName}
                  placeholder="e.g., Op. 550"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="key" className={labelClassName}>Key</label>
              <input
                type="text"
                name="key"
                id="key"
                value={formData.key || ''}
                onChange={localHandleChange}
                disabled={!isEditing}
                className={inputClassName}
                placeholder="e.g., G minor"
              />
            </div>
            <div>
              <label htmlFor="movementNumber" className={labelClassName}>Movement Number</label>
              <input
                type="number"
                name="movementNumber"
                id="movementNumber"
                value={formData.movementNumber || ''}
                onChange={localHandleChange}
                disabled={!isEditing}
                className={inputClassName}
                placeholder="e.g., 1"
              />
            </div>
            <div>
              <label htmlFor="instrumentOrVoiceType" className={labelClassName}>
                Instrument/Voice Type
              </label>
              <input
                type="text"
                name="instrumentOrVoiceType"
                id="instrumentOrVoiceType"
                value={formData.instrumentOrVoiceType || ''}
                onChange={localHandleChange}
                disabled={!isEditing}
                className={inputClassName}
                placeholder="e.g., Piano"
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
    coverImageUrl: PropTypes.string,
    composerLastName: PropTypes.string.isRequired,
    composerFullName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    opusNumber: PropTypes.string,
    key: PropTypes.string,
    movementNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    instrumentOrVoiceType: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  title: PropTypes.string,
};
