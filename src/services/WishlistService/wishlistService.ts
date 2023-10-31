import http from '@/utils/http';

const controller = new AbortController();

export const getWishlistProperty = (page: number) => {
  return http.get(`api/wishlists?PageIndex=${page}&PageSize=6`, { signal: controller.signal });
};
export const postWishlistProperty = (propertyId: number) => {
  return http.post(`api/wishlists/properties/${propertyId}`, { signal: controller.signal });
};
export const deleteWishlistProperty = (propertyId: number) => {
  return http.delete(`api/wishlists/properties/${propertyId}`, { signal: controller.signal });
};
