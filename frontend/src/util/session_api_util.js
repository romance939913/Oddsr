import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signupUser = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const signupCapper = (capperData) => {
  return axios.post('/api/cappers/register', capperData);
};

export const loginUser = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const loginCapper = (capperData) => {
  return axios.post('/api/cappers/login', capperData);
};