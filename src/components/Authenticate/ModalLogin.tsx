// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import { LoginData } from '@/shared/types';

// import { Button, Divider, IconButton, TextField } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link, useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ButtonLoginGoogle from '@/components/Authenticate/ButtonLoginGoogle';
// import { initialValues, LoginSchema } from '@/helpers/AuthenticateValidate/LoginValidate';
// import { postLogin } from '@/services/AuthService/authService';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { saveUserLogin } from '@/redux-toolkit/auth.slice';
// const ModalLogin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   // set show password
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };
//   const handleFormSubmit = async (values: LoginData) => {
//     const dataLogin = {
//       identifier: values.username,
//       password: values.password,
//     };
//     try {
//       // thiendeptrai/thiendeptrai@gmail.com Thien@123
//       const response = await postLogin(dataLogin);
//       console.log(response);

//       if (response.status === 200) {
//         const { user, accessToken, refreshToken } = response.data;
//         dispatch(saveUserLogin({ user, accessToken, refreshToken }));
//         const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
//         toast
//           .promise(resolveAfter2Sec, {
//             pending: 'Đang tiến hành đăng nhập !',
//             success: 'Đăng nhập thành công !',
//           })
//           .then(() => {
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('accessToken', JSON.stringify(accessToken));
//             localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
//             navigate('/');
//           });
//       }
//     } catch (error) {
//       const rejectAfter2Sec = new Promise((_, reject) => setTimeout(reject, 1400));
//       toast.promise(rejectAfter2Sec, {
//         pending: 'Đang tiến hành đăng nhập !',
//         error: 'Tài khoản hoặc mật khẩu không chính xác !',
//       });
//       throw error;
//     }
//   };
//   return (
//     <div>
//       <h3 className='mt-6 text-blue-800 font-bold text-2xl md:text-3xl'>Đăng nhập với AirCnC 💕</h3>
//       <div className='mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8 '>
//         <div className='text-sm  text-cyan-700'>
//           Bạn chưa có tài khoản ? &nbsp;
//           {/* <span className='underline text-blue-700 cursor-pointer' onClick={() => toggleLoginRegister()}>
//             Đăng kí ngay
//           </span> */}
//         </div>
//       </div>
//       <div className='mx-auto w-full max-w-[400px]'>
//         <div className='mx-auto max-w-[400px] text-left mb-4'>
//           <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={LoginSchema}>
//             {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
//               <form onSubmit={handleSubmit} name='form-login' method='post'>
//                 <div className='relative'>
//                   <TextField
//                     sx={{
//                       fontFamily: 'Lexend',
//                       width: `100%`,
//                       marginBottom: '20px',
//                     }}
//                     id='username'
//                     label='Username or Email'
//                     variant='standard'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.username}
//                     error={!!touched.username && !!errors.username}
//                     helperText={touched.username && errors.username}
//                   />
//                 </div>
//                 <div className='relative mb-2'>
//                   <TextField
//                     sx={{
//                       fontFamily: 'Lexend',
//                       width: `100%`,
//                       marginBottom: '20px',
//                     }}
//                     id='password'
//                     type={showPassword ? 'text' : 'password'}
//                     label='Password'
//                     variant='standard'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.password}
//                     error={!!touched.password && !!errors.password}
//                     helperText={touched.password && errors.password}
//                   />
//                   <IconButton
//                     sx={{
//                       position: 'absolute',
//                       right: '0',
//                       top: '10px',
//                     }}
//                     aria-label='toggle password visibility'
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </div>
//                 <Button
//                   sx={{
//                     width: '100%',
//                     height: '50px',
//                   }}
//                   variant='contained'
//                   size='large'
//                   type='submit'
//                 >
//                   Login
//                 </Button>
//               </form>
//             )}
//           </Formik>
//           <Divider sx={{ mt: '8px', color: '#ff385c' }} />
//           <ButtonLoginGoogle />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalLogin;
