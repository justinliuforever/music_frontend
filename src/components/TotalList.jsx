// components/TotalList.jsx
import { useEffect, useState } from 'react';

function TotalList() {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/music/')
      .then((response) => response.json())
      .then((data) => setMusicData(data))
      .catch((error) => console.error('Error fetching music data:', error));
  }, []);

  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {musicData.map((music) => (
        <li key={music._id} className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
          <div className="flex flex-col items-center justify-center p-6">
            <img
              src={music.musicPictureURL}
              alt={music.title}
              className="h-48 w-48 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 mb-4"
            />
            <div className="text-lg font-medium leading-6 text-gray-900">{music.title}</div>
            <div className="text-sm text-gray-500">{music.artist}</div>
          </div>
          <dl className="border-t border-gray-200 px-4 py-5 text-sm leading-6">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Album</dt>
              <dd className="text-gray-900">{music.album}</dd>
            </div>
            <div className="flex justify-between mt-2">
              <dt className="font-medium text-gray-500">Year</dt>
              <dd className="text-gray-900">{music.year}</dd>
            </div>
            <div className="flex justify-between mt-2">
              <dt className="font-medium text-gray-500">Genre</dt>
              <dd className="text-gray-900">{music.genre.join(', ')}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export default TotalList;
