import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import EditorSidebar from './EditorSidebar';
import PersonalForm from './PersonalForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import Preview from './Preview';
import { getResume, updateResume, generatePDF } from '../../services/resumeService';
import { useAuth } from '../../context/AuthContext';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const previewRef = useRef();
  
  const [resume, setResume] = useState({
    title: 'My Resume',
    personalInfo: { 
      name: '', 
      email: user?.email || '', 
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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getResume(id);
        
        // Ensure user owns this resume
        if (data.userId !== user.id) {
          navigate('/dashboard');
          return;
        }
        
        setResume(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load resume', err);
        setError('Failed to load resume. Please try again.');
        setLoading(false);
        navigate('/dashboard');
      }
    };
    
    fetchResume();
  }, [id, navigate, user]);

  const handleChange = (section, value) => {
    setResume(prev => ({ ...prev, [section]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      // If it's a new resume, create it first
      if (!id) {
        const newResume = await updateResume(null, { ...resume, title: resume.title || 'Untitled Resume' });
        navigate(`/editor/${newResume._id}`);
        return;
      }
      
      await updateResume(id, resume);
      setSaving(false);
    } catch (err) {
      console.error('Failed to save resume', err);
      setError('Failed to save resume. Please try again.');
      setSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const htmlContent = previewRef.current.innerHTML;
      const response = await generatePDF(htmlContent);
      
      // Create a Blob from the PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resume.title || 'resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed', err);
      setError('Failed to generate PDF. Please try again.');
    }
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: resume.title || 'Resume',
    onAfterPrint: () => console.log('Printed successfully')
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Editor Sidebar */}
        <EditorSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          handleSave={handleSave}
          saving={saving}
          handlePrint={handlePrint}
          handleDownloadPDF={handleDownloadPDF}
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
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrint}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Print
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-900"
                  >
                    Download PDF
                  </button>
                </div>
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

export default Editor;