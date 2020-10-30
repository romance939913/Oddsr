import axios from 'axios';
import * as keys from './api_keys'

export const getTimes = () => {
  return axios.get('/api/cappers');
};

export const getSpreads = (sport) => {
  return axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${keys.oddsApiKey}&sport=${sport}&region=us&mkt=spreads`);
};