import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
interface PropsType {
  setTimeStart: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTimeEnd: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TimeTravel = ({ setTimeStart, setTimeEnd }: PropsType) => {
  const currentDate = dayjs(); // Ngày hiện tại

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateStartChange = (date: any) => {
    setTimeStart(
      `${new Date(String(date)).getMonth() + 1}/${new Date(String(date)).getDate()}/${new Date(
        String(date),
      ).getFullYear()}`,
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateEndChange = (date: any) => {
    setTimeEnd(
      `${new Date(String(date)).getMonth() + 1}/${new Date(String(date)).getDate()}/${new Date(
        String(date),
      ).getFullYear()}`,
    );
  };

  const shouldDisableDate = (date: Date) => {
    return currentDate.isAfter(dayjs(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ mt: -1, width: 200 }}>
        <DatePicker label='Ngày đi' onChange={handleDateStartChange} shouldDisableDate={shouldDisableDate} />
      </DemoContainer>
      <DemoContainer components={['DatePicker']} sx={{ mt: -1, width: 200 }}>
        <DatePicker label='Ngày về' onChange={handleDateEndChange} shouldDisableDate={shouldDisableDate} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimeTravel;
