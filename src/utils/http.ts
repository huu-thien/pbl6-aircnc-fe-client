import axios, { AxiosInstance } from 'axios';
import autoRefreshToken from './autoRefreshToken';
import { redirect } from 'react-router-dom';

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
        if (error.response.status === 401) {
          console.log('Acesstolen het han', refreshTokenRequest);
          localStorage.clear();
          redirect('/authenticate');
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : autoRefreshToken().finally(() => {
                // if (refreshTokenRequest !== null) {
                //   console.log('hehe');
                //   localStorage.clear();
                //   redirect('/authenticate');
                // }
                refreshTokenRequest = null;
              });
          // console.log(refreshTokenRequest);
          return refreshTokenRequest
            .then((accessToken: string) => {
              console.log('hehehehe');
              error.response.config.Authorization = `Bearer ${JSON.parse(accessToken)}`;
              console.log('accessToken', accessToken);
              return this.instance(error.response.config);
            })
            .catch((errorRefreshToken) => {
              console.log('Refresh token het han ! or Chua dang nhap');
              localStorage.clear();
              throw errorRefreshToken;
            });
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
