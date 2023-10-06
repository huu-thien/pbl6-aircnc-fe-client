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
        <h2 className="text-xl text-cyan-800 font-bold">Thông tin cơ bản</h2>
        <div className="flex gap-3 py-2">
          <BathroomIcon />
          <p className='font-thin'>Số phòng tắm: 2 phòng</p>
        </div>
        <div className="flex gap-3 py-2">
          <BedroomParentIcon />
          <p className='font-thin'>Số phòng ngủ: 2 phòng</p>
        </div>
        <div className="flex gap-3 py-2">
          <WcIcon />
          <p className='font-thin'>Số phòng vệ sinh: 2 phòng</p>
        </div>
        <div className="flex gap-3 py-2">
          <ArrowOutwardIcon />
          <p className='font-thin'>Hướng cửa chính: Đông Nam</p>
        </div>
        <div className="flex gap-3 py-2">
          <PersonIcon />
          <p className='font-thin'>Số khách tối đa: 4 </p>
        </div>
      </div>
      <div className="grid gap-1">
        <h2 className="text-xl text-cyan-800 font-bold">Nơi này có những thứ</h2>
        <div className="flex gap-3 py-2">
          <WifiIcon />
          <p className='font-thin'>Wifi-tốc độ 19Mbps</p>
        </div>
        <div className="flex gap-3 py-2">
          <TimeToLeaveIcon />
          <p className='font-thin'>Chỗ đỗ xe miễn phí tại nơi ở</p>
        </div>
        <div className="flex gap-3 py-2">
          <BeachAccessIcon />
          <p className='font-thin'>Hướng nhìn ra biển</p>
        </div>
        <div className="flex gap-3 py-2">
          <WorkIcon />
          <p className='font-thin'>Không gian riêng để làm việc</p>
        </div>
      </div>
    </div>
  );
};

export default IntroduceRoom;
