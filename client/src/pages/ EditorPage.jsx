import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import EditorSidebar from '../components/editor/EditorSidebar';
import PersonalForm from '../components/editor/PersonalForm';
import EducationForm from '../components/editor/EducationForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import SkillsForm from '../components/editor/SkillsForm';
import Preview from '../components/editor/Preview';
import { getResume, updateResume } from '../services/resumeService';

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef();
  const [resume, setResume] = useState({
    title: 'My Resume',
    personalInfo: { 
      name: '', 
      email: '', 
      phone: '', 
      address: '',
      summary: '',
      photoUrl: '' 
    },
    education: [{ institution: '', degree: '', year: '', id: Date.now().toString() }],
    experience: [{ company: '', position: '', duration: '', description: '', id: Date.now().toString() }],
    skills: [''],
    template: 'classic',
    colors: { primary: '#2563eb', secondary: '#1e293b', background: '#ffffff' }
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await getResume(id);
        setResume(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load resume', err);
        navigate('/dashboard');
      }
    };
    
    fetchResume();
  }, [id, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateResume(id, resume);
      setTimeout(() => setSaving(false), 1000);
    } catch (err) {
      console.error('Failed to save resume', err);
      setSaving(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: resume.title || 'Resume'
  });

  const handleChange = (section, value) => {
    setResume(prev => ({ ...prev, [section]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Editor Sidebar */}
        <EditorSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          handleSave={handleSave}
          saving={saving}
          handlePrint={handlePrint}
          resume={resume}
          handleChange={handleChange}
        />
        
        {/* Form Area */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Resume Title</h2>
            <input
              type="text"
              value={resume.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Resume Title"
            />
          </div>
          
          {activeTab === 'personal' && (
            <PersonalForm 
              personalInfo={resume.personalInfo} 
              handleChange={(data) => handleChange('personalInfo', data)} 
            />
          )}
          
          {activeTab === 'education' && (
            <EducationForm 
              education={resume.education} 
              handleChange={(data) => handleChange('education', data)} 
            />
          )}
          
          {activeTab === 'experience' && (
            <ExperienceForm 
              experience={resume.experience} 
              handleChange={(data) => handleChange('experience', data)} 
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsForm 
              skills={resume.skills} 
              handleChange={(data) => handleChange('skills', data)} 
            />
          )}
        </div>
        
        {/* Preview Area */}
        <div className="w-full md:w-2/5">
          <div className="sticky top-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Preview</h3>
                <button 
                  onClick={handlePrint}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Download PDF
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(100vh-150px)]">
                <Preview ref={previewRef} resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;