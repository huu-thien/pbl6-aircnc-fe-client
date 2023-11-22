import { ContentReviewGuestType } from "@/@types/guest";
import http from "@/utils/http";

const controller = new AbortController();
export const getGuestDetail = (guestId: number) => {
    return http.get(`api/guests/${guestId}`, { signal: controller.signal });
};
export const getGuestReviews = (guestId: number, page: number) => {
    return http.get(`api/reviews/guest/${guestId}?OrderBy=CreatedAt&PageIndex=${page}&PageSize=3&IsDescending=true`, {
      signal: controller.signal,
    });
};
export const postCreateReviewGuest = (guestId: number, body: ContentReviewGuestType) => {
    return http.post(`api/reviews/guest/${guestId}`, body, { signal: controller.signal });
};
// Delete Review
export const deleteReviewGuest = (reviewId: number) => {
  return http.delete(`api/reviews/guest/${reviewId}`, { signal: controller.signal });
};

export const getCheckGuestStayedInPropertyOfHost = (guestId: number) => {
  return http.get(`api/guests/${guestId}/is-stayed`, { signal: controller.signal });
};