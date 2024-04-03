import React, { useEffect, useState } from 'react';

//import { PaperClipIcon } from '@heroicons/react/20/solid';
import{REACT_APP_API_URL} from '../../config.js';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();
  const [musicDetail, setMusicDetail] = useState(null);

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
        </dl>
      </div>
    </div>
  );
}

export default DetailPage;
