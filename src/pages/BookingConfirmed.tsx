import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ImageHome from '@/assets/images/imghome.png';
import ImageHome1 from '@/assets/images/imghome1.png';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@mui/material';
import { useState } from 'react';
import { DataSendConfirmType, RequestBookingType } from '@/@types/booking';
import { postRequestBooking } from '@/services/BookingService/bookingService';
import { postCreatepayment } from '@/services/PaymentService/paymentService';
import { toast } from 'react-toastify';

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataSendConfirm: DataSendConfirmType = location.state;
  const [noteValue, setNoteValue] = useState('');
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const handleChangeAccordion = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Booking
  const handleRequestBooking = async () => {
    try {
      const bodyRequest: RequestBookingType = {
        propertyId: dataSendConfirm.propertyId,
        guestId: dataSendConfirm.guestId,
        checkInDate: dataSendConfirm.checkInDate,
        checkOutDate: dataSendConfirm.checkOutDate,
        numberOfAdults: dataSendConfirm.numberOfAdults,
        numberOfChildren: dataSendConfirm.numberOfChildren,
        note: noteValue,
      };
      const response = await postRequestBooking(bodyRequest);
      if (response && response.status === 200) {
        const bookingId = response.data.id;
        const payment = await postCreatepayment({ bookingId, bankCode: '' });
        console.log(payment);

        if (payment && payment.status === 200) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang xử lý !',
              success: 'Thanh toán để hoàn tất !',
            })
            .then(() => {
              const urlPayment = payment.data;
              window.open(urlPayment);
              navigate('/list-booking-guest');
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-7xl mx-auto w-full py-8 '>
      <div className='inline-flex gap-3'>
        <p className='hover:underline hover:text-cyan-600' onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </p>
        <h1 className='font-bold text-2xl  text-cyan-800 line-clamp-1'>Yêu cầu đặt phòng/đặt chỗ</h1>
      </div>
      <div className='flex gap-6 justify-between'>
        <div className='w-2/5'>
          <h2 className='text-xl text-cyan-800 font-bold pt-8 pb-3'>Chuyến đi của bạn</h2>
          <div className=''>
            <div className='flex items-center justify-between py-2'>
              <p>Ngày đi</p>
              <Chip label={formatDateTime(String(dataSendConfirm.checkInDate))} />
            </div>
            <div className=''></div>
            <div className=''></div>
            <div className='flex items-center justify-between py-2'>
              <p>Ngày về</p>
              <Chip label={formatDateTime(String(dataSendConfirm.checkOutDate))} />
            </div>
            <div className=''></div>
            <div className=''></div>
            <div className='flex items-center justify-between py-2'>
              <p>Số người lớn</p>
              <Chip label={`${dataSendConfirm.numberOfAdults} người`} />
            </div>
            <div className='flex items-center justify-between py-2'>
              <p>Số trẻ em</p>
              <Chip label={`${dataSendConfirm.numberOfChildren} người`} />
            </div>
            <div className='flex items-center justify-between py-2'>
              <p>Giá tiền mỗi đêm x số đêm</p>
              <Chip label={`${formatMoney(dataSendConfirm.pricePerNight)} vnd x ${dataSendConfirm.diffInDays}`} />
            </div>
            <div className='flex items-center justify-between py-2'>
              <p>Phí vệ sinh</p>
              <Chip label={`${formatMoney(dataSendConfirm.cleaningFee)} vnd`} />
            </div>
            <div className='flex items-center justify-between py-2'>
              <p>Tổng tiền</p>
              <Chip
                label={`${formatMoney(
                  dataSendConfirm.pricePerNight * dataSendConfirm.diffInDays + dataSendConfirm.cleaningFee,
                )} vnd`}
                color='primary'
                sx={{ fontSize: 16 }}
              />
            </div>
          </div>
          <h2 className='text-xl text-cyan-800 font-bold pb-3 pt-5'>Ghi chú cho chủ nhà</h2>
          <textarea
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none '
            placeholder='Ghi chú cho chủ nhà ... '
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          ></textarea>
          <h2 className='text-xl text-cyan-800 font-bold pb-3 pt-5'>Chính sách hủy</h2>
          <div className='pb-6'>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
              <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                <p className='text-cyan-700'>Chính sách linh hoạt</p>
              </AccordionSummary>
              <AccordionDetails>
                <p className='text-gray-600 font-thin text-sm'>
                  Người thuê có thể hủy phòng trong 48h trước khi checkin và được hoàn trả 100% tiền đặt phòng. Nếu sau
                  thời gian đó thì bên cho thuê được trả tiền cho mỗi đêm đã ở và đêm tiếp theo. Cụ thể như sau:
                </p>
                <p className='text-gray-600 font-thin text-sm'>
                  - Nếu người thuê chưa ở đêm nào thì tính tiền 1 đêm (không tính chi phí dọn dẹp)
                </p>
                <p className='text-gray-600 font-thin text-sm'>
                  - Đã ở ⅗ đêm thì tính ⅘ đêm (có tính chi phsi dọn dẹp)
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
              <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
                <p className='text-cyan-700'>Chính sách nghiêm ngặt</p>
              </AccordionSummary>
              <AccordionDetails>
                <p className='text-gray-600 font-thin text-sm'>
                  Người thuê có thể hủy phòng trước 5 ngày và được hoàn trả 100% tiền đặt phòng. Nếu sau thời gian đó
                  thì bên cho thuê được trả tiền cho mỗi đêm đã ở + 50% các đêm chưa ở. Ví dụ:
                </p>
                <p className='text-gray-600 font-thin text-sm'>- Nếu chưa ở đêm nào thì được tính tiền 2.5 đêm</p>
                <p className='text-gray-600 font-thin text-sm'>- Nếu đã ở 2 đêm thì được tính: 2 + 50% * 3 = 3.5 đêm</p>
              </AccordionDetails>
            </Accordion>
          </div>

          <Button variant='contained' fullWidth size='large' onClick={handleRequestBooking}>
            Yêu cầu đặt phòng
          </Button>
        </div>
        <div>
          <img src={ImageHome1} className='w-full' />
          <img src={ImageHome} className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
