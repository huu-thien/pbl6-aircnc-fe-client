import MenuQuantityCustomer from '../HomePage/FilterCategory/MenuQuantityCustomer';
import BookingTime from './BookingRoom/BookingTime';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
const infoPriceRoom = {
  priceRoomPerNight: 74,
  numberOfNights: 5,
  disCount: 10,
  serviceCharge: 50,
};

const BookingRoom = () => {
  const price = infoPriceRoom.numberOfNights * infoPriceRoom.priceRoomPerNight;
  const total = price - infoPriceRoom.disCount + infoPriceRoom.serviceCharge;
  return (
    <div className='border shadow-xl rounded-xl'>
      <div className='grid p-5'>
        <p className='py-4 text-cyan-800 text-xl'>${infoPriceRoom.priceRoomPerNight}/đêm</p>
        <div className='flex flex-col gap-5'>
          <BookingTime />
          <MenuQuantityCustomer />
        </div>
        <Button variant='contained' sx={{ height: 56, mt: 3 }}>
          Đặt phòng
        </Button>
      </div>
      <div className='p-5'>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>
            ${infoPriceRoom.priceRoomPerNight} x {infoPriceRoom.numberOfNights} đêm
          </p>
          <p className='text-gray-500 font-thin'>{price}</p>
        </div>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Giảm giá cho thời gian ở dài hạn</p>
          <p className='text-gray-500 font-thin'>-${infoPriceRoom.disCount}</p>
        </div>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Phí dịch vụ AirCnC</p>
          <p className='text-gray-500 font-thin'>${infoPriceRoom.serviceCharge}</p>
        </div>
        <Divider />
        <div className='flex justify-between py-3' style={{ fontSize: 18 }}>
          <p className='text-gray-500 font-thin'>Tổng trước thuế </p>
          <p className='text-gray-500 font-thin'>${total}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingRoom;
