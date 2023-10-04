import { useState } from 'react';
import TimeEnd from './TimeStartEnd/TimeEnd';
import TimeStart from './TimeStartEnd/TimeStart';

const TimeTravel = () => {
  const [dayStart, setDayStart] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  console.log('>> Check day start: ', dayStart);
  console.log('>> Check day end: ', dayEnd);

  return (
    <div className="flex gap-2">
      <TimeStart setDayStart={setDayStart} />
      <TimeEnd setDayEnd={setDayEnd} />
    </div>
  );
};

export default TimeTravel;
