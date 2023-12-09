import { VNPayHookUrlType } from '@/@types/booking';
import http from '@/utils/http';

const controller = new AbortController();

export const postCreatepayment = (body: { bookingId: number; bankCode: string }) => {
  return http.post('api/payment/create-payment', body, { signal: controller.signal });
};
export const postVNPayHookUrl = (body: VNPayHookUrlType) => {
  return http.post(`api/payment/vnpay-hook-url`, body, { signal: controller.signal });
};

// Host Payment
export const getAllHostPayment = (page: number, status: string) => {
  if (status === 'All') {
    return http.get(`api/host-payment?PageIndex=${page}&PageSize=5&IsDescending=true`, { signal: controller.signal });
  }
  return http.get(`api/host-payment?Status=${status}&PageIndex=${page}&PageSize=5&IsDescending=true`, {
    signal: controller.signal,
  });
};
export const postPaymentForHost = (hostPaymentId: number) => {
  return http.post(`api/host-payment/${hostPaymentId}`, { signal: controller.signal });
};
