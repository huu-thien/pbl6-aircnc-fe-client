import React, { useEffect, useRef, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import MessageLeft from '@/components/Chat/Message/MessageLeft';
import MessageRight from '@/components/Chat/Message/MessageRight';
import { PropsContact, PropsMessage } from '@/@types/chat';
import { getMessagesByUserId } from '@/services/Chat/chatService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import * as signalR from '@microsoft/signalr';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import GifBoxIcon from '@mui/icons-material/GifBox';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '97%',
      maxWidth: '100%',
      maxHeight: '97%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container: {
      width: '100%',
      height: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc(100% - 20px)',
      margin: '5px',
      overflowY: 'scroll',
      height: 'calc(100% - 20px)',
      borderBottom: '1px solid #999',
    },
    wrapText: {
      width: '100%',
    },
  }),
);

interface MessageProps {
  selectedUser: PropsContact | null;
  getListContacts: () => Promise<void>;
}

const Message: React.FC<MessageProps> = ({ selectedUser, getListContacts }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const classes = useStyles();
  const [messages, setMessages] = useState<PropsMessage[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const accessToken: string | null = useSelector((state: RootState) => state.auth.accessToken);
  const [message, setMessage] = useState('');
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser?.id);
    initializeConnection();
  }, [selectedUser, selectedUser?.id]);
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  });

  const getMessages = async (userId: number) => {
    try {
      const response = await getMessagesByUserId(userId);
      if (response && response.status === 200) {
        setMessages(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initializeConnection = async () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://pbl6.whitemage.tech/chathub', {
        accessTokenFactory: () => (accessToken ? accessToken : Promise.reject('Access token is null.')),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    newConnection.on('ReceiveMessage', () => {
      if (selectedUser) getMessages(selectedUser?.id);
      console.log('messages:',messages,'id :',selectedUser?.id);
      
      getListContacts();
      console.log('Nhan tin nhan:');
    });
    newConnection
      .start()
      .then(() => {
        console.log('Connected!');
      })
      .catch((err) => {
        console.error(err.toString());
      });
    setConnection(newConnection);
  };
  const sendMessage = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected && message) {
      connection
        .invoke('SendMessageToUser', selectedUser?.id.toString(), message)
        .then(() => {
          setMessages([...messages, { senderId: Number(user?.id), receiverId: selectedUser?.id, content: message }]);
          // console.log('tin nhan :',messages);
          setMessage('');
        })
        .catch((error) => console.error('Error invoking SendMessageToUser:', error));
    } else {
      console.error('SignalR connection not in a valid state.');
    }
  };
  const handleSendIcon = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected && message.length === 0) {
      connection
        .invoke('SendMessageToUser', selectedUser?.id.toString(), '❤️')
        .then(() => {
          setMessages([...messages, { senderId: Number(user?.id), receiverId: selectedUser?.id, content: message }]);
          // console.log('tin nhan :',messages);
          
          setMessage('');
        })
        .catch((error) => console.error('Error invoking SendMessageToUser:', error));
    } else {
      console.error('SignalR connection not in a valid state.');
    }
  };
  // useEffect(() => {
  //   initializeConnection();
  //   return () => {
  //     if (connection && connection.state === signalR.HubConnectionState.Connected) {
  //       connection.stop();
  //     }
  //   };
  // }, []);
  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <div id='style-1' className={classes.messagesBody} ref={scrollableDivRef}>
          {messages.map((message) => {
            if (selectedUser && message.receiverId == user?.id) {
              return <MessageLeft key={message.id} message={message.content} photoURL={selectedUser.avatarUrl} />;
            } else if (selectedUser && message.senderId == user?.id) {
              return <MessageRight key={message.id} message={message.content} />;
            }
            return null;
          })}
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className=''>
            <IconButton>
              <AddCircleIcon sx={{ color: '#0084ff' }} />
            </IconButton>
            <IconButton>
              <CollectionsIcon sx={{ color: '#0084ff' }} />
            </IconButton>
            <IconButton>
              <GifBoxIcon sx={{ color: '#0084ff' }} />
            </IconButton>
          </div>
          <div className='flex: 1'>
            <TextField
              id='standard-text'
              label='Aa'
              className={classes.wrapText}
              margin='normal'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                const keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode === 13) {
                  sendMessage();
                }
              }}
              fullWidth
              // sx={{ width: '900px !important' }}
            />
          </div>
          <div className=''>
            {message.length > 0 ? (
              <Button variant='contained' color='primary' onClick={sendMessage}>
                <SendIcon />
              </Button>
            ) : (
              <>
                <IconButton onClick={handleSendIcon}>
                  <FavoriteIcon sx={{ color: '#f8312f' }} />
                </IconButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
