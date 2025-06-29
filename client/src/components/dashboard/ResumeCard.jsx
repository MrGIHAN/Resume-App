import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { deleteResume } from '../../services/resumeService';

const ResumeCard = ({ resume, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(resume._id);
        onDelete(resume._id);
      } catch (err) {
        console.error('Failed to delete resume', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{resume.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {format(new Date(resume.updatedAt), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete resume"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
        <div className="flex justify-end space-x-3">
          <Link
            to={`/editor/${resume._id}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <Link
            to={`/editor/${resume._id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;