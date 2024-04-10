import Header from '../components/Header';
import { REACT_APP_API_URL } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function UploadPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    duration: '',
    description: '',
    musicPictureURL: '',
    musicAudioURL: '',
    fullScoreURLs: [], // Placeholder for full score URLs
    pianoReductionURLs: [], // Placeholder for piano reduction URLs
  });
  

  const navigate = useNavigate();

  // New state for files
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imageName, setImageName] = useState('Upload Image'); // Initial state for image name
  const [audioName, setAudioName] = useState('Upload Music'); // Initial state for audio name

  // New state for full score files
  const [fullScoreFiles, setFullScoreFiles] = useState([]);
  const [fullScoreNames, setFullScoreNames] = useState('Upload Full Score(s)'); // Initial state for full score names

  // New state for piano reduction files
  const [pianoReductionFiles, setPianoReductionFiles] = useState([]);
  const [pianoReductionNames, setPianoReductionNames] = useState('Upload Piano Reduction(s)'); // Initial state for piano reduction names



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file ? file.name : 'Upload Image'); // Set file name or revert to default
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioName(file ? file.name : 'Upload Music'); // Set file name or revert to default
  };

  const handleFullScoreChange = (e) => {
    const files = Array.from(e.target.files);
    setFullScoreFiles(files);
    setFullScoreNames(files.length > 1 ? `${files.length} files selected` : files[0].name);
  };

  const handlePianoReductionChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setPianoReductionFiles(files);
    setPianoReductionNames(files.length > 1 ? `${files.length} files selected` : files[0].name);
  };
  


  // Function to handle canceling image selection
  const handleCancelImage = () => {
    setImageFile(null); // Reset image file to null
    setImageName('Upload Image test'); // Reset image name to default
  };
  
  // Function to handle canceling audio selection
  const handleCancelAudio = () => {
    setAudioFile(null); // Reset audio file to null
    setAudioName('Upload Music'); // Reset audio name to default
  };

  const handleCancelFullScore = () => {
    setFullScoreFiles([]); // Reset full score files to an empty array
    setFullScoreNames('Upload Full Score(s)'); // Reset full score names to default
  };

  const handleCancelPianoReduction = () => {
    setPianoReductionFiles([]); // Reset piano reduction files to an empty array
    setPianoReductionNames('Upload Piano Reduction(s)'); // Reset piano reduction names to default
};

  
async function uploadFileToFirebase(file, route, fieldName) {
  const formData = new FormData();
  formData.append(fieldName, file);

  try {
      const response = await fetch(`${REACT_APP_API_URL}/firebase${route}`, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`Failed to upload file to ${route}, status: ${response.status}`);
      }

      return await response.json(); // Assuming the backend response includes the file URL(s)
  } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
  }
}


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Initialize an object to collect URLs
      const urls = {
        musicPictureURL: '',
        musicAudioURL: '',
        fullScoreURLs: [],
        pianoReductionURLs: [],
      };
  
      // Upload the image file
      if (imageFile) {
        const imageResponse = await uploadFileToFirebase(imageFile, '/uploadImage', 'image');
        urls.musicPictureURL = imageResponse.imageURL;
      }
  
      // Upload the audio file
      if (audioFile) {
        const audioResponse = await uploadFileToFirebase(audioFile, '/uploadAudio', 'audio');
        urls.musicAudioURL = audioResponse.audioURL;
      }
  
      // Upload full score files
      if (fullScoreFiles.length > 0) {
        const fullScoreResponses = await Promise.all(fullScoreFiles.map(file =>
          uploadFileToFirebase(file, '/uploadFullScore', 'fullScore')
        ));
        urls.fullScoreURLs = fullScoreResponses.flatMap(res => res.urls); // Assuming each response has a .url property
      }
  
      // Upload piano reduction files
      if (pianoReductionFiles.length > 0) {
        const pianoReductionResponses = await Promise.all(pianoReductionFiles.map(file =>
          uploadFileToFirebase(file, '/uploadPianoReduction', 'pianoReduction')
        ));
        urls.pianoReductionURLs = pianoReductionResponses.flatMap(res => res.urls); // Assuming each response has a .url property
      }
  
      // Split genre string into an array by commas and trim whitespace
      const genres = formData.genre ? formData.genre.split(',').map(genre => genre.trim()) : [];
  
      // Convert year string to a number if it's not empty, otherwise set to undefined
      const year = formData.year ? Number(formData.year) : undefined;
  
      const finalFormData = {
        ...formData,
        genre: genres,
        year: year,
        musicPictureURL: urls.musicPictureURL,
        musicAudioURL: urls.musicAudioURL,
        musicScore: {
          fullScore: urls.fullScoreURLs, // Now directly using the URLs array
          pianoReduction: urls.pianoReductionURLs, // Same as above
        },
        // Remove unnecessary properties from the form data to match the backend schema
      };
      console.log('Final form data:', finalFormData);
  
      // Delete properties not required or expected by the backend
      delete finalFormData.fullScoreURLs;
      delete finalFormData.pianoReductionURLs;
      delete finalFormData.fullScoreFiles;
      delete finalFormData.pianoReductionFiles;
  
      // Submit the updated formData to your backend
      const response = await fetch(`${REACT_APP_API_URL}/music`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalFormData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit form data, status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Submission successful:', result);
  
      // Navigate to success page or reset form
      navigate('/music/upload/success');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
  

  

  return (
    <div className="relative isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
      <Header />
      {/* SVG and other decorative elements remain unchanged */}

      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Upload Music</h2>
        {/* Description and other text elements remain unchanged */}

        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form onSubmit={handleSubmit} className="lg:flex-auto">
            {/* Adjusted form fields to be in rows as requested */}

            {/* Row for Title and Artist */}
            <div className="flex gap-4">
              {/* Title Field */}
              <div className="flex-1">
                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                  Title (Music Name)
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Artist Field */}
              <div className="flex-1">
                <label htmlFor="artist" className="block text-sm font-semibold leading-6 text-gray-900">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  id="artist"
                  required
                  value={formData.artist}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Row for Album and Year */}
            <div className="flex gap-4">
              {/* Album Field */}
              <div className="flex-1">
                <label htmlFor="album" className="block text-sm font-semibold leading-6 text-gray-900">
                  Album (Optional)
                </label>
                <input
                  type="text"
                  name="album"
                  id="album"
                  value={formData.album}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Year Field */}
              <div className="flex-1">
                <label htmlFor="year" className="block text-sm font-semibold leading-6 text-gray-900">
                  Year (Optional)
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Row for Genre and Duration */}
            <div className="flex gap-4">
              {/* Genre Field */}
              <div className="flex-1">
                <label htmlFor="genre" className="block text-sm font-semibold leading-6 text-gray-900">
                  Genre (Optional)
                </label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  placeholder="Separate genres with commas"
                  value={formData.genre}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Duration Field */}
              <div className="flex-1">
                <label htmlFor="duration" className="block text-sm font-semibold leading-6 text-gray-900">
                  Duration (Optional)
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="Format: MM:SS"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Row for Description */}
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>


            <div className="mt-8 flex gap-4">
              
              {/* Image Upload with Cancel Button */}
              <label className="flex-1 relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <input type="file" name="imageFile" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">{imageName}</span>
                  {imageFile && <button type="button" onClick={(event) => handleCancelImage(event)} className="text-indigo-600 hover:text-indigo-900">Cancel</button>}
                </div>
              </label>

              {/* Audio Upload with Cancel Button */}
              <label className="flex-1 relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <input type="file" name="audioFile" onChange={handleAudioChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">{audioName}</span>
                  {audioFile && <button type="button" onClick={handleCancelAudio} className="text-indigo-600 hover:text-indigo-900">Cancel</button>}
                </div>
              </label>

              {/* Full Score Upload with Cancel Button */}
              <label className="flex-1 relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <input type="file" multiple name="fullScoreFiles" onChange={handleFullScoreChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">{fullScoreNames}</span>
                  {fullScoreFiles.length > 0 && <button type="button" onClick={handleCancelFullScore} className="text-indigo-600 hover:text-indigo-900">Cancel</button>}
                </div>
              </label>

              {/* Piano Reduction Upload with Cancel Button */}
              <label className="flex-1 relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <input type="file" multiple name="pianoReductionFiles" onChange={handlePianoReductionChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">{pianoReductionNames}</span>
                  {pianoReductionFiles.length > 0 && <button type="button" onClick={handleCancelPianoReduction} className="text-indigo-600 hover:text-indigo-900">Cancel</button>}
                </div>
              </label>


            </div>
            
            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
  );
}
