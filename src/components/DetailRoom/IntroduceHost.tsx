import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { getHostDetail } from '@/services/HostService/hostService';
import { useEffect, useState } from 'react';
import { HostType } from '@/@types/host';

interface Propstype {
  hostId: number;
}
const IntroduceHost = ({ hostId }: Propstype) => {
  const [hostInfo, setHostInfo] = useState<HostType | null>(null);
  useEffect(() => {
    getHostInfoApi(hostId);
  }, [hostId]);

  const getHostInfoApi = async (hostId: number) => {
    const response = await getHostDetail(hostId);
    if (response && response.status === 200) {
      setHostInfo(response.data);
    }
    console.log(response);
  };
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col items-center'>
          <Avatar alt='Travis Howard' src={hostInfo?.avatarUrl} sx={{ width: 70, height: 70 }} />
          <p className='pt-2'>Host {hostInfo?.name}</p>
        </div>
        <Button variant='contained' sx={{ height: 50 }}>
          <Link to='/host'>Liên hệ với chủ nhà</Link>
        </Button>
      </div>
      <p className='font-thin text-gray-500 pt-2 italic'>{hostInfo?.introduction}</p>
      <div className='flex text-gray-800'>
        <div className='pt-4 pr-4 '>
          <RateReviewIcon sx={{ color: '#743de3' }} />
          <span className='pl-2'>{hostInfo?.numberOfReviews} Đánh giá</span>
        </div>
        <Divider orientation="vertical"/>
        <div className='pt-4'>
          <StarIcon sx={{ color: '#feb207' }} />
          <span className='pl-2'>{hostInfo?.rating.toFixed(2)} Điểm rating</span>
        </div>
      </div>
    </div>
  );
};

export default IntroduceHost;
