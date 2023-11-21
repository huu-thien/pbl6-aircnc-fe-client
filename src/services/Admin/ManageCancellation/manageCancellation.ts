import { CancellationInfoType } from '@/@types/manageCancellation';
import http from '@/utils/http';

const controller = new AbortController();

export const getAllCancellations = (page: number, status: string) => {
  if(status === 'All') {
    return http.get(`api/cancellations?OrderBy=Id&PageIndex=${page}&PageSize=5&IsDescending=true`, {
      signal: controller.signal,
    });
  }
  return http.get(`api/cancellations?OrderBy=Id&Status=${status}&PageIndex=${page}&PageSize=5&IsDescending=true`, {
    signal: controller.signal,
  });
};

export const postAcceptCancellations = (cancellationTicketId: number, cancelInfo: CancellationInfoType) => {
  return http.post(`api/cancellations/${cancellationTicketId}/accept`, cancelInfo, { signal: controller.signal });
};

export const postRejectedCancellations = (
  cancellationTicketId: number,
  cancelInfo: Omit<CancellationInfoType, 'refundAmount' | 'chargeAmount'>,
) => {
  return http.post(`api/cancellations/${cancellationTicketId}/reject`, cancelInfo, { signal: controller.signal });
};
