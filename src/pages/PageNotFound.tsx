import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import PageNotFoundImage from '@/assets/images/page-not-found.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotifyRedirect from '@/components/NotifyRedirect';

const PageNotFound = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const idTimeOUt = setTimeout(() => {
      navigate('/');
    }, 20000);
    return () => {
      clearTimeout(idTimeOUt);
    };
  }, [navigate]);

  return (
    <section className="block bg-gradient bg-no-repeat">
      <NotifyRedirect />
      <div className="px-5 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="">
                <h1 className="font-bold text-cyan-700 mb-8 text-4xl md:text-6xl text-center">Page Not Found 💓</h1>
                <Alert sx={{ mb: 2 }} severity="warning">
                  Bạn vừa truy cập vào liên kết không được quyền truy cập
                </Alert>
                <Alert sx={{ mb: 2 }} severity="info">
                  Chỉ những người có quyền mới được truy cập vào liên kết này
                </Alert>
                <Alert sx={{ mb: 4 }} severity="success">
                  Quay lại và trải nghiệm dịch vụ tuyệt vời mà chúng tôi mang đến
                </Alert>
                <Button sx={{height: "60px"}} fullWidth variant="outlined" size="large" startIcon={<ArrowBackIcon />}>
                  <Link to="/">Go to back</Link>
                </Button>
              </div>
              <div className="">
                <img
                  src={PageNotFoundImage}
                  alt="page-not-found"
                  className="mx-auto inline-block h-full w-full  object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
