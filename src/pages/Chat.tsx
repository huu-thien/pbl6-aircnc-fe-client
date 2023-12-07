import { PropsContact } from '@/@types/chat';
import ConversationScreen from '@/components/Chat/ConversationScreen';
import SideBar from '@/components/Chat/SideBar';
import { getContacts } from '@/services/Chat/chatService';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<PropsContact | null>(null);
  const [listContacts, setListContacts] = useState<PropsContact[]>([]);
  useEffect(() => {
    getListContacts();
  }, []);
  const getListContacts = async () => {
    try {
      const response = await getContacts();
      if (response && response.status === 200) {
        setListContacts(response.data);
        console.log('response 41:', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = (user: PropsContact) => {
    setSelectedUser(user);
  };
  return (
    <div className='flex gap-2 h-screen'>
      {/* <ListUserContact/> */}
      <SideBar onSelectUser={handleSelectUser} listContacts={listContacts} />
      <ConversationScreen selectedUser={selectedUser} getListContacts={getListContacts} />
    </div>
  );
};

export default Chat;
