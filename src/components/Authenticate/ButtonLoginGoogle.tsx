import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { postLoginGoogle } from '@/services/AuthService/authService';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { saveUserLogin } from '@/redux-toolkit/auth.slice';
import { useNavigate } from 'react-router-dom';

const ButtonLoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
    onSuccess: async (data) => {
      // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
      // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
      //   .then((response) => response.json())
      //   .then((accessToken) => {
      //     console.log(accessToken);
      //   })
      //   .catch((err) => console.error(err));
      // console.log(data.access_token);
      console.log(data.access_token);

      try {
        const response = await postLoginGoogle({ accessToken: data.access_token });
        // console.log(response);
        if (response.status === 200) {
          const { user, accessToken, refreshToken, role } = response.data;
          dispatch(saveUserLogin({ user, accessToken, refreshToken, role  }));
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang tiến hành đăng nhập !',
              success: 'Đăng nhập thành công !',
            })
            .then(() => {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('accessToken', JSON.stringify(accessToken));
              localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
              localStorage.setItem('role', JSON.stringify(role));
              navigate('/');
            });
        }
      } catch (error) {
        console.log(123);
        console.log(error);
      }
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
