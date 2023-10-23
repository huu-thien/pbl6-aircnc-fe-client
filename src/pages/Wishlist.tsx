import ListFavoriteRooms from '@/components/WishList/ListFavoriteRooms';
import { Navigate } from 'react-router-dom';

const WishList = () => {
  const user = true;
  return (
    <div>
      <div>
        {user ? (
          <div className='max-w-7xl mx-auto w-full p-4'>
            <h1 className="text-center text-3xl text-cyan-700 pb-4">Danh Sách Phòng Yêu Thích</h1>
            <ListFavoriteRooms/>
          </div>
        ) : <Navigate to='/authenticate' />}</div>
    </div>
  );
};

export default WishList;
