import axios from 'axios';
const controller = new AbortController();
export const getAllBanks = () => {
  return axios.get(`https://api.vietqr.io/v2/banks`, {
    signal: controller.signal,
  });
};
