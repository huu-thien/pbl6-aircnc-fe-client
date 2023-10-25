import http from '@/utils/http';

const controller = new AbortController();

export const getListProperty = (page: number) => {
  return http.get(`api/properties?PageIndex=${page}&PageSize=16`, { signal: controller.signal });
};

export const getPropertyDetail = (propertyId: number) => {
  return http.get(`api/properties/${propertyId}`, { signal: controller.signal });
};

export const getPropertyReview = (propertyId: number, page: number) => {
  return http.get(`api/reviews/property/${propertyId}?PageIndex=${page}&PageSize=4`, { signal: controller.signal });
};
