import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PropsContact } from '@/@types/chat';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);
interface MessageProps {
  selectedUser: PropsContact | null;
}
const TextInput: React.FC<MessageProps> = ({ selectedUser }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const accessToken: string | null = useSelector((state: RootState) => state.auth.accessToken);
  const [message, setMessage] = useState('');
  // const [chatMessages, setChatMessages] = useState([]);
  const initializeConnection = async () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://pbl6.whitemage.tech/chathub', {
        accessTokenFactory: () => (accessToken ? accessToken : Promise.reject('Access token is null.')),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    setConnection(newConnection);
    newConnection
      .start()
      .then(() => {
        console.log('Connected!');
      })
      .catch((err) => {
        console.error(err.toString());
      });
  };

  const sendMessage = () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected && message) {
      connection.invoke('SendMessageToUser', selectedUser?.id.toString(), message);
      setMessage('');
      // .catch(error => console.error("Error invoking SendMessageToUser:", error));
    } else {
      console.error('SignalR connection not in a valid state.');
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
  const classes = useStyles();
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete='off'>
        <TextField
          id='standard-text'
          label='Nhập chat ở đây'
          className={classes.wrapText}
          margin='normal'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant='contained' color='primary' className={classes.button} onClick={sendMessage}>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};

export default TextInput;
