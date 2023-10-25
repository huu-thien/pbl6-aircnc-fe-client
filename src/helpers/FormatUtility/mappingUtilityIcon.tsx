import AirIcon from '@mui/icons-material/Air';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { ReactNode } from 'react';

interface MappingIcontype {
  [key: string]: ReactNode;
  isAirConditioning: ReactNode;
  isBar: ReactNode;
  isBeachFront: ReactNode;
  isBreakfast: ReactNode;
  isCamperFriendly: ReactNode;
  isElevator: ReactNode;
  isGym: ReactNode;
  isHotWater: ReactNode;
  isKitchen: ReactNode;
  isLakeView: ReactNode;
  isLandmarkView: ReactNode;
  isLaptopFriendlyWorkspace: ReactNode;
  isMountainView: ReactNode;
  isRoomService: ReactNode;
  isSeaView: ReactNode;
  isSecurityCamera: ReactNode;
  isSpa: ReactNode;
  isSwimmingPool: ReactNode;
  isTv: ReactNode;
  isWheelchairAccessible: ReactNode;
  isWifi: ReactNode;
}

import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import CabinIcon from '@mui/icons-material/Cabin';
import ElevatorIcon from '@mui/icons-material/Elevator';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotTubIcon from '@mui/icons-material/HotTub';
import CountertopsIcon from '@mui/icons-material/Countertops';
import KayakingIcon from '@mui/icons-material/Kayaking';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import LandscapeIcon from '@mui/icons-material/Landscape';
import BathroomIcon from '@mui/icons-material/Bathroom';
import SurfingIcon from '@mui/icons-material/Surfing';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShopIcon from '@mui/icons-material/Shop';
import PoolIcon from '@mui/icons-material/Pool';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import WifiIcon from '@mui/icons-material/Wifi';

export const iconMappings: MappingIcontype = {
  isAirConditioning: <AirIcon sx={{ color: '#1976d2' }} />,
  isBar: <LocalBarIcon sx={{ color: '#1976d2' }} />,
  isBeachFront: <BeachAccessIcon sx={{ color: '#1976d2' }} />,
  isBreakfast: <BreakfastDiningIcon sx={{ color: '#1976d2' }} />,
  isCamperFriendly: <CabinIcon sx={{ color: '#1976d2' }} />,
  isElevator: <ElevatorIcon sx={{ color: '#1976d2' }} />,
  isGym: <FitnessCenterIcon sx={{ color: '#1976d2' }} />,
  isHotWater: <HotTubIcon sx={{ color: '#1976d2' }} />,
  isKitchen: <CountertopsIcon sx={{ color: '#1976d2' }} />,
  isLakeView: <KayakingIcon sx={{ color: '#1976d2' }} />,
  isLandmarkView: <InsertPhotoIcon sx={{ color: '#1976d2' }} />,
  isLaptopFriendlyWorkspace: <LaptopChromebookIcon sx={{ color: '#1976d2' }} />,
  isMountainView: <LandscapeIcon sx={{ color: '#1976d2' }} />,
  isRoomService: <BathroomIcon sx={{ color: '#1976d2' }} />,
  isSeaView: <SurfingIcon sx={{ color: '#1976d2' }} />,
  isSecurityCamera: <CameraAltIcon sx={{ color: '#1976d2' }} />,
  isSpa: <ShopIcon sx={{ color: '#1976d2' }} />,
  isSwimmingPool: <PoolIcon sx={{ color: '#1976d2' }} />,
  isTv: <ConnectedTvIcon sx={{ color: '#1976d2' }} />,
  isWheelchairAccessible: <WheelchairPickupIcon sx={{ color: '#1976d2' }} />,
  isWifi: <WifiIcon sx={{ color: '#1976d2' }} />,
};
