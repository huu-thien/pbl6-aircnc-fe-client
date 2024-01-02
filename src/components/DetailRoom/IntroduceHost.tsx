import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { getHostDetail } from '@/services/HostService/hostService';
import { useEffect, useState } from 'react';
import { HostType } from '@/@types/host';
import * as signalR from '@microsoft/signalr';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Propstype {
  hostId: number;
}
const IntroduceHost = ({ hostId }: Propstype) => {
  const [hostInfo, setHostInfo] = useState<HostType>({
    address: '',
    avatarUrl: '',
    city: '',
    id: 0,
    introduction: '',
    joinedAt: '',
    name: '',
    numberOfReviews: 0,
    rating: 0,
    userId: 0,
  });
  const accessToken: string | null = useSelector((state: RootState) => state.auth.accessToken);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const toggleDialog = (isOpen: boolean) => {
    setIsOpenDialog(isOpen);
    if (!isOpen) setMessage('');
  };
  const closeDialog = () => {
    toggleDialog(false);
  };
  useEffect(() => {
    getHostInfoApi(hostId);
  }, [hostId]);

  const getHostInfoApi = async (hostId: number) => {
    try {
      const response = await getHostDetail(hostId);
      if (response && response.status === 200) {
        setHostInfo(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const sendMessage = () => {
    if (message) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl('http://pbl6.whitemage.tech/chathub', {
          accessTokenFactory: () => (accessToken ? accessToken : Promise.reject('Access token is null.')),
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .build();

      connection
        .start()
        .then(() => {
          console.log('Connected!');
          if (connection && connection.state === signalR.HubConnectionState.Connected) {
            console.log('id dc chon la:', hostInfo.userId);

            connection
              .invoke('SendMessageToUser', hostInfo.userId.toString(), message)
              .then(() => {
                setMessage('');
              })
              .catch((error) => console.error('Error invoking SendMessageToUser:', error));
          } else {
            console.error('SignalR connection not in a valid state.');
          }
          closeDialog();
        })
        .catch((err) => {
          console.error(err.toString());
        });
    }
  };
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col items-center'>
          <Avatar alt='Travis Howard' src={hostInfo.avatarUrl} sx={{ width: 70, height: 70 }} />
          <p className='pt-2'>Host {hostInfo.name}</p>
        </div>
        <Button
          variant='contained'
          sx={{ height: 50 }}
          onClick={() => {
            toggleDialog(true);
          }}
          size='small'
        >
          Nhắn tin cho chủ nhà
        </Button>
        <Dialog open={isOpenDialog} onClose={closeDialog}>
          <DialogTitle>Nhắn tin cho chủ nhà</DialogTitle>
          <DialogContent>
            <DialogContentText>Hãy nhắn tin đầu tiên với chủ nhà !</DialogContentText>
            <TextField
              id='standard-text'
              label='Aa'
              margin='normal'
              autoFocus
              fullWidth
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                const keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode === 13) {
                  sendMessage();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button disabled={!setMessage} onClick={sendMessage}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant='contained' sx={{ height: 50 }}>
          <Link to={`/host/${hostId}`}>Thông tin của chủ nhà</Link>
        </Button>
      </div>
      <p className='font-thin text-gray-500 pt-2 italic'>{hostInfo.introduction}</p>
      <div className='flex text-gray-800'>
        <div className='pt-4 pr-4 '>
          <RateReviewIcon sx={{ color: '#743de3' }} />
          <span className='pl-2'>{hostInfo.numberOfReviews > 0 ? hostInfo.numberOfReviews : 'Chưa có'} đánh giá</span>
        </div>
        <Divider orientation='vertical' />
        <div className='pt-4'>
          <StarIcon sx={{ color: '#feb207' }} />
          <span className='pl-2'>{hostInfo.rating > 0 ? hostInfo.rating.toFixed(2) : 'Chưa có'} điểm rating</span>
        </div>
      </div>
    </div>
  );
};

export default IntroduceHost;
