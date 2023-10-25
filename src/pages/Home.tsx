import FilterRoom from '@/components/HomePage/FilterRoom';
import RoomList from '@/components/HomePage/RoomList';
import { Divider } from '@mui/material';

const Home = () => {
  return (
    <div className='py-10'>
      <FilterRoom />
      <Divider />
      <RoomList />
    </div>
  );
};

export default Home;
