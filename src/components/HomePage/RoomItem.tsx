import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { PropertyImage } from '@/@types/property';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { deleteWishlistProperty, postWishlistProperty } from '@/services/WishlistService/wishlistService';

import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '@/store';
import { saveLogout } from '@/redux-toolkit/auth.slice';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
interface Propstype {
  id: number;
  title: string;
  propertyImage: PropertyImage[];
  pricePerNight: number;
  numberOfReviews: number;
  rating: number;
  isFavorite: boolean;
}

const RoomItem = ({ id, title, propertyImage, pricePerNight, numberOfReviews, rating, isFavorite }: Propstype) => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const [showFavorite, setShowFavorite] = useState<boolean>(isFavorite);
  const maxSteps = propertyImage.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  // add wish list
  const handleAddWishlistProperty = async (propertyId: number) => {
    try {
      const response = await postWishlistProperty(propertyId);
      if (response && response.status === 200) {
        toast.success('Thêm vào wishist thành công !');
        setShowFavorite(!showFavorite);
      }
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(saveLogout());
        toast.error('Đăng nhập để thêm wishlist');
      }
      console.log(err);
    }
  };
  // Remove wish list
  const handleRemoveWishlistProperty = async (propertyId: number) => {
    try {
      const response = await deleteWishlistProperty(propertyId);
      if (response && response.status === 200) {
        toast.success('Xóa wishist thành công !');
        setShowFavorite(!showFavorite);
        console.log(response);
      }
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(saveLogout());
        toast.error('Đăng nhập để xóa wishlist');
      }
      console.log(err);
    }
  };
  return (
    <div className='shadow-md p-2 rounded-lg mx-auto'>
      <Box sx={{ maxWidth: 350 }}>
        <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          {propertyImage.map((step, index) => (
            <div key={`image-${index}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component='img'
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.url}
                  // alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
        <div className='p-4'>
          <div className='flex justify-between'>
            <Link to={`/detail-room/${id}`}>
              <h2 className='text-md text-[#3c3834] font-semibold hover:text-cyan-800 line-clamp-2 pr-6'>{title}</h2>
            </Link>
            <span className='flex'>
              <StarIcon sx={{ mr: 1, color: '#feb207' }} />
              {rating.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between py-3'>
            <p className='text-gray-600'>{formatMoney(pricePerNight)} vnd/đêm</p>
            <p>
              <Link to='/review' className='text-cyan-700'>
                Review ({numberOfReviews})
              </Link>
            </p>
          </div>
          <div className='cursor-pointer'>
            {showFavorite ? (
              <IconButton aria-label='add-wishlist' onClick={() => handleRemoveWishlistProperty(id)}>
                <FavoriteIcon sx={{ color: '#c92327' }} />
              </IconButton>
            ) : (
              <IconButton aria-label='add-wishlist' onClick={() => handleAddWishlistProperty(id)}>
                <FavoriteBorderIcon sx={{ color: '#257b9a' }} />
              </IconButton>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default RoomItem;
