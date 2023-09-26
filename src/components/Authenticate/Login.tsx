import React, { useState } from 'react';
import { Formik } from 'formik';
import { LoginData } from '@/shared/types';

import { Button, Divider, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ButtonLoginGoogle from '@/components/Authenticate/ButtonLoginGoogle';
import { initialValues, LoginSchema } from '@/helpers/validate/LoginValidate';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type PropsType = {
  toggleLoginRegister: () => void;
};

const Login = ({ toggleLoginRegister }: PropsType) => {
  const navigate = useNavigate();
  // set show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // set show alert
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const handleFormSubmit = (values: LoginData) => {
    if (values) {
      console.log(values);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      setAlertOpen(true);
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="p-6 max-[991px]:w-full rounded-2xl shadow-2xl">
      <div className="text-center">
        <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />}>
          <Link to="/" className=" text-blue-700">
            Về trang chủ
          </Link>
        </Button>
        <h3 className="mt-6 text-blue-800 font-bold text-2xl md:text-3xl">Đăng nhập với AirCnC 💕</h3>
        <div className="mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8 ">
          <div className="text-sm  text-cyan-700">
            Bạn chưa có tài khoản ? &nbsp;
            <span className="underline text-blue-700 cursor-pointer" onClick={() => toggleLoginRegister()}>
              Đăng kí ngay
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mx-auto max-w-[400px] text-left mb-4">
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={LoginSchema}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} name="wf-form-password" method="get">
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="username"
                      label="Username or Email"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </div>
                  <div className="relative mb-2">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '10px',
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                  <Button
                    sx={{
                      width: '100%',
                      height: '50px',
                    }}
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={alertOpen}
              autoHideDuration={2000}
              onClose={handleAlertClose}
            >
              <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
                Đăng nhập thành công
              </Alert>
            </Snackbar>
            <Divider sx={{ mt: '8px', color: '#ff385c' }} />
            <ButtonLoginGoogle />
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                height: '50px',
                mt: '20px ',
              }}
              startIcon={<FacebookIcon />}
            >
              Đăng nhập với Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
