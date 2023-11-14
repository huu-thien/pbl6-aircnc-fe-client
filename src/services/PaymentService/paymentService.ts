import { VNPayHookUrlType } from '@/@types/booking';
import http from '@/utils/http';

const controller = new AbortController();

export const postCreatepayment = (body: { bookingId: number; bankCode: string }) => {
  return http.post('api/payment/create-payment', body, { signal: controller.signal });
};
export const postVNPayHookUrl = (body: VNPayHookUrlType) => {
  return http.post(`api/payment/vnpay-hook-url`, body, { signal: controller.signal });
}
