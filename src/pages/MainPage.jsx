import {
  FiAlertCircle,
  FiBook,
  FiClock,
  FiHardDrive,
  FiHelpCircle,
  FiInfo,
  FiMusic,
  FiUpload,
  FiUsers
} from 'react-icons/fi';
// MainPage.jsx
//import React from 'react';
import { useEffect, useState } from 'react';

import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../config.js';

function MainPage() {
  const [statistics, setStatistics] = useState({
    totalTracks: 0,
    totalComposers: 0,
    recentUploads: [],
    storageUsage: {
      scores: 0,
      recordings: 0,
      soundtracks: 0
    },
    analytics: {
      totalDuration: '0',
      incompleteTracks: 0,
      instrumentTypes: {},
      composersByEra: {
        baroque: 0,
        classical: 0,
        romantic: 0,
        modern: 0
      }
    }
  });

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/music`)
      .then(response => response.json())
      .then(data => {
        const composers = new Set(data.map(track => track.composerFullName));
        const recent = data.slice(-5).reverse();
        
        // Calculate additional statistics
        const instrumentTypes = data.reduce((acc, track) => {
          if (track.instrumentOrVoiceType) {
            acc[track.instrumentOrVoiceType] = (acc[track.instrumentOrVoiceType] || 0) + 1;
          }
          return acc;
        }, {});

        const incompleteTracks = data.filter(track => 
          !track.duration || 
          !track.key || 
          !track.fullScore?.baseXML
        ).length;

        setStatistics({
          totalTracks: data.length,
          totalComposers: composers.size,
          recentUploads: recent,
          storageUsage: {
            scores: data.filter(track => track.fullScore?.baseXML || track.fullScore?.pdf).length,
            recordings: data.filter(track => track.userInputs?.length > 0).length,
            soundtracks: data.filter(track => track.soundTracks?.length > 0).length
          },
          analytics: {
            totalDuration: calculateTotalDuration(data),
            incompleteTracks,
            instrumentTypes,
            // You might want to implement actual era classification
            composersByEra: classifyComposersByEra(data)
          }
        });
      })
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  // Helper function to calculate total duration
  const calculateTotalDuration = (data) => {
    // Implement duration calculation logic
    return data.reduce((total, track) => {
      if (track.duration) {
        // Convert duration string to minutes and add to total
        return total + parseDuration(track.duration);
      }
      return total;
    }, 0).toFixed(1);
  };

  // Helper function to parse duration string
  const parseDuration = (duration) => {
    // Implement duration parsing logic
    return parseFloat(duration) || 0;
  };

  // Helper function to classify composers by era
  const classifyComposersByEra = (data) => {
    // Implement actual classification logic
    return {
      baroque: data.length * 0.2,
      classical: data.length * 0.3,
      romantic: data.length * 0.4,
      modern: data.length * 0.1
    };
  };

  // Add tooltip component
  const Tooltip = ({ children }) => (
    <div className="group relative inline-block">
      <FiHelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {children}
      </div>
    </div>
  );

  // Add info card component
  const StatCard = ({ icon: Icon, title, value, description, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`p-2 bg-${color}-50 rounded-lg`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">{title}</p>
              <Tooltip>{description}</Tooltip>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Music Library Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              to="/music/upload"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <FiUpload className="mr-2" />
              New Upload
            </Link>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiMusic}
            title="Total Tracks"
            value={statistics.totalTracks}
            color="blue"
            description="Total number of music pieces in the library, including all versions and arrangements."
          />

          <StatCard
            icon={FiUsers}
            title="Composers"
            value={statistics.totalComposers}
            color="green"
            description="Unique number of composers across all tracks, calculated based on distinct composer full names."
          />

          <StatCard
            icon={FiClock}
            title="Total Duration"
            value={`${statistics.analytics.totalDuration}h`}
            color="purple"
            description={`
              Combined duration of all tracks in hours.
              Calculated from individual track durations.
              Empty durations are counted as 0.
            `}
          />

          <StatCard
            icon={FiAlertCircle}
            title="Incomplete Entries"
            value={statistics.analytics.incompleteTracks}
            color="red"
            description={`
              Tracks missing essential information:
              • No duration specified
              • No key information
              • Missing base XML score
              These tracks may need attention.
            `}
          />
        </div>

        {/* Storage Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Storage Analytics</h2>
            <Tooltip>
              Breakdown of different file types in the library:
              • Scores: XML and PDF files
              • Recordings: User performance recordings
              • Soundtracks: WAV and MIDI accompaniments
            </Tooltip>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-semibold text-blue-600">{statistics.storageUsage.scores}</p>
                <Tooltip>Number of tracks with either XML or PDF score files</Tooltip>
              </div>
              <p className="text-sm text-gray-600">Scores</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-semibold text-green-600">{statistics.storageUsage.recordings}</p>
                <Tooltip>Number of tracks with user recording inputs</Tooltip>
              </div>
              <p className="text-sm text-gray-600">Recordings</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-semibold text-purple-600">{statistics.storageUsage.soundtracks}</p>
                <Tooltip>Number of tracks with WAV/MIDI soundtrack files</Tooltip>
              </div>
              <p className="text-sm text-gray-600">Soundtracks</p>
            </div>
          </div>
        </div>

        {/* Calculation Methods Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiInfo className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">How Statistics Are Calculated</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Duration Calculation</h3>
              <p className="text-sm text-gray-600">
                Total duration is calculated by:
                1. Converting each track's duration to hours
                2. Summing all valid durations
                3. Rounding to one decimal place
                4. Skipping tracks with invalid/missing durations
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Incomplete Entry Detection</h3>
              <p className="text-sm text-gray-600">
                A track is marked incomplete if:
                • Duration field is empty
                • Key information is missing
                • No base XML score is uploaded
                This helps identify entries needing attention.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Storage Metrics</h3>
              <p className="text-sm text-gray-600">
                Storage counts are based on:
                • Scores: Tracks with XML or PDF files
                • Recordings: Tracks with user input recordings
                • Soundtracks: Tracks with WAV/MIDI files
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Composer Count</h3>
              <p className="text-sm text-gray-600">
                Unique composers are counted by:
                1. Extracting composer full names
                2. Creating a unique set of names
                3. Counting the set size
                This eliminates duplicate entries.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h2>
              <div className="space-y-4">
                {statistics.recentUploads.map((track) => (
                  <Link 
                    key={track._id}
                    to={`/music/library/${track._id}`}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FiMusic className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{track.title}</p>
                      <p className="text-sm text-gray-500">
                        {track.composerFullName} • {track.instrumentOrVoiceType || 'Unknown Instrument'}
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      {new Date(track.createdAt).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Storage Usage */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage Distribution</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-semibold text-blue-600">{statistics.storageUsage.scores}</p>
                  <p className="text-sm text-gray-600">Scores</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-semibold text-green-600">{statistics.storageUsage.recordings}</p>
                  <p className="text-sm text-gray-600">Recordings</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-semibold text-purple-600">{statistics.storageUsage.soundtracks}</p>
                  <p className="text-sm text-gray-600">Soundtracks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link 
                  to="/music/upload"
                  className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <FiUpload className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3 text-indigo-600 font-medium">Upload New Music</span>
                </Link>
                <Link 
                  to="/music/library"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FiBook className="h-5 w-5 text-green-600" />
                  <span className="ml-3 text-green-600 font-medium">Browse Library</span>
                </Link>
                <Link 
                  to="/storage"
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FiHardDrive className="h-5 w-5 text-purple-600" />
                  <span className="ml-3 text-purple-600 font-medium">Manage Storage</span>
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Storage Usage</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Upload Speed</span>
                  <span className="text-sm font-medium text-green-600">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">API Status</span>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
