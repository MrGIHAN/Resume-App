import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExperienceForm = ({ experience, handleChange }) => {
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    handleChange(newExperience);
  };

  const addExperience = () => {
    handleChange([
      ...experience,
      { company: '', position: '', duration: '', description: '', id: Date.now().toString() }
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    handleChange(newExperience);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>
      
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Job Title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={exp.duration}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Jan 2020 - Present"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleInputChange(index, e)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Describe your responsibilities and achievements..."
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;