import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BasicInfoForm from '../components/music_form/BasicInfoForm';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import { REACT_APP_API_URL } from '../../config.js';
import ScoresForm from '../components/music_form/ScoresForm';

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
        setMusicDetail(data);
        setEditedData(data);
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

    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: files.length === 1 ? files[0] : Array.from(files)
      }
    }));
  };

  const handleSave = async () => {
    try {
      // First, upload any new files
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

      // Now update the database with the new file URLs
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
          
          <ScoresForm
            files={editedData}
            handleFileChange={handleFileChange}
            isEditing={isEditing}
            title="Score Files"
          />
          
          {/* Other forms... */}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
