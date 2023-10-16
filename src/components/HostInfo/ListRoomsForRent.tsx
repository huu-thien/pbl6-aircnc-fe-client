import { useState } from 'react';

const listRoomsForRent = [
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
  {
    roomName: 'Căn hộ khu nghỉ dưỡng',
    src: 'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt: 'Căn hộ',
  },
];

const ListRoomsForRent = () => {
  const [showAllRooms, setShowAllRooms] = useState(false);

  const visibleRooms = showAllRooms ? listRoomsForRent : listRoomsForRent.slice(0, 3);

  const toggleShowAllImages = () => {
    setShowAllRooms(!showAllRooms);
  };
  return (
    <div className='mt-2'>
      <h2 className='font-semibold text-2xl text-cyan-700 py-4'>Danh sách phòng cho thuê</h2>
      <div className='grid grid-cols-3 gap-4'>
        {visibleRooms.map((room, index) => (
          <div key={index} className='shadow-xl p-4 rounded-md'>
            <img src={room.src} alt={room.alt} className='w-full h-auto rounded-md' />
            <p className='py-4'>{room.roomName}</p>
            <p className='text-sm font-thin'>Căn hộ tuyệt vời với đầy đủ tiện nghi. Chỗ ở sang trọng</p>
          </div>
        ))}
      </div>
      {listRoomsForRent.length > 3 && (
        <button onClick={toggleShowAllImages} className='py-4 font-thin underline'>
          {showAllRooms ? 'Ẩn bớt' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default ListRoomsForRent;
