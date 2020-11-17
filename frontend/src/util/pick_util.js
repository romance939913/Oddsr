import axios from 'axios';

export const addPick = (pick) => {
    return axios.post(`/api/picks/new-pick/${pick.capperId}`, pick);
};