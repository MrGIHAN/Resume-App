import React from 'react';

const TemplateSelector = ({ currentTemplate, onSelect }) => {
  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Select Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map(template => (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
              currentTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <p className="text-center mt-2 text-sm">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;