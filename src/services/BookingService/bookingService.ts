import { RequestBookingType } from '@/@types/booking';
import http from '@/utils/http';

const controller = new AbortController();

// Get schedule booking of property
export const getScheduleBooking = (propertyId: number, fromDate: string, toDate: string) => {
  return http.get(`api/bookings/property/${propertyId}?fromDate=${fromDate}&toDate=${toDate}`, {
    signal: controller.signal,
  });
};
// Post Request booking

export const postRequestBooking = (body: RequestBookingType) => {
  return http.post(`api/bookings`, body, { signal: controller.signal });
};

// get list booking of guest
export const getListBookingGuest = (guestId: number) => {
  return http.get(`api/bookings/guest/${guestId}?OrderBy=Id&IsDescending=true`, { signal: controller.signal });
};
