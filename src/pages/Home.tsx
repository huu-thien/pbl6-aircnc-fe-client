import FilterRoom from '@/components/HomePage/FilterRoom';
import RoomList from '@/components/HomePage/RoomList';
import { Button, Divider } from '@mui/material';

const Home = () => {
  return (
    <div className="py-10">
      <FilterRoom />
      <div className="flex justify-center pb-4">
        <Button sx={{ m: 'auto' }} variant="contained" size="large">
          Search
        </Button>
      </div>
      <Divider />
      <RoomList />
    </div>
  );
};

export default Home;
