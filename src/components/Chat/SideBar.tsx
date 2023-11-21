import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import ConversationSelect from './ConversationSelect';

const avartarUrl = 'https://res.cloudinary.com/ds7fwcwvz/image/upload/v1700037881/avatar/e3236e45-ad10-476a-83a9-236360df1504-avartar.png'
const SideBar = () => {
    const [isOpenDialog,setIsOpenDialog]=useState(false);
    const [recipientEmail,setRecipentEmail]=useState('');
    const toogleDialog = (isOpen: boolean) => {
        setIsOpenDialog(isOpen)
        if (!isOpen) setRecipentEmail('');
    }
    const clodeDialog = () =>{
        toogleDialog(false)
    }
    const createConversation = ()=>{
        console.log('Đang tạo hội thoại mới');
        clodeDialog();
    }
  return (
    <div className="h-full min-w-max overflow-y-scroll border-r border-whitesmoke p-0">
        <div className="flex sticky justify-between items-center h-20 border-b border-whitesmoke top-0 bg-white z-10">
            <Tooltip title='quocdoan10b3@gmail.com' placement='right'>
                <Avatar className='cursor-pointer hover:opacity-80' src={avartarUrl}/>
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
            toogleDialog(true)
        }}>
            Tạo cuộc hội thoại mới
        </Button>

        <ConversationSelect/>
        <ConversationSelect/>
        <ConversationSelect/>
        <ConversationSelect/>
        <ConversationSelect/>
        <ConversationSelect/>

        <Dialog open={isOpenDialog} onClose={clodeDialog}>
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
                        setRecipentEmail(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={clodeDialog}>Cancel</Button>
                <Button disabled={!recipientEmail} onClick={createConversation}>OK</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default SideBar