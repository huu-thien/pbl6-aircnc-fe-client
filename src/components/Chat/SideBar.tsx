import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ConversationSelect from './ConversationSelect';
import { PropsContact } from '@/@types/chat';
import { getContacts } from '@/services/Chat/chatService';
import { differentTime } from '@/helpers/DifferentTime/differentTime';
const avatarUrl = 'https://res.cloudinary.com/ds7fwcwvz/image/upload/v1700037881/avatar/e3236e45-ad10-476a-83a9-236360df1504-avartar.png'
const SideBar = ({onSelectUser}) => {
    const [isOpenDialog,setIsOpenDialog]=useState(false);
    const [recipientEmail,setRecipientEmail]=useState('');
    const [listContacts, setListContacts] = useState<PropsContact[]>([]);
    useEffect(() => {
        getListContacts();
      }, []);
    
      const getListContacts = async () => {
        try {
          const response = await getContacts();
          if (response && response.status === 200) {
            setListContacts(response.data);
            console.log('response:',response.data);
            
          }
        } catch (error) {
          console.log(error);
        }
      };
    const toggleDialog = (isOpen: boolean) => {
        setIsOpenDialog(isOpen)
        if (!isOpen) setRecipientEmail('');
    }
    const closeDialog = () =>{
        toggleDialog(false)
    }
    const createConversation = ()=>{
        console.log('Đang tạo hội thoại mới');
        closeDialog();
    }
  return (
    <div className="h-full overflow-y-scroll border-r border-whitesmoke p-0 w-96 max-w-sm">
        <div className="flex sticky justify-between items-center h-20 border-b border-whitesmoke top-0 bg-white z-10">
            <Tooltip title='quocdoan10b3@gmail.com' placement='right'>
                <Avatar className='cursor-pointer hover:opacity-80' src={avatarUrl}/>
            </Tooltip>
            <div>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <HomeIcon/>
                </IconButton>
            </div>
        </div>
        <div className="flex items-center">
            <SearchIcon/>
            <input className="outline-none border-none flex-1 mt-2 mb-1" type="text"  placeholder='Tìm kiếm theo email'/>
        </div >
        <Button className="w-full border-t border-whitesmoke border-b" onClick={()=>{
            toggleDialog(true)
        }}>
            Tạo cuộc hội thoại mới
        </Button>
        { listContacts.length > 0 ?(
            <>
                { listContacts.map((contact) => (
                    <ConversationSelect
                        key={contact.id}
                        id = {contact.id}
                        fullName={contact.fullName}
                        avatarUrl={contact.avatarUrl}
                        lastMessage={contact.lastMessage}
                        lastMessageTime={differentTime(contact.lastMessageTime)}
                        onSelectUser={()=> onSelectUser(contact)}
                    />
                ))}
            </>
        ):(
            <div className='text-center mt-2'>Bạn chưa có tin nhắn nào</div>
        )}
        

        <Dialog open={isOpenDialog} onClose={closeDialog}>
            <DialogTitle>Cuộc hội thoại mới</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hãy nhập địa chỉ email của người dùng bạn muốn nhắn tin !
                </DialogContentText>
                <TextField
                    autoFocus
                    label='Địa chỉ email'
                    type='email'
                    fullWidth
                    variant='standard'
                    value={recipientEmail}
                    onChange={event => {
                        setRecipientEmail(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button disabled={!recipientEmail} onClick={createConversation}>OK</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default SideBar