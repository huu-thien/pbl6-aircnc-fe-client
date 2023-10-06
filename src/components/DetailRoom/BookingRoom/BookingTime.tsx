import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const BookingTime = () => {
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const [dayStart, setDayStart] = useState(0);
  const [monthStart, setMonthStart] = useState(0);
  const [yearStart, setYearStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [monthEnd, setMonthEnd] = useState(0);
  const [yearEnd, setYearEnd] = useState(0);

  const handleDateStartChange = (date) => {
    if (dateEnd && date > dateEnd) {
      return;
    }
    setDateStart(date);
    setDayStart(new Date(String(date)).getDate());
    setMonthStart(new Date(String(date)).getMonth() + 1);
    setYearStart(new Date(String(date)).getFullYear());
  };
  const handleDateEndChange = (date) => {
    if (dateStart && date < dateStart) {
      return;
    }
    setDateEnd(date);
    setDayEnd(new Date(String(date)).getDate());
    setMonthEnd(new Date(String(date)).getMonth() + 1);
    setYearEnd(new Date(String(date)).getFullYear());
  };

  const StartTime = `${dayStart}/${monthStart}/${yearStart}`;
  const EndTime = `${dayEnd}/${monthEnd}/${yearEnd}`;

  if (yearStart != 0) console.log(StartTime);
  if (yearEnd != 0) console.log(EndTime);
  return (
    <div className="flex gap-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} sx={{ minWidth: 200 }}>
          <DatePicker label="Ngày đi" onChange={handleDateStartChange} />
        </DemoContainer>
        <DemoContainer components={['DatePicker']} sx={{ minWidth: 200 }}>
          <DatePicker label="Ngày về" onChange={handleDateEndChange} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default BookingTime;
