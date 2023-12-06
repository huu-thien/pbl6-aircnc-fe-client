import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ConversationSelect from './ConversationSelect';
import { PropsContact } from '@/@types/chat';
import { differentTime } from '@/helpers/DifferentTime/differentTime';
import { useState } from 'react';

interface Propstype {
  onSelectUser: (user: PropsContact) => void;
  listContacts: PropsContact[];
}

const SideBar = ({ onSelectUser, listContacts }: Propstype) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const toggleDialog = (isOpen: boolean) => {
    setIsOpenDialog(isOpen);
    if (!isOpen) setRecipientEmail('');
  };
  const closeDialog = () => {
    toggleDialog(false);
  };
  const createConversation = () => {
    console.log('Đang tạo hội thoại mới');
    closeDialog();
  };
  return (
    <div className='overflow-y-scroll border border-whitesmoke p-0 w-96 max-w-sm z-1'>
      <div>
        <div className='flex justify-between items-center h-20 border-b border-whitesmoke bg-white z-10 p-6'>
          <p className='font-bold'>Đoạn chat</p>
          <div>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </div>
        </div>
        <div className='text-center py-4'>
          <Button
            variant='contained'
            className='border-t border-whitesmoke border-b'
            onClick={() => {
              toggleDialog(true);
            }}
            size='small'
          >
            Tạo cuộc hội thoại mới
          </Button>
          <Dialog open={isOpenDialog} onClose={closeDialog}>
            <DialogTitle>Cuộc hội thoại mới</DialogTitle>
            <DialogContent>
              <DialogContentText>Hãy nhập địa chỉ email của người dùng bạn muốn nhắn tin !</DialogContentText>
              <TextField
                autoFocus
                label='Địa chỉ email'
                type='email'
                fullWidth
                variant='standard'
                value={recipientEmail}
                onChange={(event) => {
                  setRecipientEmail(event.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button disabled={!recipientEmail} onClick={createConversation}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className='flex items-center px-4 py-1'>
          {/* <SearchIcon /> */}
          <TextField
            className='outline-none border-none flex-1 mb-1'
            type='text'
            placeholder='Tìm kiếm theo email'
            size='small'
          />
        </div>
      </div>
      <div className='pt-2'>
        {listContacts.length > 0 ? (
          <>
            {listContacts.map((contact) => (
              <ConversationSelect
                key={contact.id}
                id={contact.id}
                fullName={contact.fullName}
                avatarUrl={contact.avatarUrl}
                lastMessage={contact.lastMessage}
                lastMessageTime={differentTime(contact.lastMessageTime)}
                onSelectUser={() => onSelectUser(contact)}
              />
            ))}
          </>
        ) : (
          <div className='text-center mt-2'>Bạn chưa có tin nhắn nào</div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
