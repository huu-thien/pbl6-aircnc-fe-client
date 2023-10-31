import FilterRoom from '@/components/HomePage/FilterRoom';
import RoomList from '@/components/HomePage/RoomList';
import { Divider } from '@mui/material';

const Home = () => {
  return (
    <div className='py-10 min-h-[600px]'>
      <FilterRoom />
      <Divider />
      <RoomList />
    </div>
  );
};

export default Home;
