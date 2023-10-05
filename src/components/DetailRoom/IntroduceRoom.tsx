import WifiIcon from '@mui/icons-material/Wifi';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import WorkIcon from '@mui/icons-material/Work';
import BathroomIcon from '@mui/icons-material/Bathroom';
import WcIcon from '@mui/icons-material/Wc';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import PersonIcon from '@mui/icons-material/Person';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const IntroduceRoom = () => {
  return (
    <div className="flex -mt-20 justify-between">
      <div className="grid gap-1">
        <h2 style={{fontSize:'18px',marginBottom:10}}>Thông tin cơ bản</h2>
        <div className='flex gap-3'><BathroomIcon/><p>Số phòng tắm: 2 phòng</p></div>
        <div className='flex gap-3'><BedroomParentIcon/><p>Số phòng ngủ: 2 phòng</p></div>
        <div className='flex gap-3'><WcIcon/><p>Số phòng vệ sinh: 2 phòng</p></div>
        <div className='flex gap-3'><ArrowOutwardIcon/><p>Hướng cửa chính: Đông Nam</p></div>
        <div className='flex gap-3'><PersonIcon/><p>Số khách tối đa: 4 </p></div>
      </div>
      <div className="grid gap-1">
        <h2 style={{fontSize:'18px',marginBottom:10} }>Nơi này có những thứ</h2>
        <div className='flex gap-3'><WifiIcon/><p>Wifi-tốc độ 19Mbps</p></div>
        <div className='flex gap-3'><TimeToLeaveIcon/><p>Chỗ đỗ xe miễn phí tại nơi ở</p></div>
        <div className='flex gap-3'><BeachAccessIcon/><p>Hướng nhìn ra biển</p></div>
        <div className='flex gap-3'><WorkIcon/><p>Không gian riêng để làm việc</p></div>
      </div>
    </div>
  )
}

export default IntroduceRoom