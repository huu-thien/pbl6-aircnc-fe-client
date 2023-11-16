import axios from 'axios';

const controller = new AbortController();

export const getAddressResult = (address: number) => {
  return axios.get(
    `https://api.tomtom.com/search/2/geocode/${address}.json?storeResult=false&limit=10&key=twhbErEHIl2j8LeiaEZUD5bZWACgtIAo`,
    { signal: controller.signal },
  );
};
