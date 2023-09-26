
import { googleLogout } from '@react-oauth/google';
import { Button } from '@mui/material';

const ButtonLogout = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('Logout success');
          googleLogout();
        }}
        variant="outlined"
        sx={{
          width: '100%',
          height: '50px',
          mt: '20px ',
        }}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default ButtonLogout;
