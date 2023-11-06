import { HostType } from '@/@types/host';
import CustomerReview from '@/components/HostInfo/CustomerReview';
import IntroduceOfHost from '@/components/HostInfo/IntroduceOfHost';
import ListOfRoomsForRent from '@/components/HostInfo/ListRoomsForRent';
import ProfileHost from '@/components/HostInfo/ProfileHost';
import { getHostDetail } from '@/services/HostService/hostService';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const HostInfo = () => {
  const { id } = useParams();
  const [hostInfo, setHostInfo] = useState<HostType | null>(null);
  useEffect(() => {
    getHostInfoApi(Number(id));
  }, [id]);

  const getHostInfoApi = async (hostId: number) => {
    const response = await getHostDetail(hostId);
    if (response && response.status === 200) {
      setHostInfo(response.data);
    }
  };
  return (
    <div className='max-w-7xl mx-auto w-full px-4 py-8 flex gap-12'>
      {hostInfo && (
        <ProfileHost
          avatarUrl={hostInfo.avatarUrl}
          joinedAt={hostInfo.joinedAt}
          name={hostInfo.name}
          numberOfReviews={hostInfo.numberOfReviews}
          rating={hostInfo.rating}
        />
      )}
      {hostInfo && (
        <div className='grid'>
          <IntroduceOfHost
            name={hostInfo.name}
            introduction={hostInfo.introduction}
            address={hostInfo.address}
            city={hostInfo.city}
          />
          <Divider />
          <CustomerReview hostId={Number(id) as number} />
          <Divider />
          <ListOfRoomsForRent hostId={Number(id) as number} />
        </div>
      )}
    </div>
  );
};

export default HostInfo;
