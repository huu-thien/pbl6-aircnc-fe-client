export type FileObject = {
  name: string;
  type: string;
  size: number;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, utilities: readonly string[], theme: Theme) {
  return {
    fontWeight: utilities.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const listUtilities = [
  'Wifi',
  'Tv',
  'Kitchen',
  'AirConditioning',
  'LaptopFriendlyWorkspace',
  'HotWater',
  'Breakfast',
  'RoomService',
  'Bar',
  'SwimmingPool',
  'Gym',
  'Spa',
  'BeachFront',
  'MountainView',
  'LakeView',
  'SeaView',
  'LandmarkView',
  'WheelchairAccessible',
  'Elevator',
  'SecurityCamera',
  'CamperFriendly',
];

export { MenuProps, getStyles, listUtilities };
