import BookingTime from './BookingRoom/BookingTime';
import Button from '@mui/material/Button';
import { Divider} from '@mui/material';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { useCallback, useState } from 'react';
import MenuQuantityCustomer from './BookingRoom/MenuQuantityCustomer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Propstype {
  pricePerNight: number;
}

const BookingRoom = ({ pricePerNight }: Propstype) => {
  // const [numberOfNight, ] = useState<number>(5)
  
  // const total = price - infoPriceRoom.disCount + infoPriceRoom.serviceCharge;

  const [dayDifference, setDayDifference] = useState(0);

  // Callback function để nhận giá trị dayDifference từ BookingTime
  const handleDayDifferenceChange = (difference: number) => {
    setDayDifference(difference);
  }

  const price = dayDifference * (pricePerNight);
  console.log("So dem: ",dayDifference);

  const navigate = useNavigate();
  const handleSubmit = useCallback(() => {
    // Xử lý gửi giá trị từ biểu mẫu ở đây
    // Sau khi xử lý, chuyển đến trang xác nhận và truyền dữ liệu
    navigate(`/booking-confirmed?dayDifference=${dayDifference}`);
  }, [dayDifference,navigate]);
  return (
    <div className='border shadow-xl rounded-xl'>
      <div className='grid p-5'>
        <p className='py-4 text-cyan-800 text-xl'>{formatMoney(pricePerNight)} vnd/đêm</p>
        <div className='flex flex-col gap-5'>
          <BookingTime onDayDifferenceChange={handleDayDifferenceChange}/>
          <MenuQuantityCustomer />
        </div>
        {/* <Button variant='contained' sx={{ height: 56, mt: 3 }}>
          <Link to='/booking-confirmed'>ĐẶT PHÒNG</Link>
        </Button> */}
        <Button variant='contained' sx={{ height: 56, mt: 3 }} onClick={handleSubmit}>
          ĐẶT PHÒNG
        </Button>
      </div>
      <div className='p-5'>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>
            {formatMoney(pricePerNight)} x {dayDifference} đêm
          </p>
          <p className='text-gray-500 font-thin'>{formatMoney(price)} vnd</p>
        </div>
        {/* <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Giảm giá cho thời gian ở dài hạn</p>
          <p className='text-gray-500 font-thin'>-{formatMoney(infoPriceRoom.disCount)} vnd</p>
        </div>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Phí dịch vụ AirCnC</p>
          <p className='text-gray-500 font-thin'>+{formatMoney(infoPriceRoom.serviceCharge)} vnd</p>
        </div> */}
        <Divider />
        <div className='flex justify-between py-3' style={{ fontSize: 18 }}>
          <p className='text-gray-500 font-thin'>Tổng tiền </p>
          <p className='text-gray-500 font-thin'>{formatMoney(Math.floor(price))} vnd</p>
        </div>
      </div>
    </div>
  );
};

export default BookingRoom;
