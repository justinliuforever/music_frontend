import Header from '../components/Header';
import { REACT_APP_API_URL } from '../../config.js';
import { useState } from 'react';

export default function UploadPage() {
  
  return (
    <div className="relative isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
      <Header />
      {/* SVG background */}
      
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Upload Music</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Share your music with the world.
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form action="#" method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                  Title (Music Name)
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Artist */}
              <div>
                <label htmlFor="artist" className="block text-sm font-semibold leading-6 text-gray-900">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  id="artist"
                  required
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Album */}
              <div>
                <label htmlFor="album" className="block text-sm font-semibold leading-6 text-gray-900">
                  Album (Optional)
                </label>
                <input
                  type="text"
                  name="album"
                  id="album"
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-semibold leading-6 text-gray-900">
                  Year (Optional)
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Genre */}
              <div className="sm:col-span-2">
                <label htmlFor="genre" className="block text-sm font-semibold leading-6 text-gray-900">
                  Genre (Optional)
                </label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  placeholder="Separate genres with commas"
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold leading-6 text-gray-900">
                  Duration (Optional)
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="Format: MM:SS"
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              By submitting this form, your music will automatically be sent to our database.
            </p>
          </form>
          {/* Image and audio upload areas remain unchanged */}
        </div>
      </div>
    </div>
  );
}
