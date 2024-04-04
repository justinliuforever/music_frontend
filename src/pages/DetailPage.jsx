import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//import { PaperClipIcon } from '@heroicons/react/20/solid';
import{REACT_APP_API_URL} from '../../config.js';

function DetailPage() {
  const { id } = useParams();
  const [musicDetail, setMusicDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/music/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMusicDetail(data))
      .catch(error => console.error('Error fetching music detail:', error));
  }, [id]);

  // Function to handle the delete action
  const handleDelete = () => {
    fetch(`${REACT_APP_API_URL}/music/${id}`, {
      method: 'DELETE', // Specify the method
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting the music track');
      }
      return response.json(); // or handle it as needed if the response is not JSON
    })
    .then(() => {
      // Here you might want to navigate back to the list page or show a success message
      navigate('/music/library'); // Redirect to the homepage or list page as per your route settings
    })
    .catch(error => console.error('Error deleting music track:', error));
  };

  const handleBackToMain = () => {
    navigate('/music/library'); // Adjust this as necessary for your main page's route
  };



  if (!musicDetail) return <div>Loading...</div>;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{musicDetail.title} - Details</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{musicDetail.artist}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Album</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.album}</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Year</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.year}</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Genre</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.genre.join(', ')}</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.duration}</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.description}</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Likes</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{musicDetail.likes}</dd>
          </div>
          {/* Assuming you want to display the music picture and a link to listen to the music */}
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Music Cover</dt>
            <dd className="mt-1 sm:col-span-2 sm:mt-0">
              <img src={musicDetail.musicPictureURL} alt="Music Cover" className="w-48 h-auto rounded-md" />
            </dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Listen</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <a href={musicDetail.musicAudioURL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">Play Music</a>
            </dd>
          </div>
          
          {/* Add the delete button */}
          <div className="flex justify-center p-4">
            <button
              onClick={handleBackToMain}
              className="mt-6 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Back
            </button>

            <button
              onClick={handleDelete}
              className="mt-6 ml-4 inline-block rounded bg-slate-50 px-6 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default DetailPage;
