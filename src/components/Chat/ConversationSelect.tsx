import { PropsContact } from '@/@types/chat';
import { Avatar } from '@mui/material';
// import { useRouter } from 'next/router';
// import { useNavigate } from 'react-router-dom';

interface ConversationSelectProps extends PropsContact {
  onSelectUser: () => void;
  isSelected: boolean;
}

const ConversationSelect: React.FC<ConversationSelectProps> = ({
  id,
  fullName,
  avatarUrl,
  lastMessage,
  lastMessageTime,
  onSelectUser,
  isSelected,
}) => {
  console.log('user:', isSelected);
  return (
    <div
      className={`flex items-center cursor-pointer p-2 break-all border-b-2 border-solid hover:bg-gray-200 ${
        isSelected ? 'bg-gray-200' : ''
      }`}
      onClick={onSelectUser}
    >
      <Avatar src={avatarUrl} className='m-3' />
      <div className='grid grid-cols-1'>
        <span className='font-medium'>{fullName}</span>
        <div className='inline-flex gap-4 font-light text-sm'>
          <span className='overflow-hidden max-w-[90px] whitespace-nowrap text-ellipsis'>{lastMessage}</span>
          <span className=''>{lastMessageTime}</span>
        </div>
      </div>
    </div>
  );
};
export default ConversationSelect;
