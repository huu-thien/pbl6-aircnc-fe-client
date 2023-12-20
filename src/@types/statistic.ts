export interface StatisticType {
  bookingsCount: number;
  cancelledBookingAfterCheckInCount: number;
  cancelledBookingBeforeCheckInCount: number;
  cancelledBookingsCount: number;
  newPropertiesCount: number;
  newPropertyRequestsCount: number;
  propertyTypeStats: PropertyTypeStatsType[];
  top10Properties: Top10Properties[];
  totalProfit: number;
  totalRenevue: number;
}

export interface PropertyTypeStatsType {
  type: 'Room' | 'Resort' | 'Villa' | 'HomeStay' | 'House' | 'Hotel' | 'Cabin' | 'Apartment';
  totalBookings: number;
  totalRevenue: number;
}
export interface Top10Properties {
  id: number;
  title: string;
  bookingsCount: number;
}
