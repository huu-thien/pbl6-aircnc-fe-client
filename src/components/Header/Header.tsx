import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo-aircnc.png';
import { Avatar, Button, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import GiteIcon from '@mui/icons-material/Gite';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { postLogout } from '@/services/AuthService/authService';
import { saveLogout } from '@/redux-toolkit/auth.slice';
import { toast } from 'react-toastify';

const Header = () => {
  const userLogin = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const tokenLocal = localStorage.getItem('refreshToken');
    if (tokenLocal !== null) {
      const refreshToken = JSON.parse(tokenLocal);
      try {
        await postLogout({ refreshToken });
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 2000));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang đăng xuất ⌛',
            success: 'Đăng xuất thành công !',
          })
          .then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(saveLogout());
            navigate('/authenticate');
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  return (
    <header className='block h-[70px] sm:h-[80px] shadow-md fixed top-0 left-0 right-0 bg-white z-10'>
      <div className='px-5 md:px-10'>
        <div className='py-4 mx-auto w-full max-w-7xl flex items-center justify-between sm:h-full sm:py-0'>
          <Link to='/'>
            <img src={Logo} alt='logo' className='h-[80px] hidden sm:block' />
          </Link>
          <div className='relative w-full xs:w-[50%] md:max-w-[400px] '>
            <TextField id='search-input' label='Search' variant='outlined' size='small' fullWidth />
            <IconButton sx={{ position: 'absolute', right: '5px' }}>
              <SearchIcon />
            </IconButton>
          </div>
          <div className='flex items-center gap-8'>
            <div className='hidden md:block'>
              <Tooltip title='Trở nhà chủ nhà và kinh doanh' arrow>
                <Button variant='contained' size='medium' endIcon={<GiteIcon />}>
                  <Link to='/become-host'>Become a host</Link>
                </Button>
              </Tooltip>
            </div>
            <span
              className='hidden xs:flex items-center gap-2 border px-2 py-1 rounded-full cursor-pointer'
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon sx={{ color: '#9a9a9a' }} />
              <Avatar
                alt={userLogin?.fullName}
                sx={userLogin ? { width: 30, height: 30, bgcolor: '#1976d2' } : { width: 30, height: 30 }}
                src={userLogin && userLogin.avatarUrl ? `${userLogin?.avatarUrl}` : ``}
              >
                {userLogin && userLogin.avatarUrl ? `` : userLogin?.fullName[0].toUpperCase()}
              </Avatar>
            </span>
            {userLogin && (
              <Menu
                className='rouned-lg'
                id='account-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    mt: 1,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/wishlist'>
                    Danh sách yêu thích
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/bookings'>
                    Quản lý đặt phòng
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/'>
                    Tài khoản
                  </Link>
                </MenuItem>
                <Divider light />
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/help'>
                    Trung tâm trợ giúp
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p className='w-full text-red-600' onClick={handleLogout}>
                    Đăng xuất
                  </p>
                </MenuItem>
              </Menu>
            )}
            {!userLogin && (
              <Menu
                className='rouned-lg'
                id='account-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    mt: 1,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/authenticate'>
                    Đăng nhập
                  </Link>
                </MenuItem>
                <Divider light />
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/become-host'>
                    Cho thuê chỗ ở qua AirCnc
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className='w-full text-cyan-800' to='/help'>
                    Trung tâm trợ giúp
                  </Link>
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
