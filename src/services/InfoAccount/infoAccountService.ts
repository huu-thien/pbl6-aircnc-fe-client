import { InfoAccountPut } from '@/@types/account';
import http from '@/utils/http';

const controller = new AbortController();

export const getInfoAccount = (id: number) => {
  return http.get(`api/users/${id}`, { signal: controller.signal });
};
export const updateInfoAccount = (id: number, body: InfoAccountPut) => {
  return http.put(`api/users/${id}`, body, { signal: controller.signal });
};
// Create avatar
export const postAvatarUrl = (body: FormData) => {
  return http.post(`api/attachments/avatar-v2`, body, { signal: controller.signal });
};
