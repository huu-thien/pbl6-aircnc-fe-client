// MessageLeft.tsx
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useStyles } from './MessageType';

interface MessageLeftProps {
  message?: string;
  timestamp?: string;
  photoURL?: string;
  displayName?: string;
}

const MessageLeft: React.FC<MessageLeftProps> = (props) => {
  const { message = 'no message', timestamp = '', photoURL = '', displayName = '' } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.messageRow}>
        <Avatar alt={displayName} className={classes.orange} src={photoURL}></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageLeft;
