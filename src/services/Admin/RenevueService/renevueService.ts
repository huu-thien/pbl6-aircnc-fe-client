import http from '@/utils/http';

const controller = new AbortController();
export const getStatistics = (dateStart: string, dateEnd: string) => {
  if(dateStart && dateEnd) {
    return http.get(`api/statistics/?From=${dateStart}&To=${dateEnd}`, { signal: controller.signal });
  }
  return http.get(`api/statistics`, { signal: controller.signal });
};
