import axios from 'axios';
import * as keys from '../api_keys';

export const getWeek = () => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${keys.sportsDataIo}`);
};