import React from 'react';

const PersonalForm = ({ personalInfo, handleChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ ...personalInfo, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="City, Country"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Brief summary of your professional experience..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;