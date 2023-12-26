import { CancellationInfoType } from '@/@types/manageCancellation';
import http from '@/utils/http';
// import { boolean } from 'yup';

const controller = new AbortController();

export const getAllCancellations = (page: number, canceller: string) => {
  if(canceller === 'All') {
    return http.get(`api/cancellations?OrderBy=Id&PageIndex=${page}&PageSize=5&IsDescending=true`, {
      signal: controller.signal,
    });
  }
  const cancellerBoolean = canceller.toLowerCase() === 'true';
  return http.get(`api/cancellations?OrderBy=Id&IsGuest=${cancellerBoolean}&PageIndex=${page}&PageSize=5&IsDescending=true`, {
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
