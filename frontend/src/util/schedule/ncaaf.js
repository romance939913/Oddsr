import axios from 'axios';
import * as keys from '../api_keys';

export const fetchCurrentSeason = () => {
  return axios.get(`https://api.sportsdata.io/v3/cfb/scores/json/CurrentSeason?key=${keys.sportsDataNCAAF}`);
};

export const fetchCurrentWeek = () => {
  return axios.get(`https://api.sportsdata.io/v3/cfb/scores/json/CurrentWeek?key=${keys.sportsDataNCAAF}`);
};

export const fetchPreGameOdds = week => {
  return axios.get(`https://api.sportsdata.io/v3/cfb/odds/json/GameOddsByWeek/2020/${week}?key=${keys.sportsDataNCAAF}`);
};

export const fetchTeams = () => {
  return axios.get(`https://api.sportsdata.io/v3/cfb/scores/json/Teams?key=${keys.sportsDataNCAAF}`);
};

export const fetchStandings = season => {
  return axios.get(`https://api.sportsdata.io/v3/cfb/scores/json/Standings/${season}?key=${keys.sportsDataNCAAF}`);
};