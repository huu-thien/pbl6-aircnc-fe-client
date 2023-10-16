import InformationRoomAndPolicy from '@/components/BecomeHost/InformationRoomAndPolicy';
import Introduce from '@/components/BecomeHost/Introduce';
import { Navigate } from 'react-router-dom';

const BecomeHost = () => {
  const user = true;
  return (
    <div>
      <div>
        {user ? (
          <div className='max-w-7xl mx-auto w-full p-4'>
            <Introduce />
            <InformationRoomAndPolicy />
          </div>
        ) : (
          <Navigate to='/authenticate' />
        )}
      </div>
    </div>
  );
};
export default BecomeHost;
