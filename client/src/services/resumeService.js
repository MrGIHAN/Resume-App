import api from './api';

export const getUserResumes = () => {
  return api.get('/resumes');
};

export const createResume = (title) => {
  return api.post('/resumes', { title });
};

export const getResume = (id) => {
  return api.get(`/resumes/${id}`);
};

export const updateResume = (id, resumeData) => {
  return api.put(`/resumes/${id}`, resumeData);
};

export const deleteResume = (id) => {
  return api.delete(`/resumes/${id}`);
};

export const uploadPhoto = (image) => {
  return api.post('/resumes/upload', { image });
};

export const generatePDF = (htmlContent) => {
  return api.post('/pdf/generate', { htmlContent }, {
    responseType: 'arraybuffer',
    headers: {
      'Accept': 'application/pdf'
    }
  });
};