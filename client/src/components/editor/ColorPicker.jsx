import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ colors, onChange }) => {
  const [activeColor, setActiveColor] = useState('primary');
  
  const colorTypes = [
    { id: 'primary', label: 'Primary' },
    { id: 'secondary', label: 'Secondary' },
    { id: 'background', label: 'Background' }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Color Theme</h3>
      
      <div className="flex space-x-2 mb-4">
        {colorTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setActiveColor(type.id)}
            className={`px-3 py-1 text-sm rounded ${
              activeColor === type.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      <HexColorPicker 
        color={colors[activeColor]} 
        onChange={color => onChange({ ...colors, [activeColor]: color })}
        className="w-full mb-3"
      />
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Selected Color</label>
          <div 
            className="w-full h-8 rounded border" 
            style={{ backgroundColor: colors[activeColor] }}
          ></div>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">HEX Code</label>
          <input
            type="text"
            value={colors[activeColor]}
            onChange={e => onChange({ ...colors, [activeColor]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;