import { Avatar } from '@material-ui/core';
import Message from './Message/Message';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';

import { PropsContact } from '@/@types/chat';
interface ConversationScreenProps {
  selectedUser: PropsContact | null;
  getListContacts: () => Promise<void>;
}
const ConversationScreen: React.FC<ConversationScreenProps> = ({ selectedUser, getListContacts }) => {
  // const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className='flex flex-col h-screen w-full'>
      {selectedUser && (
        <>
          <div className=' bg-[#f5f7fa] flex items-center px-4 h-20 border-b border-whitesmoke w-full'>
            <>
              <Avatar src={selectedUser?.avatarUrl} />
              <div className='ml-4 flex-grow'>
                <h3 className='mb-1'>{selectedUser?.fullName}</h3>
              </div>
            </>
            <>
              <IconButton>
                <CallIcon sx={{ color: '#0084ff' }} />
              </IconButton>
              <IconButton>
                <VideocamIcon sx={{ color: '#0084ff' }} />
              </IconButton>
              <IconButton>
                <InfoIcon sx={{ color: '#0084ff' }} />
              </IconButton>
            </>
          </div>
          <Message selectedUser={selectedUser} getListContacts={getListContacts} />
        </>
      )}
      {!selectedUser && (
        <div className='flex items-center justify-center w-full h-full'>
          <p className='font-bold text-xl text-cyan-700'>Chọn hộp thoại</p>
        </div>
      )}
    </div>
  );
};

export default ConversationScreen;
