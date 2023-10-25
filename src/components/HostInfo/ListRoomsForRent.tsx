import { getHostProperties } from '@/services/HostService/hostService';
import { ChangeEvent, useEffect, useState } from 'react';
import RoomItem from '../HomePage/RoomItem';
import { PropertyType } from '@/@types/property';
import { Pagination } from '@mui/material';

interface PropsType {
  hostId: number;
}

const ListRoomsForRent = ({ hostId }: PropsType) => {
  const [listRooms, setListRooms] = useState<PropertyType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    getListPropertyOfHost(hostId, currentPage);
  }, [hostId, currentPage]);

  const getListPropertyOfHost = async (hostId: number, page: number) => {
    const response = await getHostProperties(hostId, page);
    console.log(response);
    if (response && response.status === 200) {
      setListRooms(response.data.data);
      setTotalPages(response.data.totalPages);
    }
  };
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className='mt-2'>
      <h2 className='font-semibold text-2xl text-cyan-700 py-4'>Danh sách phòng cho thuê</h2>
      <div className='grid grid-cols-2 gap-6'>
        {listRooms.map((room, index) => (
          <RoomItem
            key={`perroperty_${index}`}
            id={room.id}
            title={room.title}
            propertyImage={room.propertyImages}
            pricePerNight={room.pricePerNight}
            numberOfReviews={room.numberOfReviews}
            rating={room.rating}
          />
        ))}
      </div>
      <div className='py-4'>
        <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
      </div>
    </div>
  );
};

export default ListRoomsForRent;
