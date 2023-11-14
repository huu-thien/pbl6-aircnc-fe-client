import InformationRoomAndPolicy from '@/components/BecomeHost/InformationRoomAndPolicy';
import Introduce from '@/components/BecomeHost/Introduce';
import { RootState } from '@/store';
import { Alert, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BecomeHost = () => {
  const userLogin = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <div className='max-w-7xl mx-auto w-full p-4'>
        <Introduce />
        {userLogin ? (
          <InformationRoomAndPolicy />
        ) : (
          <div className='flex items-center justify-center gap-12 py-6'>
            <Alert sx={{ fontSize: 15 }} severity='warning'>
              Bạn phải đăng nhập để thực hiện chức năng này !
            </Alert>
            <Button variant='contained'>
              <Link to='/authenticate'>Đăng nhập ngay</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default BecomeHost;
