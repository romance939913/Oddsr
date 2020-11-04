import axios from 'axios';
import * as keys from '../api_keys';

export const getWeekNFL = () => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${keys.sportsDataNFL}`);
};

export const preGameOddsNFL = week => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2020/${week}?key=${keys.sportsDataNFL}`);
};

