import { AccountType } from '@/@types/manageAccount';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { Avatar, Chip, IconButton, Box, Button, Modal } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useState } from 'react';

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
  account: AccountType;
}

const AccountItem = ({ account }: PropsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteAccount = async (acountId: number) => {
    console.log(acountId);
  };

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-cyan-800 '>
        {account.id}
      </th>
      <td className='px-6 py-4'>{account.fullName}</td>
      <td className='px-6 py-4'>{account.email}</td>
      <td className='px-6 py-4'>{account.phoneNumber ? account.phoneNumber : 'Chưa có'}</td>
      <td className='px-6 py-4'>{formatDateTime(account.createdAt)}</td>

      <td className='px-6 py-4'>
        <Avatar alt={account.fullName} src={account.avatarUrl} />
      </td>
      <td className='px-6 py-4'>
        {account.isHost ? (
          <Chip label='Chủ nhà' sx={{ backgroundColor: '#efe1f5', color: '#b33871' }} />
        ) : (
          <Chip label='Khách' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />
        )}
      </td>
      <td className='px-6 py-4'>
        <IconButton onClick={handleOpen}>
          <BlockIcon sx={{ color: '#ef3751' }} />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <p className='text-gray-700'>
              Bạn có chắc chắn muốn cấm tài khoản với email là{' '}
              <Chip label={account.email} sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} /> không?
            </p>
            <div className='pt-4 flex justify-end gap-4'>
              <Button variant='outlined' size='small' onClick={handleClose}>
                cancel
              </Button>
              <Button variant='contained' size='small' onClick={() => handleDeleteAccount(account.id)}>
                Xóa
              </Button>
            </div>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};

export default AccountItem;
