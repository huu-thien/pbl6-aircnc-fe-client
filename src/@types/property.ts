export interface PropertyType {
  id: number;
  type: string;
  bedCount: number;
  bathroomCount: number;
  maxAdultCount: number;
  maxChildCount: number;
  hostId: number;
  hostName: string;
  rating: number
  numberOfReviews: number;
  title: string;
  description: string;
  pricePerNight: number;
  propertyImages: PropertyImage[];
  propertyUtilities: string[];
  rejectionReason: string | null;
  status: string;
}

export interface PropertyImage {
  id: number;
  url: string;
  propertyId: number;
}
