import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const EducationForm = ({ education, handleChange }) => {
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    handleChange(newEducation);
  };

  const addEducation = () => {
    handleChange([
      ...education,
      { institution: '', degree: '', year: '', id: Date.now().toString() }
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    handleChange(newEducation);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>
      
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="University Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Bachelor of Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="2015 - 2019"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;