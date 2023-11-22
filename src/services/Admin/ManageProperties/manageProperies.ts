import http from '@/utils/http';

const controller = new AbortController();

export const getAllPropertysApi = (page: number, status: string) => {
  if (status === 'All') {
    return http.get(`api/properties?OrderBy=Id&PageIndex=${page}&PageSize=4&IsDescending=true`, {
      signal: controller.signal,
    });
  }
  return http.get(`api/properties?OrderBy=Id&Status=${status}&PageIndex=${page}&PageSize=4&IsDescending=true`, {
    signal: controller.signal,
  });
};

export const postConfirmProperty = (propertyId: number) => {
  return http.post(`api/properties/${propertyId}/confirm`, { signal: controller.signal });
};

export const postRejectdProperty = (propertyId: number, reason: { reason: string }) => {
  return http.post(`api/properties/${propertyId}/reject`, reason, { signal: controller.signal });
};
