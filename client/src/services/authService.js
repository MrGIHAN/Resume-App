import api from './api';

export const registerUser = (email, password) => {
  return api.post('/auth/register', { email, password });
};

export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const getUser = () => {
  return api.get('/auth/user');
};