import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ImageGallery = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <>
      {/* Mobile Gallery */}
      <div className="lg:hidden relative">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center"
          >
            <Icon name="ChevronRight" size={16} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'border-primary' :'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
          {/* Main Image */}
          <div className="col-span-2 row-span-2">
            <button
              onClick={() => openLightbox(0)}
              className="w-full h-full group relative overflow-hidden"
            >
              <Image
                src={images[0]}
                alt={`${title} - Main image`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </button>
          </div>

          {/* Secondary Images */}
          {images.slice(1, 5).map((image, index) => (
            <div key={index + 1} className="relative">
              <button
                onClick={() => openLightbox(index + 1)}
                className="w-full h-full group relative overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                
                {/* Show All Photos Button on Last Image */}
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Icon name="Grid3X3" size={24} className="mx-auto mb-1" />
                      <span className="text-sm font-medium">
                        +{images.length - 5} photos
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* View All Photos Button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-background border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors duration-200 flex items-center space-x-2"
        >
          <Icon name="Grid3X3" size={16} />
          <span>Show all photos</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full flex items-center justify-center transition-all duration-200 z-10"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            {/* Main Image */}
            <div className="max-w-4xl max-h-full">
              <Image
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} of {images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-white' :'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;