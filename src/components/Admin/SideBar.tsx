import { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaymentsIcon from '@mui/icons-material/Payments';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector } from 'react-redux';
import ImageAdminDefault from '@/src/assets/images/admin-default.png';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import { RootState } from '@/store';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GppBadIcon from '@mui/icons-material/GppBad';

interface PropsType {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected }: PropsType) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon} style={{ color: 'red' }}>
      <p>{title}</p>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        height: '100vh',
        '& .pro-sidebar-inner': {
          background: `#362465 !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-menu-item': {
          color: '#abb4c8  !important',
        },
        '& .pro-inner-item': {
          // padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <p className='font-bold text-gray-100'>ADMIN</p>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width={100}
                  height={100}
                  src={user?.avatarUrl || ImageAdminDefault}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <p className='pt-2 font-bold text-gray-100'>{user?.fullName}</p>
              </Box>
            </Box>
          )}
          {/* Menu Item */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <p className='py-2 px-4 text-sm font-bold text-gray-100'>Manage</p>
            <Item
              title='Tài khoản'
              to='/admin-manage-accounts'
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Đơn tạo phòng'
              to='/admin-manage-properties'
              icon={<MeetingRoomIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Đơn hủy booking'
              to='/admin-manage-cancellation'
              icon={<GppBadIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Thanh toán'
              to='admin-manage-payments'
              icon={<PaymentsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <p className='py-2 px-4 text-sm font-bold text-gray-100'>Chart</p>
            {/* <Item
              title='Tổng quan'
              to='admin-chart-quantity-Booking'
              icon={<BarChartIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title='Doanh thu'
              to='admin-chart-renevue'
              icon={<PieChartOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};
export default AdminSidebar;
