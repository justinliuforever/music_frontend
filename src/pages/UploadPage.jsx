import React, { useState } from 'react';

import AdditionalFilesForm from '../components/music_form/AdditionalFilesForm';
import BasicInfoForm from '../components/music_form/BasicInfoForm';
import { REACT_APP_API_URL } from '../../config';
import ScoresForm from '../components/music_form/ScoresForm';
import SoundTracksForm from '../components/music_form/SoundTracksForm';
import TimingInfoForm from '../components/music_form/TimingInfoForm';
import UserInputsForm from '../components/music_form/UserInputsForm';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    // Fields from BasicInfoForm
    composerLastName: '', 
    composerFullName: '',
    title: '',
    opusNumber: '',
    key: '',
    movementNumber: null,
    instrumentOrVoiceType: '',
    // Fields from TimingInfoForm
    duration: '',
    preSelectedTempo: '',
    cadenzaTimeFrames: [],
    rehearsalNumbers: [],
    rubatoSections: [],
    barNumbers: [],
  });

  const [files, setFiles] = useState({
    // Fields from ScoresForm
    fullScore: {
      baseXML: null,
      editedXMLs: [],
      pdf: null,
    },
    partScore: {
      xmlSoloParts: [],
    },
    // Fields from SoundTracksForm
    soundTracks: [],
    // Fields from UserInputsForm
    userInputs: [],
    // Fields from AdditionalFilesForm
    recordingOutputsPreAdjusted: [],
    pitchMatch: {
      userInput: null,
      originalTrack: null,
    },
  });

  // Modify handleChange to accept name, value, and type
  const handleFormDataChange = (name, value, type) => {
    console.log('handleFormDataChange called with', { name, value, type });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle input changes for array fields
  const handleArrayChange = (e, index, arrayName, fieldName) => {
    const { value, type } = e.target;
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[arrayName]];
      if (fieldName) {
        updatedArray[index][fieldName] = value;
      } else {
        updatedArray[index] = type === 'number' ? Number(value) : value;
      }
      return {
        ...prevFormData,
        [arrayName]: updatedArray,
      };
    });
  };

  // Add item to array fields
  const addArrayItem = (arrayName, newItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [arrayName]: [...prevFormData[arrayName], newItem],
    }));
  };

  // Remove item from array fields
  const removeArrayItem = (arrayName, index) => {
    setFormData((prevFormData) => {
      const updatedArray = prevFormData[arrayName].filter((_, i) => i !== index);
      return {
        ...prevFormData,
        [arrayName]: updatedArray,
      };
    });
  };

  // Handle file changes
  const handleFileChange = (e, sectionName, fieldName, index = null) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => {
      if (index !== null) {
        // For nested arrays like soundTracks and userInputs
        const updatedArray = [...prevFiles[sectionName]];
        updatedArray[index] = {
          ...updatedArray[index],
          [fieldName]: file,
        };
        return {
          ...prevFiles,
          [sectionName]: updatedArray,
        };
      } else {
        return {
          ...prevFiles,
          [sectionName]: {
            ...prevFiles[sectionName],
            [fieldName]: file,
          },
        };
      }
    });
  };

  // Add item to files array fields
  const addFilesArrayItem = (arrayName, fieldName, newItem) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [arrayName]: [...prevFiles[arrayName], newItem],
    }));
  };

  // Remove item from files array fields
  const removeFilesArrayItem = (arrayName, fieldName, index) => {
    setFiles((prevFiles) => {
      const updatedArray = prevFiles[arrayName].filter((_, i) => i !== index);
      return {
        ...prevFiles,
        [arrayName]: updatedArray,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Current formData:', formData);

    // Validation check
    if (!formData.composerLastName || !formData.composerFullName || !formData.title) {
      alert('Please fill in all required fields: Composer Last Name, Composer Full Name, and Title');
      return;
    }

    try {
      // Instead of using FormData, let's first try sending just the basic info as JSON
      const formDataObj = {
        composerLastName: formData.composerLastName.trim(),
        composerFullName: formData.composerFullName.trim(),
        title: formData.title.trim(),
        opusNumber: formData.opusNumber,
        key: formData.key,
        movementNumber: formData.movementNumber,
        instrumentOrVoiceType: formData.instrumentOrVoiceType,
      };

      console.log('Sending data to server:', formDataObj);

      const response = await fetch(`${REACT_APP_API_URL}/music/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formDataObj)
      });

      // Log the full response for debugging
      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Upload successful');
        alert('Upload successful!');
        setFormData({
          composerLastName: '',
          composerFullName: '',
          title: '',
          opusNumber: '',
          key: '',
          movementNumber: null,
          instrumentOrVoiceType: '',
          duration: '',
          preSelectedTempo: '',
          cadenzaTimeFrames: [],
          rehearsalNumbers: [],
          rubatoSections: [],
          barNumbers: [],
        });
        setFiles({
          fullScore: {
            baseXML: null,
            editedXMLs: [],
            pdf: null,
          },
          partScore: {
            xmlSoloParts: [],
          },
          soundTracks: [],
          userInputs: [],
          recordingOutputsPreAdjusted: [],
          pitchMatch: {
            userInput: null,
            originalTrack: null,
          },
        });
      } else {
        console.error('Upload failed:', responseData.msg);
        alert(`Upload failed: ${responseData.msg}`);
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      alert('An error occurred during upload. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Upload Music</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Form */}
        <BasicInfoForm formData={formData} handleChange={handleFormDataChange} />

        {/* Timing Information Form */}
        <TimingInfoForm
          formData={formData}
          handleChange={handleFormDataChange}
          handleArrayChange={handleArrayChange}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />

        {/* Scores Form */}
        <ScoresForm files={files} handleFileChange={handleFileChange} />

        {/* Sound Tracks Form */}
        <SoundTracksForm
          files={files}
          handleFileChange={handleFileChange}
          addFilesArrayItem={addFilesArrayItem}
          removeFilesArrayItem={removeFilesArrayItem}
        />

        {/* User Inputs Form */}
        <UserInputsForm
          files={files}
          handleFileChange={handleFileChange}
          addFilesArrayItem={addFilesArrayItem}
          removeFilesArrayItem={removeFilesArrayItem}
        />

        {/* Additional Files Form */}
        <AdditionalFilesForm
          files={files}
          handleFileChange={handleFileChange}
          addFilesArrayItem={addFilesArrayItem}
          removeFilesArrayItem={removeFilesArrayItem}
        />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
