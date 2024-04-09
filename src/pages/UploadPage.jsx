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
  });

  const navigate = useNavigate();

  // New state for files
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imageName, setImageName] = useState('Upload Image'); // Initial state for image name
  const [audioName, setAudioName] = useState('Upload Music'); // Initial state for audio name


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

  // Function to handle canceling image selection
  const handleCancelImage = () => {
    setImageFile(null); // Reset image file to null
    setImageName('Upload Image'); // Reset image name to default
  };
  
  // Function to handle canceling audio selection
  const handleCancelAudio = () => {
    setAudioFile(null); // Reset audio file to null
    setAudioName('Upload Music'); // Reset audio name to default
  };
  
  const uploadFileToFirebase = async (file, route) => {
    const formData = new FormData();
    formData.append(route === '/firebase/uploadImage' ? 'image' : 'audio', file);

    const response = await fetch(`${REACT_APP_API_URL}${route}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload file to Firebase');
    return await response.json();
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Step 1: Upload the image file to Firebase if it exists
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile); // 'image' is the key expected by the multer configuration on the server-side

        const imageResponse = await fetch(`${REACT_APP_API_URL}/firebase/uploadImage`, {
          method: 'POST',
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image file');
        }

        const imageResult = await imageResponse.json();
        // Update formData with the returned imageURL
        formData.musicPictureURL = imageResult.imageURL;
      }

      // Step 2: Upload the audio file to Firebase if it exists
      if (audioFile) {
        const audioFormData = new FormData();
        audioFormData.append('audio', audioFile); // 'audio' is the key expected by the multer configuration on the server-side

        const audioResponse = await fetch(`${REACT_APP_API_URL}/firebase/uploadAudio`, {
          method: 'POST',
          body: audioFormData,
        });

        if (!audioResponse.ok) {
          throw new Error('Failed to upload audio file');
        }

        const audioResult = await audioResponse.json();
        // Update formData with the returned audioURL
        formData.musicAudioURL = audioResult.audioURL;
      }

      // Step 3: Submit the updated formData to MongoDB
      const response = await fetch(`${REACT_APP_API_URL}/music`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData now includes URLs from Firebase
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Log or handle the successful submission response

      navigate('/music/upload/success'); // Navigate to the success page

    } catch (error) {
      console.error('Error during the submission process:', error);
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

            {/* Two files upload */}
            {/* <input type="file" name="imageFile" onChange={handleImageChange} />
            <input type="file" name="audioFile" onChange={handleAudioChange} /> */}

            <div className="mt-8 flex gap-4">
              
              {/* Image Upload with Cancel Button */}
              <label className="flex-1 relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <input type="file" name="imageFile" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">{imageName}</span>
                  {imageFile && <button type="button" onClick={handleCancelImage} className="text-indigo-600 hover:text-indigo-900">Cancel</button>}
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
