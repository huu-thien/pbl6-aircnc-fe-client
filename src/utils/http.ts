import axios, { AxiosInstance } from 'axios';
import autoRefreshToken from './autoRefreshToken';
// import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// let this.refreshTokenRequest: any = null;

export const LocalStorageEventTarget = new EventTarget();

class Http {
  instance: AxiosInstance;

  private refreshTokenRequest: Promise<string> | null = null;
  constructor() {
    this.instance = axios.create({
      // baseURL: import.meta.env.BACKEND_API_URL,
      // import.meta.env.VITE_BACKEND_API_URL
      // baseURL: 'https://pbl6.whitemage.tech/',
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
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
        if (error.response.status !== 401) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // const data: any | undefined = error.response.data;
          // const message = data.message || error.message;
          // toast.error(message);
        }

        // Lỗi Unauthorized có rất nhiều trường hợp: token ko đúng, ko truyền token, token hết hạn
        if (error.response.status === 401) {
          console.log('Acesstolen het han', this.refreshTokenRequest);
          // localStorage.clear();
          // redirect('/authenticate');
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : autoRefreshToken().finally(() => {
                this.refreshTokenRequest = null;
              });
          return (
            this.refreshTokenRequest
              .then((accessToken: string) => {
                error.response.config.Authorization = `Bearer ${JSON.parse(accessToken)}`;
                console.log('accessToken', accessToken);
                return this.instance(error.response.config);
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((errorRefreshToken: any) => {
                console.log('Refresh token het han ! or Chua dang nhap');
                localStorage.clear();
                const clearLSEvent = new Event('clearLS');
                LocalStorageEventTarget.dispatchEvent(clearLSEvent);
                toast.error('Bạn đã hết phiên đăng nhập !');
                throw errorRefreshToken;
              })
          );
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
