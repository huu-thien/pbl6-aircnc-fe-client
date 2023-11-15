import { ContentReviewHostType } from '@/@types/host';
import http from '@/utils/http';

const controller = new AbortController();

export const getHostDetail = (hostId: number) => {
  return http.get(`api/hosts/${hostId}`, { signal: controller.signal });
};

export const getHostReviews = (hostId: number, page: number) => {
  return http.get(`api/reviews/host/${hostId}?OrderBy=CreatedAt&PageIndex=${page}&PageSize=3&IsDescending=true`, {
    signal: controller.signal,
  });
};
export const getHostProperties = (hostId: number, page: number) => {
  return http.get(`api/properties/host/${hostId}?PageIndex=${page}&PageSize=2`, { signal: controller.signal });
};

// Review
// Create review hosst
export const postCreateReviewHost = (hostId: number, body: ContentReviewHostType) => {
  return http.post(`api/reviews/host/${hostId}`, body, { signal: controller.signal });
};
// Delete Review
export const deleteReviewHost = (reviewId: number) => {
  return http.delete(`api/reviews/host/${reviewId}`, { signal: controller.signal });
};
