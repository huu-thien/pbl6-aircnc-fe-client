import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import PlaceIcon from '@mui/icons-material/Place';

const title = 'Biệt thự 6 phòng ngủ sang trọng trên du thuyền'
const location = 'Ngũ Hành Sơn, Đà Nẵng';
const TitleRoom = () => {
  
  return (
    <div className='flex justify-between'>
        <div>
            <h1 style={{fontSize:'26px', fontWeight:500}}>{title}</h1>
            <p><PlaceIcon/>{location}</p>
        </div>
        <p>
            <Button variant="text"><ShareIcon/><p className='font-extralight underline'>Chia sẻ</p></Button>
            <Button variant="text"><TurnedInNotIcon/><p className='font-extralight underline'>Lưu</p></Button>
        </p>
    </div>
  )
}

export default TitleRoom