import React, { useState } from 'react';
import { uploadPhoto } from '../../services/resumeService';

const ImageUploader = ({ currentPhoto, onUpload }) => {
  const [loading, setLoading] = useState(false);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const { url } = await uploadPhoto(base64Image);
        onUpload(url);
        setLoading(false);
      };
    } catch (err) {
      console.error('Image upload failed', err);
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Profile Photo</h3>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          {currentPhoto ? (
            <img 
              src={currentPhoto} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        <div>
          <label className="block">
            <span className="sr-only">Upload profile photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 2MB)</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;