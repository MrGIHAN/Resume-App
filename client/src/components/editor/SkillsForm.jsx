import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const SkillsForm = ({ skills, handleChange }) => {
  const handleInputChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    handleChange(newSkills);
  };

  const addSkill = () => {
    handleChange([...skills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    handleChange(newSkills);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Skill
        </button>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleInputChange(index, e)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              placeholder="Skill name"
            />
            <button
              onClick={() => removeSkill(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;