import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface CardProps {
  title: string | undefined;
  description: string | undefined;
  imgUrl: string[] | string;
}

function Card({ title, description, imgUrl }: CardProps) {
  const [imageError, setImageError] = useState(false);

  // Function to get primary image URL
  const getPrimaryImage = () => {
    if (Array.isArray(imgUrl)) {
      return imgUrl[0] || 'https://placehold.co/600x400';
    }
    return imgUrl || 'https://placehold.co/600x400';
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="p-4">
      <div className="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <img
            src={imageError ? 'https://placehold.co/600x400cd ' : getPrimaryImage()}
            alt="Website Preview"
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md backdrop-blur-sm">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
            {title || 'No Title'}
          </h2>
          <p className="mb-6 text-sm text-gray-600 line-clamp-3">
            {description || 'No Description'}
          </p>
          
          <div className="flex items-center justify-between">
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;