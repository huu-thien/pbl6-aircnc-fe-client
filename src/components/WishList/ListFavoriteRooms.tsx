import FavoriteRoomItem from './FavoriteRoomItem';

const ListFavoriteRooms = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5'>
      <FavoriteRoomItem />
      <FavoriteRoomItem />
      <FavoriteRoomItem />
      <FavoriteRoomItem />
    </div>
  );
};

export default ListFavoriteRooms;
