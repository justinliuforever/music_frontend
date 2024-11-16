import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AdditionalFilesForm from '../components/music_form/AdditionalFilesForm';
import BasicInfoForm from '../components/music_form/BasicInfoForm';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import { REACT_APP_API_URL } from '../../config.js';
import ScoresForm from '../components/music_form/ScoresForm';
import SoundTracksForm from '../components/music_form/SoundTracksForm';
import TimingInfoForm from '../components/music_form/TimingInfoForm';
import UserInputsForm from '../components/music_form/UserInputsForm';

function DetailPage() {
  const { id } = useParams();
  const [musicDetail, setMusicDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/music/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        const initializedData = {
          ...data,
          fullScore: {
            baseXML: data.fullScore?.baseXML || null,
            editedXMLs: data.fullScore?.editedXMLs || [],
            pdf: data.fullScore?.pdf || null
          },
          partScore: {
            xmlSoloParts: Array.isArray(data.partScore?.xmlSoloParts) 
              ? data.partScore.xmlSoloParts 
              : []
          },
          cadenzaTimeFrames: data.cadenzaTimeFrames || [],
          rehearsalNumbers: data.rehearsalNumbers || [],
          rubatoSections: data.rubatoSections || [],
          barNumbers: data.barNumbers || [],
          userInputs: data.userInputs || [],
          recordingOutputsPreAdjusted: data.recordingOutputsPreAdjusted || [],
          pitchMatch: {
            userInput: data.pitchMatch?.userInput || null,
            originalTrack: data.pitchMatch?.originalTrack || null,
          }
        };
        setMusicDetail(initializedData);
        setEditedData(initializedData);
      })
      .catch(error => console.error('Error fetching music detail:', error));
  }, [id]);

  const handleInputChange = (name, value, type) => {
    setEditedData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : Number(value)) : value
    }));
  };

  const handleFileChange = async (e, section, field) => {
    const files = e.target.files;
    if (!files) return;

    if (section === 'recordingOutputsPreAdjusted') {
      setEditedData(prev => ({
        ...prev,
        recordingOutputsPreAdjusted: Array.from(files)
      }));
    } else if (section === 'pitchMatch') {
      setEditedData(prev => ({
        ...prev,
        pitchMatch: {
          ...prev.pitchMatch,
          [field]: files[0]
        }
      }));
    } else if (section === 'soundTracks') {
      setEditedData(prev => ({
        ...prev,
        soundTracks: Array.from(files).map(file => ({
          [field]: file
        }))
      }));
    } else if (section === 'userInputs') {
      setEditedData(prev => ({
        ...prev,
        userInputs: Array.from(files).map(file => ({
          [field]: file
        }))
      }));
    } else {
      setEditedData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: files.length === 1 ? files[0] : Array.from(files)
        }
      }));
    }
  };

  const handleSave = async () => {
    try {
      // First, keep track of files that need to be deleted
      const filesToDelete = [];
      
      // Helper function to compare old and new files
      const compareAndMarkForDeletion = (oldUrl, newFile) => {
        if (oldUrl && newFile instanceof File) {
          filesToDelete.push(oldUrl);
        }
      };

      // Check fullScore files
      if (musicDetail.fullScore && editedData.fullScore) {
        // Check baseXML
        compareAndMarkForDeletion(
          musicDetail.fullScore.baseXML,
          editedData.fullScore.baseXML
        );

        // Check PDF
        compareAndMarkForDeletion(
          musicDetail.fullScore.pdf,
          editedData.fullScore.pdf
        );

        // Check editedXMLs
        if (musicDetail.fullScore.editedXMLs && editedData.fullScore.editedXMLs) {
          musicDetail.fullScore.editedXMLs.forEach(oldUrl => {
            if (!editedData.fullScore.editedXMLs.includes(oldUrl)) {
              filesToDelete.push(oldUrl);
            }
          });
        }
      }

      // Check partScore files
      if (musicDetail.partScore?.xmlSoloParts && editedData.partScore?.xmlSoloParts) {
        const oldFiles = Array.isArray(musicDetail.partScore.xmlSoloParts) 
          ? musicDetail.partScore.xmlSoloParts 
          : [];
        const newFiles = Array.isArray(editedData.partScore.xmlSoloParts)
          ? editedData.partScore.xmlSoloParts
          : [];

        oldFiles.forEach(oldUrl => {
          if (!newFiles.includes(oldUrl)) {
            filesToDelete.push(oldUrl);
          }
        });
      }

      // Check soundTracks
      if (musicDetail.soundTracks && editedData.soundTracks) {
        musicDetail.soundTracks.forEach(oldTrack => {
          if (oldTrack.wav) {
            const newTrackWithSameWav = editedData.soundTracks.find(
              newTrack => newTrack.wav === oldTrack.wav
            );
            if (!newTrackWithSameWav) {
              filesToDelete.push(oldTrack.wav);
            }
          }
          if (oldTrack.midi) {
            const newTrackWithSameMidi = editedData.soundTracks.find(
              newTrack => newTrack.midi === oldTrack.midi
            );
            if (!newTrackWithSameMidi) {
              filesToDelete.push(oldTrack.midi);
            }
          }
        });
      }

      // Add userInputs file checking
      if (musicDetail.userInputs && editedData.userInputs) {
        musicDetail.userInputs.forEach((oldInput, index) => {
          ['rawRecording', 'reverbAdded', 'noiseCancelled'].forEach(field => {
            if (oldInput[field] && 
                (!editedData.userInputs[index] || 
                 editedData.userInputs[index][field] instanceof File ||
                 editedData.userInputs[index][field] !== oldInput[field])) {
              filesToDelete.push(oldInput[field]);
            }
          });
        });
      }

      // Upload new files and get their URLs
      const updatedFiles = { ...editedData };
      
      // Handle fullScore files
      if (updatedFiles.fullScore) {
        // Handle baseXML
        if (updatedFiles.fullScore.baseXML instanceof File) {
          const formData = new FormData();
          formData.append('xml', updatedFiles.fullScore.baseXML);
          const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          updatedFiles.fullScore.baseXML = result.url;
        }

        // Handle PDF
        if (updatedFiles.fullScore.pdf instanceof File) {
          const formData = new FormData();
          formData.append('pdf', updatedFiles.fullScore.pdf);
          const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadPDF`, {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          updatedFiles.fullScore.pdf = result.url;
        }

        // Handle editedXMLs array
        if (updatedFiles.fullScore.editedXMLs) {
          const newEditedXMLs = [];
          for (const file of updatedFiles.fullScore.editedXMLs) {
            if (file instanceof File) {
              const formData = new FormData();
              formData.append('xml', file);
              const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
                method: 'POST',
                body: formData,
              });
              const result = await response.json();
              newEditedXMLs.push(result.url);
            } else {
              newEditedXMLs.push(file); // Keep existing URLs
            }
          }
          updatedFiles.fullScore.editedXMLs = newEditedXMLs;
        }
      }

      // Handle partScore files
      if (updatedFiles.partScore?.xmlSoloParts) {
        const newSoloParts = [];
        for (const file of updatedFiles.partScore.xmlSoloParts) {
          if (file instanceof File) {
            const formData = new FormData();
            formData.append('xml', file);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadXML`, {
              method: 'POST',
              body: formData,
            });
            const result = await response.json();
            newSoloParts.push(result.url);
          } else {
            newSoloParts.push(file); // Keep existing URLs
          }
        }
        updatedFiles.partScore.xmlSoloParts = newSoloParts;
      }

      // Handle soundTracks
      if (updatedFiles.soundTracks) {
        const newSoundTracks = [];
        for (const track of updatedFiles.soundTracks) {
          const newTrack = {};
          
          if (track.wav instanceof File) {
            const formData = new FormData();
            formData.append('track', track.wav);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
              method: 'POST',
              body: formData,
            });
            const result = await response.json();
            newTrack.wav = result.url;
          } else if (track.wav) {
            newTrack.wav = track.wav;
          }

          if (track.midi instanceof File) {
            const formData = new FormData();
            formData.append('track', track.midi);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
              method: 'POST',
              body: formData,
            });
            const result = await response.json();
            newTrack.midi = result.url;
          } else if (track.midi) {
            newTrack.midi = track.midi;
          }

          if (Object.keys(newTrack).length > 0) {
            newSoundTracks.push(newTrack);
          }
        }
        updatedFiles.soundTracks = newSoundTracks;
      }

      // Add userInputs file upload handling
      if (updatedFiles.userInputs) {
        const newUserInputs = [];
        for (const input of updatedFiles.userInputs) {
          const newInput = {};
          
          for (const field of ['rawRecording', 'reverbAdded', 'noiseCancelled']) {
            if (input[field] instanceof File) {
              const formData = new FormData();
              formData.append('track', input[field]);
              const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
                method: 'POST',
                body: formData,
              });
              const result = await response.json();
              newInput[field] = result.url;
            } else if (input[field]) {
              newInput[field] = input[field];
            }
          }

          if (Object.keys(newInput).length > 0) {
            newUserInputs.push(newInput);
          }
        }
        updatedFiles.userInputs = newUserInputs;
      }

      // Inside handleSave function, add this section for handling recordingOutputsPreAdjusted files
      if (updatedFiles.recordingOutputsPreAdjusted) {
        const newRecordingOutputs = [];
        for (const file of updatedFiles.recordingOutputsPreAdjusted) {
          if (file instanceof File) {
            const formData = new FormData();
            formData.append('track', file);
            const response = await fetch(`${REACT_APP_API_URL}/firebase/uploadSoundTrack`, {
              method: 'POST',
              body: formData,
            });
            const result = await response.json();
            newRecordingOutputs.push(result.url);
          } else {
            newRecordingOutputs.push(file);
          }
        }
        updatedFiles.recordingOutputsPreAdjusted = newRecordingOutputs;
      }

      // Delete old files from Firebase
      for (const fileUrl of filesToDelete) {
        try {
          const response = await fetch(`${REACT_APP_API_URL}/firebase/deleteFile`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: fileUrl }),
          });
          
          if (!response.ok && response.status !== 404) {
            console.warn(`Warning: Failed to delete file ${fileUrl}`);
          }
        } catch (error) {
          console.warn('Warning: Error during file deletion:', error);
          // Continue with other deletions even if one fails
        }
      }

      // Update database with new data
      const response = await fetch(`${REACT_APP_API_URL}/music/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFiles),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      const updatedData = await response.json();
      setMusicDetail(updatedData);
      setEditedData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating:', error);
      alert('Failed to update the information');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this music piece?')) {
      fetch(`${REACT_APP_API_URL}/music/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) throw new Error('Error deleting the music track');
        navigate('/music/library');
      })
      .catch(error => console.error('Error deleting music track:', error));
    }
  };

  const handleArrayChange = (e, index, arrayName, subField = null) => {
    setEditedData(prev => {
      const newArray = [...prev[arrayName]];
      if (subField) {
        // For nested objects like cadenzaTimeFrames
        newArray[index] = {
          ...newArray[index],
          [subField]: e.target.value
        };
      } else {
        // For simple arrays like rehearsalNumbers
        newArray[index] = e.target.value;
      }
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  const addArrayItem = (arrayName, defaultValue) => {
    setEditedData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setEditedData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  // Add these helper functions for userInputs array handling
  const addFilesArrayItem = (arrayName) => {
    setEditedData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), {
        rawRecording: null,
        reverbAdded: null,
        noiseCancelled: null
      }]
    }));
  };

  const removeFilesArrayItem = (arrayName, field, index) => {
    setEditedData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  if (!musicDetail) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Music Details</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/music/library')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn-primary">
                  Save
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(musicDetail);
                  }} 
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="btn-primary">
                  Edit
                </button>
                <button onClick={handleDelete} className="btn-danger">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <BasicInfoForm
            formData={editedData}
            handleChange={handleInputChange}
            isEditing={isEditing}
            title="Music Information"
          />
          
          <TimingInfoForm
            formData={editedData}
            handleChange={handleInputChange}
            handleArrayChange={handleArrayChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            isEditing={isEditing}
            title="Timing Information"
          />
          
          <ScoresForm
            files={editedData}
            handleFileChange={handleFileChange}
            isEditing={isEditing}
            title="Score Files"
          />
          
          <SoundTracksForm
            files={editedData}
            handleFileChange={handleFileChange}
            isEditing={isEditing}
            title="Sound Tracks"
          />
          
          <UserInputsForm
            files={editedData}
            handleFileChange={handleFileChange}
            isEditing={isEditing}
            title="User Recordings"
          />
          
          <AdditionalFilesForm
            files={editedData}
            handleFileChange={handleFileChange}
            isEditing={isEditing}
            title="Additional Files"
          />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
