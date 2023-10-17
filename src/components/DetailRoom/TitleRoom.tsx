import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import PlaceIcon from '@mui/icons-material/Place';

const title = 'Biệt thự 6 phòng ngủ sang trọng trên du thuyền';
const location = 'Ngũ Hành Sơn, Đà Nẵng';
const TitleRoom = () => {
  return (
    <div className='flex justify-between pb-4'>
      <div>
        <h1 className='font-bold text-2xl py-2 text-cyan-800'>{title}</h1>
        <p className='text-gray-500 font-thin'>
          <PlaceIcon sx={{ color: '#c92327' }} />
          {location}
        </p>
      </div>
      <p>
        <Button variant='text'>
          <ShareIcon />
          <p className='font-extralight underline'>Chia sẻ</p>
        </Button>
        <Button variant='text'>
          <TurnedInNotIcon />
          <p className='font-extralight underline'>Lưu</p>
        </Button>
      </p>
    </div>
  );
};

export default TitleRoom;
