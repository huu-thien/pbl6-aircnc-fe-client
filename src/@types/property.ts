export interface PropertyType {
  id: number;
  type: string;
  bedCount: number;
  bathroomCount: number;
  maxAdultCount: number;
  maxChildCount: number;
  hostId: number;
  hostName: string;
  rating: number;
  numberOfReviews: number;
  title: string;
  description: string;
  pricePerNight: number;
  propertyImages: PropertyImage[];
  propertyUtilities: PropertyUtilitiesType[];
  rejectionReason: string | null;
  status: string;
}

export interface PropertyImage {
  id: number;
  url: string;
  propertyId: number;
}

export interface PropertyUtilitiesType {
  [key: string]: boolean | number;
  isAirConditioning: boolean;
  isBar: boolean;
  isBeachFront: boolean;
  isBreakfast: boolean;
  isCamperFriendly: boolean;
  isElevator: boolean;
  isGym: boolean;
  isHotWater: boolean;
  isKitchen: boolean;
  isLakeView: boolean;
  isLandmarkView: boolean;
  isLaptopFriendlyWorkspace: boolean;
  isMountainView: boolean;
  isRoomService: boolean;
  isSeaView: boolean;
  isSecurityCamera: boolean;
  isSpa: boolean;
  isSwimmingPool: boolean;
  isTv: boolean;
  isWheelchairAccessible: boolean;
  isWifi: boolean;
  propertyId: number;
}

export interface PropertyReview {
  accuracy: number;
  averageRating: number;
  checkIn: number;
  cleanliness: number;
  communication: number;
  content: string;
  guestAvatarUrl: string;
  guestId: number;
  guestName: number;
  id: number;
  location: number;
  propertyId: number;
  reviewTime: string;
  value: number;
}
export interface PropertyFilterParams {
  [key: string]: number | undefined | string | string[];
  Type: string[] | undefined;
  City: string | undefined;
  CheckInDate: string | undefined;
  CheckOutDate: string | undefined;
  MinPrice: number | undefined;
  MaxPrice: number | undefined;
  AdultCount: number | undefined;
  ChildCount: number | undefined;
  Search: string | undefined;
  PageIndex: number;  
  TotalPages: number ;
}
