import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import PlaceIcon from '@mui/icons-material/Place';

interface Propstype {
  title: string;
}

const location = 'Ngũ Hành Sơn, Đà Nẵng';
const TitleRoom = ({ title }: Propstype) => {
  return (
    <div className='flex justify-between items-start py-4'>
      <div className='flex-auto pr-12'>
        <h1 className='font-bold text-2xl  text-cyan-800 line-clamp-1'>{title}</h1>
        <p className='text-gray-500 font-thin py-3'>
          <PlaceIcon sx={{ color: '#c92327' }} />
          {location}
        </p>
      </div>
      <div className='flex min-w-[200px]'>
        <Button variant='text'>
          <ShareIcon />
          <p className='font-extralight underline'>Chia sẻ</p>
        </Button>
        <Button variant='text'>
          <TurnedInNotIcon />
          <p className='font-extralight underline'>Lưu</p>
        </Button>
      </div>
    </div>
  );
};

export default TitleRoom;
