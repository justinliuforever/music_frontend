// ImageCarousel.js
import { useState } from 'react';

function ImageCarousel({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div id="image-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${index === activeImageIndex ? 'block' : 'hidden'}`}
            data-carousel-item
          >
            <img src={image} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-4">
        <button onClick={prevImage} type="button" className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none">
          Prev {/* Replace with an SVG or icon as needed */}
        </button>
        <button onClick={nextImage} type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none">
          Next {/* Replace with an SVG or icon as needed */}
        </button>
      </div>

    </div>
  );
}

export default ImageCarousel;
