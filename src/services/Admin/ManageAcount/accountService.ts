import http from '@/utils/http';

const controller = new AbortController();

export const getAllAccountsApi = (page: number) => {
  return http.get(`api/users?PageIndex=${page}&PageSize=5&IsDescending=true`, { signal: controller.signal });
};
