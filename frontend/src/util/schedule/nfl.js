import axios from 'axios';
import * as keys from '../api_keys';

export const fetchCurrentSeason = () => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${keys.sportsDataNFL}`);
};

export const fetchCurrentWeek = () => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${keys.sportsDataNFL}`);
};

export const fetchPreGameOdds = week => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2020/${week}?key=${keys.sportsDataNFL}`);
};

export const fetchTeams = () => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=${keys.sportsDataNFL}`);
};

export const fetchStandings = season => {
  return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}?key=${keys.sportsDataNFL}`);
};


