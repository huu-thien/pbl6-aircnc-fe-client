import { Chip, IconButton, Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { CancellationInfoType, Cancellationtype } from '@/@types/manageCancellation';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import InfoIcon from '@mui/icons-material/Info';
import {
  postAcceptCancellations,
  postRejectedCancellations,
} from '@/services/Admin/ManageCancellation/manageCancellation';
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
  cancellationInfo: Cancellationtype;
  getListAccount: (currentPage: number, canceller: string) => Promise<void>;
  currentPage: number;
  canceller: string;
}

const CancellationItem = ({ cancellationInfo, getListAccount, currentPage, canceller }: PropsType) => {
  // const [note, setNote] = useState<string>('');

  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

  // const [openResolved, setOpenResolved] = useState(false);
  // const handleOpenResolved = () => setOpenResolved(true);
  // const handleCloseResolved = () => {
  //   setOpenResolved(false);
  //   setNote('');
  // };

  // const [openRejected, setOpenRejected] = useState(false);
  // const handleOpenRejected = () => setOpenRejected(true);
  // const handleCloseRejected = () => {
  //   setOpenRejected(false);
  //   setNote('');
  // };

  // const handleAcceptCancelBooking = async (
  //   cancellationTicketId: number,
  //   resolveNote: string,
  //   refundAmount: number,
  //   chargeAmount: number,
  // ) => {
  //   try {
  //     const dataCancel: CancellationInfoType = {
  //       resolveNote,
  //       refundAmount,
  //       chargeAmount,
  //     };
  //     const response = await postAcceptCancellations(cancellationTicketId, dataCancel);
  //     if (response && response.canceller === 204) {
  //       const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
  //       toast
  //         .promise(resolveAfter2Sec, {
  //           pending: 'Đang xử lý !',
  //           success: 'Đã chấp nhận đơn hủy !',
  //         })
  //         .then(() => {
  //           getListAccount(currentPage, canceller);
  //         });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleRejectedCancelBooking = async (cancellationTicketId: number, resolveNote: string) => {
  //   try {
  //     const dataCancel: Omit<CancellationInfoType, 'refundAmount' | 'chargeAmount'> = {
  //       resolveNote,
  //     };
  //     const response = await postRejectedCancellations(cancellationTicketId, dataCancel);
  //     console.log(response);

  //     if (response && response.canceller === 204) {
  //       const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
  //       toast
  //         .promise(resolveAfter2Sec, {
  //           pending: 'Đang xử lý !',
  //           success: 'Đã từ chối đơn hủy !',
  //         })
  //         .then(() => {
  //           getListAccount(currentPage, canceller);
  //         });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      {/* <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {cancellationInfo.id}
      </th> */}
      <td className='px-6 py-4'>{cancellationInfo.bookingId}</td>
      <td className='px-6 py-4'>
        {cancellationInfo.cancellationReason === 'NaturalDisaster' && (
          <Chip label='Thảm họa thiên nhiên' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
        {cancellationInfo.cancellationReason === 'PersonalIssue' && (
          <Chip label='Vấn để cá nhân' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />
        )}
        {cancellationInfo.cancellationReason === 'PropertyIssue' && (
          <Chip label='Vấn để về phòng' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
        )}
        {cancellationInfo.cancellationReason === 'Sickness' && (
          <Chip label='Bệnh tật' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
        )}
        {cancellationInfo.cancellationReason === 'Pandemic' && (
          <Chip label='Dịch bệnh' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />
        )}
        {cancellationInfo.cancellationReason === 'Other' && (
          <Chip label='Lý do khác' sx={{ backgroundColor: '#f7d5e5', color: '#a31255' }} />
        )}
      </td>
      {/* <td className='px-6 my-4 line-clamp-1'>
        {cancellationInfo.cancellationReasonNote === 'CancelledBeforeCheckIn' && (
          <Chip label='Hủy trước check in' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
        {cancellationInfo.cancellationReasonNote === 'CancelledAfterCheckIn' && (
          <Chip label='Hủy sau khi đặt' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
      </td> */}
      <td className='px-6 py-4'>{formatMoney(cancellationInfo.chargeAmount)} vnd</td>
      <td className='px-6 py-4'>{formatMoney(cancellationInfo.refundAmount)} vnd</td>
      <td className='px-6 py-4'>
        {cancellationInfo.isIssuerGuest ? 
        (<Chip label='Khách hàng' sx={{ backgroundColor: '#dfcedc', color: '#0a5817' }} />):
        (<Chip label='Chủ nhà' sx={{ backgroundColor: '#cee0d4', color: '#080f66' }} />)
        }
      </td>
      {/* <td className='px-6 py-4'>
        {cancellationInfo.canceller === 'Pending' && (
          <Chip label='Chờ duyệt' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
        )}
        {cancellationInfo.canceller === 'Resolved' && (
          <Chip label='Đã duyệt' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
        )}
        {cancellationInfo.canceller === 'Rejected' && (
          <Chip label='Thất bại' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
      </td> */}
      <td className='px-6 py-4'>
        <IconButton onClick={handleOpenDetail}>
          <InfoIcon sx={{ color: '#0071a7' }} />
        </IconButton>
        <Modal
          open={openDetail}
          onClose={handleCloseDetail}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='text-gray-600'>
              <p className='text-center uppercase py-2 text-[#5e40ac] font-semibold'>Đơn hủy phòng</p>
              <p className='py-1'>Số đơn: {cancellationInfo.bookingId}</p>
              <p className='py-1'>
                Lý do hủy:{' '}
                {cancellationInfo.cancellationReason === 'NaturalDisaster' && (
                  <Chip label='Thảm họa thiên nhiên' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
                )}
                {cancellationInfo.cancellationReason === 'PersonalIssue' && (
                  <Chip label='Vấn để cá nhân' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />
                )}
                {cancellationInfo.cancellationReason === 'PropertyIssue' && (
                  <Chip label='Vấn để về phòng' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
                )}
                {cancellationInfo.cancellationReason === 'Sickness' && (
                  <Chip label='Bệnh tật' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
                )}
                {cancellationInfo.cancellationReason === 'Pandemic' && (
                  <Chip label='Dịch bệnh' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />
                )}
                {cancellationInfo.cancellationReason === 'Other' && (
                  <Chip label='Lý do khác' sx={{ backgroundColor: '#f7d5e5', color: '#a31255' }} />
                )}
              </p>
              <p className='py-1'>Mô tả cụ thể : {cancellationInfo.cancellationReasonNote}</p>
              {/* <p className='py-1'>Tiền phí hệ thống : {formatMoney(cancellationInfo.chargeAmount)} vnd</p> */}
              <p className='py-1'>Tiền hoàn trả : {formatMoney(cancellationInfo.refundAmount)} vnd</p>
              <p className='py-1'>Hình ảnh minh chứng</p>
              {cancellationInfo.attachments.length > 0 ? (
                <div>
                  {cancellationInfo.attachments.map((img, index) => (
                    <img key={`${img}-${index}`} src={img} alt={img} className='block pb-2' />
                  ))}
                </div>
              ) : (
                <p className='text-sm text-gray-500'>(không có minh chứng)</p>
              )}
            </div>
          </Box>
        </Modal>
      </td>
      {/* <td className='px-6 my-4 line-clamp-1'>
        {cancellationInfo.canceller === 'Pending' && (
          <div className='flex gap-2'>
            <>
              <Button variant='outlined' size='small' onClick={handleOpenResolved}>
                Duyệt đơn
              </Button>
              <Modal
                open={openResolved}
                onClose={handleCloseResolved}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <div className='text-gray-600'>
                    <p>Bạn có chắc chắn muốn duyệt đơn hủy</p>
                    <p>ID : {cancellationInfo.id}</p>
                    <p>Tiền hoàn trả : {formatMoney(cancellationInfo.refundAmount)} vnd</p>
                    <p>Tiền phí: {formatMoney(cancellationInfo.chargeAmount)} vnd</p>
                    <div>
                      <textarea
                        rows={4}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none mt-4'
                        placeholder='Ghi chú ...'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='flex justify-center gap-2 pt-4'>
                      <Button variant='outlined' size='small' onClick={handleCloseResolved}>
                        Cancel
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() =>
                          handleAcceptCancelBooking(
                            cancellationInfo.id,
                            note,
                            cancellationInfo.refundAmount,
                            cancellationInfo.chargeAmount,
                          )
                        }
                      >
                        Duyệt
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </>
            <p>
              <Button variant='outlined' size='small' onClick={handleOpenRejected}>
                Từ chối
              </Button>
              <Modal
                open={openRejected}
                onClose={handleCloseRejected}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <div className='text-gray-600'>
                    <p>Bạn có chắc chắn muốn từ chối đơn hủy đơn hủy không ?</p>
                    <div>
                      <textarea
                        rows={4}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none mt-4'
                        placeholder='Ghi chú ...'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='flex justify-center gap-2 pt-4'>
                      <Button variant='outlined' size='small' onClick={handleCloseRejected}>
                        Cancel
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() => handleRejectedCancelBooking(cancellationInfo.id, note)}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </p>
          </div>
        )}
      </td> */}
    </tr>
  );
};

export default CancellationItem;
