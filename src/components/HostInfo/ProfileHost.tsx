import { Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
const informationHost = {
  src: 'https://astral.vn/wp-content/uploads/2023/05/anh-gai-xinh-lo-clip-169.jpg',
  alt: 'image of host',
  name: 'Kim Ngọc',
  numberOfReivews: '7',
  joiningDate: '02/02/2022',
};
const ProfileHost = () => {
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
        <div className=''>
          <img src={informationHost.src} alt={informationHost.alt} className='w-[120px] h-[120px] rounded-full' />
          <p className='text-center pt-4 text-xl text-cyan-700'>{informationHost.name}</p>
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-md text-gray-600'>Đánh giá: {informationHost.numberOfReivews}</p>
          <Divider />
          <p className='text-md text-gray-600'>
            <span>Rating: 4.93 </span>
            <StarIcon sx={{ color: '#feb207' }} />
          </p>
          <Divider />
          <p className='text-gray-600'>Bắt đầu tham gia: {informationHost.joiningDate}</p>
        </div>
      </div>
    </Box>
  );
};

export default ProfileHost;
