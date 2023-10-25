import { Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import RateReviewIcon from '@mui/icons-material/RateReview';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';

interface Propstype {
  avatarUrl: string;
  joinedAt: string;
  name: string;
  numberOfReviews: number;
  rating: number;
}
const ProfileHost = ({ avatarUrl, joinedAt, name, numberOfReviews, rating }: Propstype) => {
  // const date = new Date(joinedAt);
  return (
    <Box
      sx={{
        minWidth: 350,
        height: `100%`,
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
      }}
    >
      <div className='flex gap-5'>
        <div className='min-w-[150px] flex flex-col items-center'>
          <img src={avatarUrl} alt={name} className='w-[120px] h-[120px] rounded-full' />
          <p className='text-center pt-4 text-xl text-cyan-700'>{name}</p>
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-md text-gray-600'>
            <RateReviewIcon sx={{ color: '#743de3', mr: 1 }} />
            Đánh giá: {numberOfReviews}
          </p>
          <Divider />
          <p className='text-md text-gray-600'>
            <StarIcon sx={{ color: '#feb207', mr: 1 }} />
            <span>Điểm: {rating.toFixed(2)} </span>
          </p>
          <Divider />
          <p className='text-gray-600'>Ngày tham gia: {formatDateTime(joinedAt)}</p>
        </div>
      </div>
    </Box>
  );
};

export default ProfileHost;
