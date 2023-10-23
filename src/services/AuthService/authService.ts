import { LoginType, LogoutType } from '@/@types/user';
import { RegisterData } from '@/shared/types';
import http from '@/utils/http';

const controller = new AbortController();

export const postRegister = (body: Omit<RegisterData, 'confirmPassword'>) => {
  return http.post('api/auth/sign-up', body, { signal: controller.signal });
};

export const postLogin = (body: LoginType) => {
  return http.post('api/auth/user/log-in', body, { signal: controller.signal });
};

export const postLogout = (body: LogoutType) => {
  return http.post('api/auth/refresh-token/revoke', body, { signal: controller.signal });
};
export const postLoginGoogle = (body: { accessToken: string }) => {
  return http.post('api/auth/google-login', body, { signal: controller.signal });
};

export const postRefreshToken = (body: { refreshToken: string }) => {
  return http.post('api/auth/refresh-token', body, { signal: controller.signal });
};
