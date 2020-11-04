import axios from 'axios';
import * as keys from '../api_keys';

export const getWeekNCAAF = () => {
    return axios.get(`https://api.sportsdata.io/v3/cfb/scores/json/CurrentWeek?key=${keys.sportsDataNCAAF}`);
};

export const preGameOddsNCAAF = week => {
    return axios.get(`https://api.sportsdata.io/v3/cfb/odds/json/GameOddsByWeek/2020/${week}?key=${keys.sportsDataNCAAF}`);
};