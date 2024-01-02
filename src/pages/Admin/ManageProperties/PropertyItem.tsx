import { Chip, IconButton, Box, Button, Modal } from '@mui/material';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { PropertyType } from '@/@types/property';
// import BlockIcon from '@mui/icons-material/Block';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import { postConfirmProperty, postRejectdProperty } from '@/services/Admin/ManageProperties/manageProperies';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
  property: PropertyType;
  getListProperty: (currentPage: number, status: string) => Promise<void>;
  status: string;
  currentPage: number;
}

const PropertyItem = ({ property, getListProperty, status, currentPage }: PropsType) => {
  // const [openBlockModal, setOpenBlockModal] = useState<boolean>(false);
  // const handleCloseBlockModal = () => setOpenBlockModal(false);
  // const handleOpenBlockModal = () => setOpenBlockModal(true);

  const [openConfirmProperty, setOpenConfirmProperty] = useState<boolean>(false);
  const handleCloseConfirmProperty = () => setOpenConfirmProperty(false);
  const handleOpenConfirmProperty = () => setOpenConfirmProperty(true);

  const [openRejectedProperty, setOpenRejectedProperty] = useState<boolean>(false);
  const handleCloseRejectedProperty = () => setOpenRejectedProperty(false);
  const handleOpenRejectedProperty = () => setOpenRejectedProperty(true);

  const [reasonRejected, setReasonRejected] = useState<string>('');

  const handleConfirmedProperty = async (propertyId: number) => {
    try {
      const response = await postConfirmProperty(propertyId);
      if (response && response.status === 204) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xử lý !',
            success: 'Đã phê duyệt phòng !',
          })
          .then(() => {
            getListProperty(currentPage, status);
          });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectedProperty = async (propertyId: number) => {
    if (reasonRejected.length === 0) {
      toast.error('Bạn phải nhập lý do từ chối ');
    } else {
      try {
        console.log(propertyId);
        const response = await postRejectdProperty(propertyId, { reason: reasonRejected });
        if (response && response.status === 204) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang xử lý !',
              success: 'Đã từ chối yêu cầu tạo phòng !',
            })
            .then(() => {
              getListProperty(currentPage, status);
            });
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <td className='px-6 my-6'>{property.id}</td>
      <td className='px-6 my-6 line-clamp-1'>{property.title}</td>
      <td className='px-6 my-6'>{formatMoney(property.pricePerNight)}</td>
      <td className='px-6 my-6'>{formatMoney(property.cleaningFee)}</td>
      <td className='px-6 my-6 line-clamp-1'>{property.address}</td>
      <td className='px-6 my-6 '>{property.hostName}</td>
      <td className='px-6 my-6'>
        {property.status === 'Pending' && (
          <Chip label='Chờ duyệt' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
        )}
        {property.status === 'Approved' && (
          <Chip label='Đã duyệt' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
        )}
        {property.status === 'Rejected' && (
          <Chip label='Thất bại' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
        {property.status === 'Available' && (
          <Chip label='Có sẵn' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
        )}
        {property.status === 'Unavailable' && (
          <Chip label='Không có sẵn' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
        )}
      </td>
      <td className='px-6 my-6 '>
        <Link to={`/detail-room/${property.id}`}>
          <IconButton>
            <InfoIcon sx={{ color: '#0071a7' }} />
          </IconButton>
        </Link>
      </td>
      <td className='px-6 my-4 flex'>
        {property.status === 'Pending' && (
          <div className='flex gap-2'>
            <>
              <Button variant='outlined' size='small' onClick={handleOpenConfirmProperty}>
                Duyệt phòng
              </Button>
              <Modal
                open={openConfirmProperty}
                onClose={handleCloseConfirmProperty}
                aria-labelledby='modal-modal-confirm'
                aria-describedby='modal-modal-confirm'
              >
                <Box sx={style}>
                  <p className='pb-4 text-cyan-700 font-medium'>
                    Bạn có chắc muốn phê duyệt và cho phép phòng này hoạt động không ?
                  </p>
                  <div>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Người dùng sẽ thấy được phòng này !
                    </Alert>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Người dùng có thể đặt phòng này !
                    </Alert>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Bạn vẫn có thể thu hồi quyền hoạt động bằng lệnh cấm !
                    </Alert>
                  </div>
                  <div className='flex items-center justify-center gap-4 pt-4'>
                    <Button variant='outlined' size='small' onClick={handleCloseConfirmProperty}>
                      Cancel
                    </Button>
                    <Button variant='contained' size='small' onClick={() => handleConfirmedProperty(property.id)}>
                      Duyệt
                    </Button>
                  </div>
                </Box>
              </Modal>
              <Button variant='outlined' size='small' onClick={handleOpenRejectedProperty}>
                Từ chối
              </Button>
              <Modal
                open={openRejectedProperty}
                onClose={handleCloseRejectedProperty}
                aria-labelledby='modal-modal-Rejected'
                aria-describedby='modal-modal-Rejected'
              >
                <Box sx={style}>
                  <p className='pb-4 text-cyan-700 font-medium'>
                    Bạn có chắc muốn xóa bỏ yêu cầu tạo phòng này không ?
                  </p>
                  <div>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Người dùng sẽ không thấy được phòng này !
                    </Alert>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Người dùng không thể đặt phòng này !
                    </Alert>
                    <Alert severity='info' sx={{ my: 2 }}>
                      Lệnh từ chối sẽ được thông báo đến người tạo phòng !
                    </Alert>
                    <textarea
                      rows={4}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none mt-4'
                      placeholder='Lý do từ chối ...'
                      value={reasonRejected}
                      onChange={(e) => setReasonRejected(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='flex items-center justify-center gap-4 pt-4'>
                    <Button variant='outlined' size='small' onClick={handleCloseRejectedProperty}>
                      Cancel
                    </Button>
                    <Button variant='contained' size='small' onClick={() => handleRejectedProperty(property.id)}>
                      Từ chối
                    </Button>
                  </div>
                </Box>
              </Modal>
            </>
          </div>
        )}
        {/* {property.status === 'Approved' && (
          <div className='flex gap-2'>
            <>
              <IconButton onClick={handleOpenBlockModal}>
                <BlockIcon sx={{ color: '#ef3751' }} />
              </IconButton>
              <Modal
                open={openBlockModal}
                onClose={handleCloseBlockModal}
                aria-labelledby='modal-modal-block'
                aria-describedby='modal-modal-block'
              >
                <Box sx={style}>
                  <p>Bạn có chắc muốn cấm phòng này hoạt động không ?</p>
                  <div className='flex items-center justify-center gap-4 pt-4'>
                    <Button variant='outlined' size='small' onClick={handleCloseBlockModal}>
                      Cancel
                    </Button>
                    <Button variant='contained' size='small'>
                      Cấm
                    </Button>
                  </div>
                </Box>
              </Modal>
            </>
          </div>
        )} */}
      </td>
    </tr>
  );
};

export default PropertyItem;
