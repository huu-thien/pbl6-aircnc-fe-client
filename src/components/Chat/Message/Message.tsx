import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
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
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc(100% - 20px)',
      margin: '5px',
      overflowY: 'scroll',
      height: 'calc(100% - 20px)',
    },
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        margin: theme.spacing(1),
    },
  })
);

interface MessageProps {
  selectedUser: PropsContact | null;
}

const Message: React.FC<MessageProps> = ({ selectedUser }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const classes = useStyles();
  const [messages, setMessages] = useState<PropsMessage[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const accessToken:string|null = useSelector((state: RootState) => state.auth.accessToken)
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (selectedUser)
    getMessages(selectedUser?.id);
  }, [selectedUser?.id]);

  const getMessages = async (userId:number) => {
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
      .withUrl("http://pbl6.whitemage.tech/chathub", {
        accessTokenFactory: () => accessToken ? accessToken : Promise.reject("Access token is null."),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    setConnection(newConnection);
    console.log('connection: ',newConnection);
    
    newConnection.start()
      .then(() => {
        console.log("Connected!");
      })
      .catch((err) => {
        console.error(err.toString());
      });
  };
  const sendMessage = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected && message) {
      connection.invoke("SendMessageToUser", selectedUser?.id.toString(), message)
      .then(() => {
        setMessages([...messages, { senderId: Number(user?.id), receiverId: selectedUser?.id, content: message }]);
        console.log(messages);
        
        setMessage('');
      })
      .catch(error => console.error("Error invoking SendMessageToUser:", error));
    } else {
      console.error("SignalR connection not in a valid state.");
    }
  };
  useEffect(() => {
    initializeConnection();
    return () => {
      if (connection && connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, []);
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id="style-1" className={classes.messagesBody}>
          {messages.map((message) => {
            if (selectedUser && message.receiverId == user?.id) {
              return <MessageLeft key={message.id} message={message.content} photoURL={selectedUser.avatarUrl} />;
            } else if (selectedUser && message.senderId == user?.id){
              return <MessageRight key={message.id} message={message.content} />;
            }
            return null; 
          })}
        </Paper>
        <>
        <form className={classes.wrapForm}  noValidate autoComplete="off">
          <TextField
            id="standard-text"
            label="Nhập chat ở đây"
            className={classes.wrapText}
            margin='normal'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={sendMessage}>
            <SendIcon />
          </Button>
        </form>
      </>
      </Paper>
    </div>
  );
};

export default Message;
