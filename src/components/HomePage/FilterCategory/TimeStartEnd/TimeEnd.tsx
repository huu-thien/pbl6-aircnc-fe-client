import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

type PropTypes = {
  setDayEnd: React.Dispatch<React.SetStateAction<string>>;
};

const TimeEnd = ({ setDayEnd }: PropTypes) => {
  const [, setDateStart] = useState(Date.now);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const handleDateChange = (date) => {
    setDateStart(date);
    setDay(new Date(String(date)).getDate());
    setMonth(new Date(String(date)).getMonth() + 1);
    setYear(new Date(String(date)).getFullYear());
  };
  const endTime = `${day}/${month}/${year}`;
  setDayEnd(endTime);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ mt: -1, minWidth: 200, mr: 0 }}>
        <DatePicker label="Ngày về" onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimeEnd;
