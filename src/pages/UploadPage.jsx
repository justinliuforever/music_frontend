import React, { useState } from 'react';

import AdditionalFilesForm from '../components/music_form/AdditionalFilesForm';
import BasicInfoForm from '../components/music_form/BasicInfoForm';
import Header from '../components/Header';
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
    soundTracks: [{
      wav: null,
      midi: null
    }],
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
    setFormData((prevFormData) => {
      let processedValue = value;
      
      // Special handling for numbers
      if (type === 'number' && value !== '') {
        processedValue = Number(value);
      }
      
      return {
        ...prevFormData,
        [name]: processedValue
      };
    });
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
  const handleFileChange = (e, sectionName, fieldName = null, index = null) => {
    // Handle multiple files
    if (e.target.multiple) {
      const files = Array.from(e.target.files);
      setFiles(prevFiles => {
        if (sectionName === 'recordingOutputsPreAdjusted') {
          // Direct array update for recordingOutputsPreAdjusted
          return {
            ...prevFiles,
            [sectionName]: files
          };
        } else if (index !== null) {
          // For nested arrays like soundTracks and userInputs
          const updatedArray = [...prevFiles[sectionName]];
          updatedArray[index] = {
            ...updatedArray[index],
            [fieldName]: files,
          };
          return {
            ...prevFiles,
            [sectionName]: updatedArray,
          };
        } else if (fieldName === 'editedXMLs' || fieldName === 'xmlSoloParts') {
          // For arrays of files in scores
          return {
            ...prevFiles,
            [sectionName]: {
              ...prevFiles[sectionName],
              [fieldName]: files,
            },
          };
        }
        return prevFiles;
      });
    } else {
      // Handle single file
      const file = e.target.files[0];
      setFiles(prevFiles => {
        if (fieldName === null) {
          // Direct update for simple file fields
          return {
            ...prevFiles,
            [sectionName]: file
          };
        } else if (index !== null) {
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
        } else if (sectionName === 'pitchMatch') {
          // Special handling for pitchMatch
          return {
            ...prevFiles,
            [sectionName]: {
              ...prevFiles[sectionName],
              [fieldName]: file,
            },
          };
        } else {
          // For other nested objects like fullScore
          return {
            ...prevFiles,
            [sectionName]: {
              ...prevFiles[sectionName],
              [fieldName]: file,
            },
          };
        }
      });
    }
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
    console.log('Current files:', files);

    // Validation check
    if (!formData.composerLastName || !formData.composerFullName || !formData.title) {
      alert('Please fill in all required fields: Composer Last Name, Composer Full Name, and Title');
      return;
    }

    try {
      const uploadedUrls = {
        fullScore: {
          baseXML: null,
          editedXMLs: [],
          pdf: null,
        },
        partScore: {
          xmlSoloParts: [],
        },
        soundTracks: [],
        // Add userInputs array to store uploaded URLs
        userInputs: [],
        // Add additional files URLs
        recordingOutputsPreAdjusted: [],
        pitchMatch: {
          userInput: null,
          originalTrack: null,
        },
      };

      // Upload base XML if exists
      if (files.fullScore.baseXML) {
        const xmlFormData = new FormData();
        xmlFormData.append('xml', files.fullScore.baseXML);
        const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
          method: 'POST',
          body: xmlFormData,
        });
        const data = await response.json();
        if (response.ok) {
          uploadedUrls.fullScore.baseXML = data.url;
        } else {
          throw new Error('Failed to upload base XML');
        }
      }

      // Upload edited XMLs if exist
      if (files.fullScore.editedXMLs.length > 0) {
        for (const xmlFile of files.fullScore.editedXMLs) {
          const xmlFormData = new FormData();
          xmlFormData.append('xml', xmlFile);
          const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
            method: 'POST',
            body: xmlFormData,
          });
          const data = await response.json();
          if (response.ok) {
            uploadedUrls.fullScore.editedXMLs.push(data.url);
          }
        }
      }

      // Upload PDF if exists
      if (files.fullScore.pdf) {
        const pdfFormData = new FormData();
        pdfFormData.append('pdf', files.fullScore.pdf);
        const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadPDF`, {
          method: 'POST',
          body: pdfFormData,
        });
        const data = await response.json();
        if (response.ok) {
          uploadedUrls.fullScore.pdf = data.url;
        }
      }

      // Upload solo parts XMLs if exist
      if (files.partScore.xmlSoloParts.length > 0) {
        for (const xmlFile of files.partScore.xmlSoloParts) {
          const xmlFormData = new FormData();
          xmlFormData.append('xml', xmlFile);
          const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
            method: 'POST',
            body: xmlFormData,
          });
          const data = await response.json();
          if (response.ok) {
            uploadedUrls.partScore.xmlSoloParts.push(data.url);
          }
        }
      }

      // Upload soundtracks if they exist
      if (files.soundTracks.length > 0) {
        for (const track of files.soundTracks) {
          const trackUrls = {};

          // Upload WAV file if exists
          if (track.wav) {
            const wavFormData = new FormData();
            wavFormData.append('track', track.wav);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
              method: 'POST',
              body: wavFormData,
            });
            const data = await response.json();
            if (response.ok) {
              trackUrls.wav = data.url;
            }
          }

          // Upload MIDI file if exists
          if (track.midi) {
            const midiFormData = new FormData();
            midiFormData.append('track', track.midi);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
              method: 'POST',
              body: midiFormData,
            });
            const data = await response.json();
            if (response.ok) {
              trackUrls.midi = data.url;
            }
          }

          // Add track URLs to the array if either WAV or MIDI was uploaded
          if (trackUrls.wav || trackUrls.midi) {
            uploadedUrls.soundTracks.push(trackUrls);
          }
        }
      }

      // Upload user inputs if they exist
      if (files.userInputs.length > 0) {
        for (const input of files.userInputs) {
          const inputUrls = {};

          // Upload raw recording if exists
          if (input.rawRecording) {
            const recordingFormData = new FormData();
            recordingFormData.append('recording', input.rawRecording);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
              method: 'POST',
              body: recordingFormData,
            });
            const data = await response.json();
            if (response.ok) {
              inputUrls.rawRecording = data.url;
            }
          }

          // Upload reverb added recording if exists
          if (input.reverbAdded) {
            const reverbFormData = new FormData();
            reverbFormData.append('recording', input.reverbAdded);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
              method: 'POST',
              body: reverbFormData,
            });
            const data = await response.json();
            if (response.ok) {
              inputUrls.reverbAdded = data.url;
            }
          }

          // Upload noise cancelled recording if exists
          if (input.noiseCancelled) {
            const noiseFormData = new FormData();
            noiseFormData.append('recording', input.noiseCancelled);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
              method: 'POST',
              body: noiseFormData,
            });
            const data = await response.json();
            if (response.ok) {
              inputUrls.noiseCancelled = data.url;
            }
          }

          // Add input URLs to the array if any file was uploaded
          if (inputUrls.rawRecording || inputUrls.reverbAdded || inputUrls.noiseCancelled) {
            uploadedUrls.userInputs.push(inputUrls);
          }
        }
      }

      // Upload recordingOutputsPreAdjusted if they exist
      if (files.recordingOutputsPreAdjusted.length > 0) {
        for (const recording of files.recordingOutputsPreAdjusted) {
          const recordingFormData = new FormData();
          recordingFormData.append('recording', recording);
          const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
            method: 'POST',
            body: recordingFormData,
          });
          const data = await response.json();
          if (response.ok) {
            uploadedUrls.recordingOutputsPreAdjusted.push(data.url);
          }
        }
      }

      // Upload pitchMatch files if they exist
      if (files.pitchMatch.userInput) {
        const userInputFormData = new FormData();
        userInputFormData.append('recording', files.pitchMatch.userInput);
        const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
          method: 'POST',
          body: userInputFormData,
        });
        const data = await response.json();
        if (response.ok) {
          uploadedUrls.pitchMatch.userInput = data.url;
        }
      }

      if (files.pitchMatch.originalTrack) {
        const originalTrackFormData = new FormData();
        originalTrackFormData.append('recording', files.pitchMatch.originalTrack);
        const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadRecording`, {
          method: 'POST',
          body: originalTrackFormData,
        });
        const data = await response.json();
        if (response.ok) {
          uploadedUrls.pitchMatch.originalTrack = data.url;
        }
      }

      // Update the formDataObj to include userInputs
      const formDataObj = {
        // Basic Info
        composerLastName: formData.composerLastName.trim(),
        composerFullName: formData.composerFullName.trim(),
        title: formData.title.trim(),
        opusNumber: formData.opusNumber,
        key: formData.key,
        movementNumber: formData.movementNumber,
        instrumentOrVoiceType: formData.instrumentOrVoiceType,
        
        // Timing Info
        duration: formData.duration,
        preSelectedTempo: formData.preSelectedTempo,
        cadenzaTimeFrames: formData.cadenzaTimeFrames,
        rehearsalNumbers: formData.rehearsalNumbers,
        rubatoSections: formData.rubatoSections,
        barNumbers: formData.barNumbers,

        // Score URLs
        scores: {
          fullScore: uploadedUrls.fullScore,
          partScore: uploadedUrls.partScore,
        },
        // Add soundTracks and userInputs to the form data
        soundTracks: uploadedUrls.soundTracks,
        userInputs: uploadedUrls.userInputs,
        // Add additional files data
        recordingOutputsPreAdjusted: uploadedUrls.recordingOutputsPreAdjusted,
        pitchMatch: uploadedUrls.pitchMatch,
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

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Upload successful');
        alert('Upload successful!');
        
        // Reset form data
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

        // Reset files with explicit null values for all fields
        setFiles(prevFiles => ({
          fullScore: {
            baseXML: null,
            editedXMLs: [],
            pdf: null,
          },
          partScore: {
            xmlSoloParts: [],
          },
          soundTracks: [{
            wav: null,
            midi: null
          }],
          userInputs: [],
          // Explicitly reset additional files
          recordingOutputsPreAdjusted: [],
          pitchMatch: {
            userInput: null,
            originalTrack: null,
          },
        }));

        // Force a re-render of the form components
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
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
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Upload Music</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Form */}
          <BasicInfoForm 
            formData={formData} 
            handleChange={handleFormDataChange}
            title="Basic Information" 
          />

          {/* Timing Information Form */}
          <TimingInfoForm
            formData={formData}
            handleChange={handleFormDataChange}
            handleArrayChange={handleArrayChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            title="Timing Information"
          />

          {/* Score Files Form */}
          <ScoresForm 
            files={files} 
            handleFileChange={handleFileChange} 
            isEditing={true}
            title="Score Files" 
          />

          {/* Sound Track Files */}
          <SoundTracksForm
            files={files}
            handleFileChange={handleFileChange}
            addFilesArrayItem={addFilesArrayItem}
            removeFilesArrayItem={removeFilesArrayItem}
            title="Sound Track Files"
          />

          {/* Recording Files */}
          <UserInputsForm
            files={files}
            handleFileChange={handleFileChange}
            addFilesArrayItem={addFilesArrayItem}
            removeFilesArrayItem={removeFilesArrayItem}
            title="Recording Files"
          />

          {/* Additional Files */}
          <AdditionalFilesForm
            files={files}
            handleFileChange={handleFileChange}
            addFilesArrayItem={addFilesArrayItem}
            removeFilesArrayItem={removeFilesArrayItem}
            title="Additional Files"
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
    </>
  );
}
