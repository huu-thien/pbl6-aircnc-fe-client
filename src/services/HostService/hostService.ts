import http from '@/utils/http';

const controller = new AbortController();

export const getHostDetail = (hostId: number) => {
  return http.get(`api/hosts/${hostId}`, { signal: controller.signal });
};

export const getHostReviews = (hostId: number) => {
  return http.get(`api/reviews/host/${hostId}`, { signal: controller.signal });
};
export const getHostProperties = (hostId: number, page: number) => {
  return http.get(`api/properties/host/${hostId}?PageIndex=${page}&PageSize=2`, { signal: controller.signal });
};
