import { PropertyInfoPost, ReviewPropertyType } from '@/@types/property';
import http from '@/utils/http';

const controller = new AbortController();

export const getListProperty = (page: number) => {
  return http.get(`api/properties?PageIndex=${page}&PageSize=16`, { signal: controller.signal });
};

export const getPropertyDetail = (propertyId: number) => {
  return http.get(`api/properties/${propertyId}`, { signal: controller.signal });
};

export const getPropertyReview = (propertyId: number, page: number) => {
  return http.get(
    `api/reviews/property/${propertyId}?PageIndex=${page}&PageSize=4&OrderBy=CreatedAt&IsDescending=true&PageSize=4`,
    { signal: controller.signal },
  );
};

// Get general score
export const getGeneralScore = (propertyId: number) => {
  return http.get(`api/reviews/property/${propertyId}/info`, { signal: controller.signal });
};

// Create image property
export const postImagePropertyUrl = (body: FormData) => {
  return http.post(`api/attachments/property-v2`, body, { signal: controller.signal });
};

// Create a property
export const postCreateProperty = (body: PropertyInfoPost) => {
  return http.post(`api/properties`, body, { signal: controller.signal });
};
// Create  Review Property
export const postCreateReviewProperty = (propertyId: number, body: ReviewPropertyType) => {
  return http.post(`api/reviews/property/${propertyId}`, body, { signal: controller.signal });
};
// Edit a property
export const putEditProperty = (propertyId: number, body: PropertyInfoPost) => {
  return http.put(`api/properties/${propertyId}`, body, { signal: controller.signal });
};
// Delete Review Property
export const deleteReviewProperty = (propertyId: number) => {
  return http.delete(`api/reviews/property/${propertyId}`, { signal: controller.signal });
};

export const getCheckGuestStayed = (propertyId: number) => {
  return http.get(`api/properties/${propertyId}/is-stayed`, { signal: controller.signal });
};
