import Header from '../components/Header';
import { REACT_APP_API_URL } from '../../config.js';
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

  // New state for files
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const uploadFileToFirebase = async (file, route) => {
    const formData = new FormData();
    formData.append(route === '/firebase/uploadImage' ? 'image' : 'audio', file);

    const response = await fetch(`http://localhost:5555${route}`, {
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
// Assuming you have state hooks for formData, imageFile, and audioFile
// and handleChange handlers for form inputs and file inputs

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Step 1: Upload the image file to Firebase if it exists
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile); // 'image' is the key expected by the multer configuration on the server-side

        const imageResponse = await fetch('http://localhost:5555/firebase/uploadImage', {
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

        const audioResponse = await fetch('http://localhost:5555/firebase/uploadAudio', {
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
            {/* Form fields */}
            {/* Each input field below has value and onChange configured for React state management */}
            
            {/* Title Field */}
            <div>
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
            <div>
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

            {/* Album Field */}
            <div>
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
            <div>
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

            {/* Genre Field */}
            <div>
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
            <div>
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

            {/* Description Field */}
            <div>
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

            {/* Music Picture URL Field */}
            {/* <div>
              <label htmlFor="musicPictureURL" className="block text-sm font-semibold leading-6 text-gray-900">
                Music Picture URL (Optional)
              </label>
              <input
                type="text"
                name="musicPictureURL"
                id="musicPictureURL"
                value={formData.musicPictureURL || ''}
                onChange={handleChange} // Assuming handleChange can handle simple key-value updates
                className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div> */}

            {/* Music Audio URL Field - Marked as required in your schema */}
            {/* <div>
              <label htmlFor="musicAudioURL" className="block text-sm font-semibold leading-6 text-gray-900">
                Music Audio URL
              </label>
              <input
                type="text"
                name="musicAudioURL"
                id="musicAudioURL"
                required
                value={formData.musicAudioURL}
                onChange={handleChange}
                className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div> */}

            {/* Include file input for image */}
            <input type="file" name="imageFile" onChange={handleImageChange} />
            {/* Include file input for audio */}
            <input type="file" name="audioFile" onChange={handleAudioChange} />
            {/* Your existing submit button */}


            
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
