// import { useTheme } from '@mui/material/styles';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    // label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    // label: 'Bird',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    // label: 'Bali, Indonesia',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    // label: 'Goč, Serbia',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const FavoriteRoomItem = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className='shadow-md p-2 rounded-lg mx-auto'>
      <Box sx={{ maxWidth: 350 }}>
        <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          {images.map((step, index) => (
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
                  src={step.imgPath}
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
            <Link to='/detail-room'>
              <h2 className='text-lg font-semibold hover:text-cyan-800'>Hà Nội, Việt Nam</h2>
            </Link>
            <span>
              <StarIcon sx={{ mr: 1, color: '#feb207' }} />
              4.93
            </span>
          </div>
          <div className='flex justify-between py-3'>
            <p className='text-gray-600'>$200 / đêm</p>
            <p>
              <Link to='/review' className='text-cyan-700'>
                Review (123)
              </Link>
            </p>
          </div>
          <div className='cursor-pointer'>
            {isFavorite ? (
              <FavoriteBorderIcon sx={{ color: '#257b9a' }} onClick={toggleFavorite} />
            ) : (
              <FavoriteIcon sx={{ color: '#EE0000	' }} onClick={toggleFavorite} />
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default FavoriteRoomItem;
