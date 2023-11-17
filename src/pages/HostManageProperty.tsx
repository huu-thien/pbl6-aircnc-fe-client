import { getHostIdByUserIdApi } from '@/services/HostService/hostService';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import PropertyList from '@/components/HostManageProperty/PropertyList';
import { HostInfoType } from '@/@types/host';
import { Button } from '@mui/material';

const HostManageProperty = () => {
  const userLoginId = useSelector((state: RootState) => state.auth.user?.id);

  const [hostInfo, setHostInfo] = useState<HostInfoType | null>(null);

  useEffect(() => {
    if (userLoginId) {
      getHostIdByUserId(userLoginId);
    }
  }, [userLoginId]);

  const getHostIdByUserId = async (userId: number) => {
    try {
      const response = await getHostIdByUserIdApi(userId);
      // console.log(response);
      if (response && response.status === 200) {
        setHostInfo(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='max-w-7xl mx-auto w-full py-8 px-6 lg:px-0'>
      <div className='flex item-center justify-between pb-4'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link className='hover:underline hover:text-cyan-600' to='/'>
            Trang chủ
          </Link>
          <p color=''>Quản lý phòng cho thuê</p>
        </Breadcrumbs>
        <Link to='/become-host'>
          <Button variant='contained'>Thêm phòng mới</Button>
        </Link>
      </div>
      {hostInfo && <PropertyList hostId={hostInfo?.id} />}
    </div>
  );
};

export default HostManageProperty;
