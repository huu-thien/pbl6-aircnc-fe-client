import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BarChartQuantityBooking from '@/components/Admin/Chart/BarChartQuantityBooking';
import PieChartTotalRenevue from '@/components/Admin/Chart/PieChartTotalRenevue';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getStatistics } from '@/services/Admin/RenevueService/renevueService';
import { StatisticType } from '@/@types/statistic';

const Renevue = () => {
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const currentDate = dayjs(); // Ngày hiện tại

  const [dataStatictis, setDataStatictis] = useState<StatisticType>();
  const [totalRenevue, setTotalRenevue] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);

  const [bookingCount, setBookingCount] = useState<number>(0);
  const [cancelBookingBeforeCheckIn, setCancelBookingBeforeCheckIn] = useState<number>(0);
  const [cancelBookingAfterCheckIn, setCancelBookingAfterCheckIn] = useState<number>(0);

  useEffect(() => {
    getStatisticsApi('', '');
  }, []);
  const getStatisticsApi = async (dateStart: string, dateEnd: string) => {
    const response = await getStatistics(dateStart, dateEnd);
    if (response && response.status === 200) {
      setDataStatictis(response.data);
      setTotalRenevue(response.data.totalRevenue);
      setTotalProfit(response.data.totalProfit);
      setBookingCount(response.data.bookingsCount);
      setCancelBookingBeforeCheckIn(response.data.cancelledBookingBeforeCheckInCount);
      setCancelBookingAfterCheckIn(response.data.cancelledBookingAfterCheckInCount);
    }
  };

  const handleRenevue = () => {
    if (dateStart && dateEnd) {
      getStatisticsApi(dayjs(dateStart).format('MM/DD/YYYY'), dayjs(dateEnd).format('MM/DD/YYYY'));
    } else {
      toast.error('Vui lòng chọn mốc thời gian');
    }
  };
  const handleReset = () => {
    getStatisticsApi('', '');
    setDateEnd(null);
    setDateStart(null);
  };

  const handleDateStartChange = (date: Date | null) => {
    if (dateEnd && date && currentDate.isAfter(dayjs(date))) {
      setDateEnd(null);
    }

    if (dateEnd && date && dayjs(date).isSame(dayjs(dateEnd), 'day')) {
      toast.error('Ngày thống kê không được trùng nhau');
      setDateEnd(null);
      setDateStart(null);
    } else {
      setDateStart(date);
    }
  };
  const handleDateEndChange = (date: Date | null) => {
    if (dateStart && date && dayjs(date).isSame(dayjs(dateStart), 'day')) {
      toast.error('Ngày thống kê không được trùng nhau');
      setDateStart(null);
      setDateEnd(null);
    } else {
      if (dateStart && date) {
        const startDate = dayjs(dateStart);
        const endDate = dayjs(date);
        if (startDate.isAfter(endDate)) {
          toast.error('Chọn ngày không hợp lệ');
          setDateStart(null);
          setDateEnd(null);
        } else {
          setDateEnd(date);
        }
      } else {
        setDateEnd(date);
      }
    }
  };
  const shouldDisableDate = (date: Date) => {
    return currentDate.isBefore(dayjs(date));
  };

  return (
    <div>
      <div className='px-4 flex justify-center items-center gap-6'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          Từ ngày
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              // label='Ngày đi'
              value={dateStart}
              onChange={handleDateStartChange}
              shouldDisableDate={shouldDisableDate}
              sx={{ background: '#fff' }}
            />
          </DemoContainer>
          Đến
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              // label='Ngày về'
              value={dateEnd}
              onChange={handleDateEndChange}
              shouldDisableDate={shouldDisableDate}
              sx={{ background: '#fff' }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className='flex items-center gap-2'>
          <Button variant='contained' onClick={handleRenevue}>
            Thống kê
          </Button>
          <Button variant='outlined' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className='p-4 grid grid-cols-2'>
        <Box m='20px'>
          <p className='uppercase font-bold text-[#352069] text-center'>Biểu đồ tổng doanh thu theo loại phòng</p>
          <Box height='60vh'>
            <PieChartTotalRenevue dataStatictis={dataStatictis} totalRenevue={totalRenevue} totalProfit={totalProfit} />
          </Box>
        </Box>
        <div>
          <Box m='20px'>
            <p className='uppercase font-bold text-[#362465] text-center'>Biểu đồ số lượng Booking theo loại phòng</p>
            <Box height='60vh' width='100%'>
              <BarChartQuantityBooking
                dataStatictis={dataStatictis}
                bookingCount={bookingCount}
                cancelBookingBeforeCheckIn={cancelBookingBeforeCheckIn}
                cancelBookingAfterCheckIn={cancelBookingAfterCheckIn}
              />
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Renevue;
