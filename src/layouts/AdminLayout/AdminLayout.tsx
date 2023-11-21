import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageNotPermission from '@/src/assets/images/not-permission.png';
import { Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '@/store';
import AdminSidebar from '@/components/Admin/SideBar';
import AdminTopbar from '@/components/Admin/Topbar';

const AdminLayout = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  console.log('role: ' + role);

  return (
    <div>
      {role === 'Admin' ? (
        <div className='flex relative h-full bg-[#f4efff]'>
          <AdminSidebar />
          <main className='h-full w-full bg-[#f4efff]'>
            <AdminTopbar />
            <Outlet />
          </main>
        </div>
      ) : (
        <div className='px-5 md:px-10 pb-5 md:pb-0 bg-gradient bg-no-repeat mt-24'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='pt-10'>
              <div className='grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 '>
                <div className=''>
                  <h1 className='font-bold text-cyan-700 mb-12 text-4xl md:text-4xl text-center'>
                    Bạn không có quyền truy cập liên kết này 👘
                  </h1>
                  <Alert sx={{ mb: 4 }} severity='error'>
                    Bạn vừa truy cập vào liên kết dành cho admin !
                  </Alert>
                  <Alert sx={{ mb: 4 }} severity='success'>
                    Quay lại và trải nghiệm dịch vụ tuyệt vời mà chúng tôi mang đến !
                  </Alert>
                  <Button
                    sx={{ height: '60px' }}
                    fullWidth
                    variant='outlined'
                    size='large'
                    startIcon={<ArrowBackIcon />}
                  >
                    <Link to='/'>Trở về trang chủ</Link>
                  </Button>
                </div>
                <div className='max-[991px]:mx-auto max-[991px]:max-w-[720px]'>
                  <img src={ImageNotPermission} alt='not-permission' className='inline-block max-w-full rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
