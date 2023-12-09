import { Chip, IconButton, Box, Button, Modal } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useState } from 'react';
import { HostPaymentType } from '@/@types/hostpayment';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { postPaymentForHost } from '@/services/PaymentService/paymentService';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface PropsType {
  hostpayment: HostPaymentType;
  currentPage: number;
  status: string;
  getListHostPayment: (currentPage: number, status: string) => Promise<void>;
}

const PaymentItem = ({ hostpayment, currentPage, status, getListHostPayment }: PropsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentForHost = async (hostPaymentId: number) => {
    const response = await postPaymentForHost(hostPaymentId);
    if (response && response.status === 200) {
      const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
      toast
        .promise(resolveAfter2Sec, {
          pending: 'Đang tiến hành thanh toán !',
          success: 'Đã thanh toán thành công !',
        })
        .then(() => {
          getListHostPayment(currentPage, status);
        });
    }
  };

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {hostpayment.id}
      </th>
      <td className='px-6 py-4'>{hostpayment.paymentInfo.accountHolder}</td>
      <td className='px-6 py-4'>{hostpayment.paymentInfo.accountNumber}</td>
      <td className='px-6 py-4'>{hostpayment.paymentInfo.bankName}</td>
      <td className='px-6 py-4'>{formatMoney(hostpayment.amount)} đ</td>

      <td className='px-6 py-4'>
        {hostpayment.status === 'Pending' && (
          <Chip label='Chờ thanh toán' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
        )}
        {hostpayment.status === 'Paid' && (
          <Chip label='Đã thanh toán' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
        )}
        {hostpayment.status === 'Cancelled' && (
          <Chip label='Đã hủy' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
      </td>
      <td className='px-6 py-4'>
        {hostpayment.status === 'Pending' && (
          <Button variant='outlined' size='small' onClick={handleOpen}>
            Thanh toán
          </Button>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <p className='text-gray-700 pb-4'>
              Bạn có chắc chắn muốn thanh toán số tiền{' '}
              <Chip
                label={`${formatMoney(hostpayment.amount)}đ`}
                sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
              />{' '}
              không?
            </p>
            <p className='py-1 text-sm text-gray-700'>
              Chủ tài khoản: <span className='font-bold text-[#352069]'>{hostpayment.paymentInfo.accountHolder}</span>
            </p>
            <p className='py-1 text-sm text-gray-700'>
              Số tài khoản: <span className='font-bold text-[#352069]'>{hostpayment.paymentInfo.accountNumber}</span>
            </p>
            <p className='py-1 text-sm text-gray-700'>
              Tên ngân hàng: <span className='font-bold text-[#352069]'>{hostpayment.paymentInfo.bankName}</span>
            </p>

            <div className='pt-4 flex justify-end gap-4'>
              <Button variant='outlined' size='small' onClick={handleClose}>
                cancel
              </Button>
              <Button variant='contained' size='small' onClick={() => handlePaymentForHost(hostpayment.id)}>
                Thanh toán
              </Button>
            </div>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};

export default PaymentItem;
