import { Chip, IconButton, Box, Button, Modal } from '@mui/material';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { PropertyType } from '@/@types/property';
import BlockIcon from '@mui/icons-material/Block';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

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
}

const PropertyItem = ({ property }: PropsType) => {
  const [openBlockModal, setOpenBlockModal] = useState<boolean>(false);
  const handleCloseBlockModal = () => setOpenBlockModal(false);
  const handleOpenBlockModal = () => setOpenBlockModal(true);

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <td className='px-6 my-6'>{property.id}</td>
      <td className='px-6 my-6 line-clamp-1'>{property.title}</td>
      <td className='px-6 my-6'>{formatMoney(property.pricePerNight)}</td>
      <td className='px-6 my-6'>{formatMoney(property.cleaningFee)}</td>
      <td className='px-6 my-6 line-clamp-1'>{property.address}</td>
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
        <IconButton>
          <InfoIcon sx={{ color: '#0071a7' }} />
        </IconButton>
      </td>
      <td className='px-6 my-4 flex'>
        {property.status === 'Pending' && (
          <div className='flex gap-2'>
            <>
              <Button variant='outlined' size='small'>
                Duyệt phongf
              </Button>
              <Modal
                open={openBlockModal}
                // onClose={handleCloseResolved}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}></Box>
              </Modal>
            </>
          </div>
        )}
        {property.status === 'Approved' && (
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
        )}
      </td>
    </tr>
  );
};

export default PropertyItem;
