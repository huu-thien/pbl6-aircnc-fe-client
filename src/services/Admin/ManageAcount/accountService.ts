import http from '@/utils/http';

const controller = new AbortController();

export const getAllAccountsApi = (page: number, isHostOnly: string) => {
  if (isHostOnly === 'All') {
    return http.get(`api/users?PageIndex=${page}&PageSize=5&IsDescending=true`, { signal: controller.signal });
  }
  return http.get(`api/users?PageIndex=${page}&PageSize=5&IsDescending=true&IsHostOnly=true`, { signal: controller.signal });
};
