export interface ReviewHostType {
  content: string;
  id: number;
  rating: number;
  reviewTime: string;
  reviewerAvatarUrl: string;
  reviewerId: number;
  reviewerName: string;
  userId: number;
}
export interface ReviewGuestType {
  content: string;
  id: number;
  rating: number;
  reviewTime: string;
  reviewerAvatarUrl: string;
  reviewerId: number;
  reviewerName: string;
  userId: number;
  hostId: number;
}
