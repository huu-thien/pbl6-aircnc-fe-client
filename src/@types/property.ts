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
  isFavorite: boolean;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
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
  TotalPages: number;
}

export interface HostInput {
  address: string;
  description: string;
  feeCleaning: number;
  listImage: File[];
  policy: 'flexible' | 'strict';
  pricePerNight: number;
  quantityBathRooms: number;
  quantityBed: number;
  quantityBedRooms: number;
  quantityChild: number;
  quantityOld: number;
  roomName: string;
  typeRoom: string;
  utilities: string[];
}
export interface PropertyInfoPost {
  type: 'Room' | 'House' | 'Apartment' | 'Ralph Hubbard' | 'Villa' | 'HomeStay' | 'Miriam Wagner' | 'Hotel' | 'Cabin';
  bedCount: number;
  bedroomCount: number;
  bathroomCount: number;
  maxAdultCount: number;
  maxChildCount: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  pricePerNight: number;
  cleaningFee: number;
  cancellationPolicyType: 'Flexible' | 'Strict';
  propertyImages: { url: string }[];
  propertyUtilities: [
    {
      isWifi: boolean;
      isTv: boolean;
      isKitchen: boolean;
      isAirConditioning: boolean;
      isLaptopFriendlyWorkspace: boolean;
      isHotWater: boolean;
      isBreakfast: boolean;
      isRoomService: boolean;
      isBar: boolean;
      isSwimmingPool: boolean;
      isGym: boolean;
      isSpa: boolean;
      isBeachFront: boolean;
      isMountainView: boolean;
      isLakeView: boolean;
      isSeaView: boolean;
      isLandmarkView: boolean;
      isWheelchairAccessible: boolean;
      isElevator: boolean;
      isSecurityCamera: boolean;
      isCamperFriendly: boolean;
    },
  ];
  status: 'Pending';
  rejectionReason: string;
}
