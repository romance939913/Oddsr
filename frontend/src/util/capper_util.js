import axios from 'axios';

export const getCappers = () => {
  return axios.get('/api/cappers');
};

export const getCapper = () => {
  return axios.get('/api/cappers');
};