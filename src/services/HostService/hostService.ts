import http from '@/utils/http';

const controller = new AbortController();

export const getHostDetail = (hostId: number) => {
  return http.get(`api/hosts/${hostId}`, { signal: controller.signal });
};
