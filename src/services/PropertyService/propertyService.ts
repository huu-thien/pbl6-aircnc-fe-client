import http from '@/utils/http';

const controller = new AbortController();

export const getListProperty = () => {
  return http.get('api/properties', { signal: controller.signal });
};

export const getPropertyDetail = (propertyId: number) => {
  return http.get(`api/properties/${propertyId}`, { signal: controller.signal });
};
