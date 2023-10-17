import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';

const ButtonLoginGoogle = () => {
  const login = useGoogleLogin({
    // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
    onSuccess: (tokenResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
        .then((response) => response.json())
        .then((userInfo) => {
          console.log(userInfo);
        })
        .catch((err) => console.error(err));
    },
  });
  return (
    <Button
      onClick={() => login()}
      variant='outlined'
      sx={{
        height: '50px',
        mt: '20px ',
      }}
      fullWidth
      startIcon={<GoogleIcon />}
    >
      Đăng nhập với Google
    </Button>
  );
};

export default ButtonLoginGoogle;
