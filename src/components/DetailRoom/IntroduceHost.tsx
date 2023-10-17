import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const numberOfHostReviews = 20;
const introduceOfHost =
  'Chúng tôi đã từng làm việc tại Marriott International trong nhiều năm và thích đi du lịch. Căn hộ EM Đà Nẵng là đứa con đầu lòng của chúng tôi để tận dụng tối đa trải nghiệm cho thời gian lưu trú của bạn và làm cho bạn cảm thấy như ở nhà với mức sống cao.';
const IntroduceHost = () => {
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col items-center'>
          <Avatar
            alt='Travis Howard'
            src='https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png'
            sx={{ width: 70, height: 70 }}
          />
          <p className='pt-2'>Chủ nhà NHS</p>
        </div>
        <Button variant='contained' sx={{ height: 50 }}>
          <Link to='/host'>Liên hệ với chủ nhà</Link>
        </Button>
      </div>
      <p className='font-thin text-gray-500 pt-2 italic'>{introduceOfHost}</p>
      <div className='pt-4'>
        <StarIcon sx={{ color: '#feb207' }} />
        <span className='pl-2'>{numberOfHostReviews} Đánh giá</span>
      </div>
    </div>
  );
};

export default IntroduceHost;
