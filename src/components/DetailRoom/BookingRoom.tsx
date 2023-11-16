import BookingTime from './BookingRoom/BookingTime';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import MenuQuantityCustomer from './BookingRoom/MenuQuantityCustomer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { DataSendConfirmType } from '@/@types/booking';
interface Propstype {
  pricePerNight: number;
  propertyId: number;
  cleaningFee: number;
  maxAdultCount: number;
  maxChildCount: number;
}
const BookingRoom = ({ pricePerNight, propertyId, cleaningFee, maxAdultCount, maxChildCount }: Propstype) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [quantityOld, setQuantityOld] = useState(0);
  const [quantityYoung, setQuantityYoung] = useState(0);

  const diffInMs = new Date(String(dateEnd)).getTime() - new Date(String(dateStart)).getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const handleBooking = () => {
    if (user) {
      if (dateStart && dateEnd && (quantityOld > 0 || quantityYoung > 0)) {
        const dataSendConfirm: DataSendConfirmType = {
          propertyId,
          guestId: user.id || 1,
          checkInDate: new Date(String(dateStart)),
          checkOutDate: new Date(String(dateEnd)),
          numberOfAdults: quantityOld,
          numberOfChildren: quantityYoung,
          pricePerNight,
          diffInDays,
          cleaningFee,
        };
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xử lý !',
            success: 'Hãy xác nhận để đặt phòng',
          })
          .then(() => {
            navigate('/booking-confirmed', { state: dataSendConfirm });
          });
      } else {
        toast.error('Bạn phải nhập đầy đủ thông tin để đặt phòng !');
      }
    } else {
      toast.error('Bạn phải đăng nhập để đặt phòng !');
    }
  };
  return (
    <div className='border shadow-xl rounded-xl '>
      <div className='grid p-5 max-w-[400xp]'>
        <p className='py-4 text-cyan-800 text-xl'>{formatMoney(pricePerNight)} vnd/đêm</p>
        <div className='flex flex-col gap-5'>
          <BookingTime
            propertyId={propertyId}
            dateStart={dateStart}
            dateEnd={dateEnd}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
          />
          <MenuQuantityCustomer
            quantityOld={quantityOld}
            setQuantityOld={setQuantityOld}
            quantityYoung={quantityYoung}
            setQuantityYoung={setQuantityYoung}
            maxAdultCount={maxAdultCount}
            maxChildCount={maxChildCount}
          />
        </div>
        <>
          <Button variant='contained' sx={{ height: 56, mt: 3 }} onClick={handleBooking}>
            ĐẶT PHÒNG
          </Button>
        </>
      </div>
      <div className='p-5'>
        {!isNaN(diffInDays) && (
          <div className='flex justify-between py-3'>
            <p className='text-gray-500 font-thin'>
              {formatMoney(pricePerNight)} x {diffInDays} đêm
            </p>
            <p className='text-gray-500 font-thin'>{formatMoney(pricePerNight * diffInDays)} vnd</p>
          </div>
        )}
        <div className='flex justify-between py-3'>
          <p className='text-gray-500 font-thin'>Phí vệ sinh:</p>
          <p className='text-gray-500 font-thin'>{formatMoney(cleaningFee)} vnd</p>
        </div>
        <Divider />
        <div className='flex justify-between py-3' style={{ fontSize: 18 }}>
          {!isNaN(diffInDays) && <p className='text-gray-500 font-thin'>Tổng tiền </p>}
          {!isNaN(diffInDays) && (
            <p className='text-gray-500 font-thin'>{formatMoney(pricePerNight * diffInDays + cleaningFee)} vnd</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRoom;
