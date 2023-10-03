import Box from '@mui/material/Box';
import TimeStart from './TimeStartEnd/TimeStart';
import TimeEnd from './TimeStartEnd/TimeEnd';
export default function TimeStartEnd() {
  return (
    <Box sx={{ m:1,minWidth:400}}>
      <div className="flex justify-between items-center" >
        <TimeStart />
        <TimeEnd />
      </div>
    </Box>
    
  );
}