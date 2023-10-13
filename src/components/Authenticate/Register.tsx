import React, { useState } from 'react';
import { Formik } from 'formik';
import { RegisterData } from '@/shared/types';

import { Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { initialValues, RegisterSchema } from '@/helpers/AuthenticateValidate/RegisterValidate';

type PropsType = {
  toggleLoginRegister: () => void;
};

const Register = ({ toggleLoginRegister }: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleFormSubmit = (values: RegisterData) => {
    if (values.confirmPassword) {
      delete values.confirmPassword;
    }
    console.log(values);
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
        <h3 className="mt-6 text-blue-800  font-bold text-3xl md:text-3xl">Đăng kí với AirCnC 💕</h3>
        <div className="mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8">
          <div className="text-sm  text-cyan-700">
            Bạn đã có tài khoản ? &nbsp;
            <span className="underline text-blue-700 cursor-pointer" onClick={() => toggleLoginRegister()}>
              Đăng nhập ngay
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mx-auto max-w-[400px] text-left mb-4">
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={RegisterSchema}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} name="wf-form-password" method="get">
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="fullName"
                      label="Full Name"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      error={!!touched.fullName && !!errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </div>
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="email"
                      label="Email"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </div>
                  <div className="relative">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="username"
                      label="Username"
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
                  <div className="relative mb-2">
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        width: `100%`,
                        marginBottom: '20px',
                      }}
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      error={!!touched.confirmPassword && !!errors.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '10px',
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>

                  <Button
                    sx={{
                      height: '50px',
                    }}
                    className="w-full"
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
