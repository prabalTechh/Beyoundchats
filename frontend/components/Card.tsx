import React from 'react';
import { Globe } from 'lucide-react';

interface CardProps{
    title:String | undefined,
    description:String | undefined,
    imgUrl: string
}

function Card({title, description, imgUrl} : CardProps) {
  return (
    <div className=" mt-2  p-4">
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative p-3 shadow">
          <img 
            src={imgUrl}
            alt="Website Preview" 
            className="w-full  object-cover"
          />
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
           {description}
          </p>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="text-blue-600 font-semibold">View Details</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;