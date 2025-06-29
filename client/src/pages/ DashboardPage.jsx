import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumeCard from '../components/dashboard/ResumeCard';
import { getUserResumes, createResume } from '../services/resumeService';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getUserResumes();
        setResumes(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
        setLoading(false);
      }
    };
    
    fetchResumes();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    
    try {
      const newResume = await createResume(newTitle);
      setResumes([newResume, ...resumes]);
      setNewTitle('');
    } catch (err) {
      console.error('Failed to create resume', err);
    }
  };

  const handleDelete = (id) => {
    setResumes(resumes.filter(resume => resume._id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.email}</h1>
        <p className="text-gray-600">Create and manage your resumes</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <label htmlFor="resume-title" className="block text-sm font-medium text-gray-700 mb-1">
              New Resume Title
            </label>
            <input
              type="text"
              id="resume-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resume title"
            />
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition duration-300"
          >
            Create Resume
          </button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Resumes</h2>
      
      {resumes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't created any resumes yet.</p>
          <Link to="/editor" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => (
            <ResumeCard 
              key={resume._id} 
              resume={resume} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;