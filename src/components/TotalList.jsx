import { useEffect, useState } from 'react';

import { REACT_APP_API_URL } from '../../config.js';
import { useNavigate } from 'react-router-dom';

function TotalList() {
  const [musicData, setMusicData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/music/`)
      .then((response) => response.json())
      .then((data) => setMusicData(data))
      .catch((error) => console.error('Error fetching music data:', error));
  }, []);

  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title & Composer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {musicData.map((music) => (
            <tr 
              key={music._id}
              onClick={() => navigate(`/music/library/${music._id}`)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">{music.title}</div>
                  <div className="text-sm text-gray-500">{music.composerFullName}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col text-sm text-gray-500">
                  {music.opusNumber && <span>Opus: {music.opusNumber}</span>}
                  {music.key && <span>Key: {music.key}</span>}
                  {music.instrumentOrVoiceType && (
                    <span className="truncate">{music.instrumentOrVoiceType}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {music.duration || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(music.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TotalList;
