import { PropertyUtilitiesType } from '@/@types/property';

const MatchingUtilities = (input: string[]): Omit<PropertyUtilitiesType, 'propertyId'> => {
  const propertyUtilities: Omit<PropertyUtilitiesType, 'propertyId'> = {
    isWifi: false,
    isTv: false,
    isKitchen: false,
    isAirConditioning: false,
    isLaptopFriendlyWorkspace: false,
    isHotWater: false,
    isBreakfast: false,
    isRoomService: false,
    isBar: false,
    isSwimmingPool: false,
    isGym: false,
    isSpa: false,
    isBeachFront: false,
    isMountainView: false,
    isLakeView: false,
    isSeaView: false,
    isLandmarkView: false,
    isWheelchairAccessible: false,
    isElevator: false,
    isSecurityCamera: false,
    isCamperFriendly: false,
  };

  input.forEach((item) => {
    if (Object.keys(propertyUtilities).includes(`is${item}`)) {
      propertyUtilities[`is${item}`] = true;
    }
  });
  return propertyUtilities;
};
export default MatchingUtilities;
