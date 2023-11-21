import { Box } from '@mui/material';

interface PropsType {
  title: string;
}
const HeaderAdmin = ({ title }: PropsType) => {
  return (
    <Box mb='10px'>
      <p className='font-semibold text-xl uppercase text-[#5e40ac]'>{title}</p>
    </Box>
  );
};
export default HeaderAdmin;
