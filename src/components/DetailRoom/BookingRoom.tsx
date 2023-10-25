import MenuQuantityCustomer from '../HomePage/FilterCategory/MenuQuantityCustomer';
import BookingTime from './BookingRoom/BookingTime';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { useState } from 'react';
const infoPriceRoom = {
  priceRoomPerNight: 74,
  disCount: 300000,
  serviceCharge: 100000,
};

interface Propstype {
  pricePerNight: number;
}

const BookingRoom = ({ pricePerNight }: Propstype) => {
  const [numberOfNight, ] = useState<number>(5)
  const price = numberOfNight * (pricePerNight);
  const total = price - infoPriceRoom.disCount + infoPriceRoom.serviceCharge;

  return (
    <div className='border shadow-xl rounded-xl'>
      <div className='grid p-5'>
        <p className='py-4 text-cyan-800 text-xl'>{formatMoney(pricePerNight)} vnd/đêm</p>
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
            {formatMoney(pricePerNight)} x {numberOfNight} đêm
          </p>
          <p className='text-gray-500 font-thin'>{formatMoney(price)} vnd</p>
        </div>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Giảm giá cho thời gian ở dài hạn</p>
          <p className='text-gray-500 font-thin'>-{formatMoney(infoPriceRoom.disCount)} vnd</p>
        </div>
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Phí dịch vụ AirCnC</p>
          <p className='text-gray-500 font-thin'>+{formatMoney(infoPriceRoom.serviceCharge)} vnd</p>
        </div>
        <Divider />
        <div className='flex justify-between py-3' style={{ fontSize: 18 }}>
          <p className='text-gray-500 font-thin'>Tổng trước thuế </p>
          <p className='text-gray-500 font-thin'>{formatMoney(Math.floor(total))} vnd</p>
        </div>
      </div>
    </div>
  );
};

export default BookingRoom;
