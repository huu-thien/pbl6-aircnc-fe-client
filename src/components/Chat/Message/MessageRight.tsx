// MessageRight.tsx
import React from 'react';
import { useStyles } from './MessageType';

interface MessageRightProps {
  message?: string;
  timestamp?: string;
}

const MessageRight: React.FC<MessageRightProps> = (props) => {
  const { message = 'no message', timestamp = '' } = props;
  const classes = useStyles();

  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};

export default MessageRight;
