// BookingCheckedPage.js
import { VNPayHookUrlType } from '@/@types/booking';
import { postVNPayHookUrl } from '@/services/PaymentService/paymentService';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaymentSuccessImage from '@/assets/images/payment-success.webp';
import PaymentFailedImage from '@/assets/images/payment-failed.jpg';

const BookingCheckedPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Lấy giá trị của các tham số từ query string
  const vnp_Amount = params.get('vnp_Amount');
  const vnp_BankCode = params.get('vnp_BankCode');
  const vnp_BankTranNo = params.get('vnp_BankTranNo');
  const vnp_CardType = params.get('vnp_CardType');
  const vnp_OrderInfo = params.get('vnp_OrderInfo');
  const vnp_PayDate = params.get('vnp_PayDate');
  const vnp_ResponseCode = params.get('vnp_ResponseCode');
  const vnp_TmnCode = params.get('vnp_TmnCode');
  const vnp_TransactionNo = params.get('vnp_TransactionNo');
  const vnp_TransactionStatus = params.get('vnp_TransactionStatus');
  const vnp_TxnRef = params.get('vnp_TxnRef');
  const vnp_SecureHash = params.get('vnp_SecureHash');

  const dataPostChecked: VNPayHookUrlType = useMemo(() => {
    return {
      vnp_Amount: vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate: vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef: vnp_TxnRef,
      vnp_SecureHash,
    };
  }, [
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TmnCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef,
    vnp_SecureHash,
  ]);
  useEffect(() => {
    postCheckedPayment(dataPostChecked);
  }, [dataPostChecked]);

  const postCheckedPayment = async (dataPostChecked: VNPayHookUrlType) => {
    const response = await postVNPayHookUrl(dataPostChecked);
    if (response && response.status === 200) {
      setIsSuccess(true);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className='flex flex-col items-center my-4 h-screen '>
          <img className='w-1/2 my-4' src={PaymentSuccessImage} alt='Success' />
          <h2 className='text-2xl font-bold text-cyan-800 my-2'>Thanh toán thành công!</h2>
          <p className='text-gray-600 mb-4'>Cảm ơn bạn đã thanh toán. Đơn đặt phòng của bạn đã được xác nhận.</p>
          <Button variant='contained'>
            <Link to='/list-booking-guest'>Quản lý đặt phòng</Link>
          </Button>
        </div>
      ) : (
        <div className='flex flex-col items-center my-4 h-screen '>
          <img className='w-2/5 my-4' src={PaymentFailedImage} alt='Success' />
          <h2 className='text-2xl font-bold text-[#cb2b2f] my-2'>Thanh toán của bạn đã thất bại !</h2>
          <p className='text-gray-600 pb-4'>
            Booking của bạn vẫn sẽ được lưu ở trạng thái đang chờ thanh toán. Đi đến trang quản lý để tiến hành thanh
            toán lại nhé !
          </p>
          <Button variant='contained'>
            <Link to='/list-booking-guest'>Quản lý đặt phòng</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default BookingCheckedPage;
