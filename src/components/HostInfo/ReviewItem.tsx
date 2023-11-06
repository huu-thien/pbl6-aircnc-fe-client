import StarIcon from '@mui/icons-material/Star';

interface PropsType {
  content: string;
  reviewerAvatarUrl: string;
  reviewerName: string;
  reviewTime: string;
  rating: number;
}

const ReviewItem = ({ content, reviewerAvatarUrl, reviewerName, reviewTime, rating }: PropsType) => {
  const yellowStars = Math.round(rating); // Số ngôi sao màu vàng
  const grayStars = 5 - yellowStars; // Số ngôi sao màu xám
  const yellowStarArray = Array(yellowStars).fill('yellow');
  const grayStarArray = Array(grayStars).fill('gray');

  return (
    <div className='shadow-md p-4 rounded-lg'>
      <div className='m-2'>
        <div className='flex gap-4 items-center'>
          <img src={reviewerAvatarUrl} alt={reviewerName} className='w-[70px] h-[70px] rounded-full' />
          <div className=''>
            <p className='font-semibold pb-2'>{reviewerName}</p>
            <p className='font-thin text-gray-400 text-xs'>{reviewTime}</p>
          </div>
        </div>
        <p className='font-light text-justify text-sm text-gray-500 pt-4 line-clamp-3 min-h-[76px]'>"{content}"</p>
      </div>
      <div className='flex'>
        {yellowStarArray.map((_, index) => (
          <StarIcon key={`review_${index}`} sx={{ color: '#feb207' }} />
        ))}
        {grayStarArray.map((_, index) => (
          <StarIcon key={`review_${index}`} sx={{ color: '#eaeaea' }} />
        ))}
      </div>
    </div>
  );
};

export default ReviewItem;
