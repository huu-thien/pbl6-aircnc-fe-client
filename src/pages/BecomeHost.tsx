
import InformationRoomAndPolicy from '@/components/BecomeHost/InformationRoomAndPolicy';
import ImageListRoom from '@/components/BecomeHost/ImageListRoom';
import Introduce from '@/components/BecomeHost/Introduce';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const BecomeHost = () => {
  const user = true;
  return (
    <div>
      <div>{user ? 

        <div className='m-10'>
          <Introduce/>
          <InformationRoomAndPolicy />
          <ImageListRoom/>
          <div className='mt-10 text-center'><Button variant="contained" color='primary' >Bắt đầu cho thuê</Button></div>
        </div> 

      : <Navigate to="/authenticate" />}
      </div> 
    </div>
  );
};
export default BecomeHost;
