import { useState } from "react";

const listRoomsForRent = [
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  },
  {
    roomName:'Căn hộ khu nghỉ dưỡng',
    src:'https://toquoc.mediacdn.vn/Uploaded/daont/2017_11_12/NewFolder/Sun_Peninsula_Residence_Villa_2__DNOE.jpg',
    alt:'Căn hộ'
  }
]

const ListRoomsForRent = () => {
  const [showAllRooms, setShowAllRooms] = useState(false);

  const visibleRooms = showAllRooms ? listRoomsForRent : listRoomsForRent.slice(0, 3);

  const toggleShowAllImages = () => {
    setShowAllRooms(!showAllRooms);
  };
  return (
    <div className="mt-2">
      <h2 className='font-semibold text-2xl mb-5'>Danh sách phòng cho thuê</h2>
      <div className="grid grid-cols-3 gap-2">
        {visibleRooms.map((room, index) => (
          <div key={index}>
            <img 
              src={room.src} 
              alt={room.alt} 
              style={{ width: '300px', height: '300px' ,borderRadius:'3%'}}
            />
            <p>{room.roomName}</p>
          </div>
        ))}
      </div>
      {listRoomsForRent.length > 3 && (
        <button onClick={toggleShowAllImages} style={{fontStyle:'italic', marginTop:'10px'}}>
          {showAllRooms ? 'Ẩn bớt ảnh' : 'Xem thêm'}
        </button>
      )}
    </div>
  )
}

export default ListRoomsForRent