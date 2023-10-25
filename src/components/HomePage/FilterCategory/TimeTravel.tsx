import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface PropsType {
  setTimeStart: React.Dispatch<React.SetStateAction<string>>;
  setTimeEnd: React.Dispatch<React.SetStateAction<string>>;
}

const TimeTravel = ({ setTimeStart, setTimeEnd }: PropsType) => {
  const handleDateStartChange = (date) => {
    setTimeStart(
      `${new Date(String(date)).getDate()}/${new Date(String(date)).getMonth() + 1}/${new Date(
        String(date),
      ).getFullYear()}`,
    );
  };
  const handleDateEndChange = (date) => {
    setTimeEnd(
      `${new Date(String(date)).getDate()}/${new Date(String(date)).getMonth() + 1}/${new Date(
        String(date),
      ).getFullYear()}`,
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ mt: -1, minWidth: 200, mr: 0 }}>
        <DatePicker label='Ngày đi' onChange={handleDateStartChange} />
      </DemoContainer>
      <DemoContainer components={['DatePicker']} sx={{ mt: -1, minWidth: 200, mr: 0 }}>
        <DatePicker label='Ngày về' onChange={handleDateEndChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimeTravel;
