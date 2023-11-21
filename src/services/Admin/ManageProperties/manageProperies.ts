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
