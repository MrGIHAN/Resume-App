import React from 'react';
import TemplateSelector from './TemplateSelector';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';
import { DocumentArrowDownIcon, DocumentTextIcon, AcademicCapIcon, BriefcaseIcon, UserIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const EditorSidebar = ({ 
  activeTab, 
  setActiveTab,
  handleSave,
  saving,
  handlePrint,
  resume,
  handleChange
}) => {
  const tabs = [
    { id: 'personal', label: 'Personal', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'education', label: 'Education', icon: <AcademicCapIcon className="h-5 w-5" /> },
    { id: 'experience', label: 'Experience', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { id: 'skills', label: 'Skills', icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: 'design', label: 'Design', icon: <PaintBrushIcon className="h-5 w-5" /> }
  ];

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Editor Tools</h3>
        
        <div className="flex flex-col gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-blue-500">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium ${
              saving ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
          
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            Download PDF
          </button>
        </div>
      </div>
      
      {activeTab === 'design' && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Design Options</h3>
          
          <TemplateSelector 
            currentTemplate={resume.template} 
            onSelect={template => handleChange('template', template)} 
          />
          
          <ColorPicker 
            colors={resume.colors} 
            onChange={colors => handleChange('colors', colors)} 
          />
          
          <ImageUploader 
            currentPhoto={resume.personalInfo.photoUrl} 
            onUpload={url => handleChange('personalInfo', {...resume.personalInfo, photoUrl: url})} 
          />
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;