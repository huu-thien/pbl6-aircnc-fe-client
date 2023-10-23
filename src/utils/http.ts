import axios, { AxiosInstance } from 'axios';
import autoRefreshToken from './autoRefreshToken';

let refreshTokenRequest: any = null;

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://pbl6.whitemage.tech/',
      timeout: 10000,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    this.instance.interceptors.response.use(
      (config) => config,
      (error) => {
        console.log('Loi api', error);
        if (error.response.status === 401 && error.response.data.name === 'EXPIRED_ACCESS_TOKEN') {
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : autoRefreshToken().finally(() => {
                refreshTokenRequest = null;
              });
          return refreshTokenRequest
            .then((accessToken: string) => {
              error.response.config.Authorization = `Bearer ${JSON.parse(accessToken)}`;
              return this.instance(error.response.config);
            })
            .catch((error) => {
              throw error;
            });
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
