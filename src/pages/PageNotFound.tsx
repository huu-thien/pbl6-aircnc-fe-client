import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import PageNotFoundImage from '@/assets/images/page-not-found.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageNotFound = () => {
  const [second, setSecond] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const secondInterval = setInterval(() => {
      if (second > 0) {
        setSecond((second) => second - 1);
      }
    }, 1000);
    const idTimeOUt = setTimeout(() => {
      navigate('/');
    }, 20000);
    return () => {
      clearTimeout(idTimeOUt);
      clearInterval(secondInterval);
    };
  }, [navigate]);
  return (
    <section className="block bg-gradient bg-no-repeat">
      <p className="text-lg text-center text-cyan-700 pt-6">
        Bạn sẽ quay lại trang chủ trong {second} giây nữa
      </p>
      <div className="px-5 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="grid items-center max-[991px]:justify-items-start grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-20">
              <div className="max-[991px]:max-w-[720px]">
                <h1 className="font-bold text-cyan-700 mb-8 text-4xl md:text-6xl">
                  Page Not Found 💓
                </h1>

                <Alert sx={{ mb: 2 }} severity="warning">
                  Bạn vừa truy cập vào url không tồn tại hoặc bạn không có quyền
                  truy cập
                </Alert>
                <Alert sx={{ mb: 2 }} severity="info">
                  Chỉ những người có quyền mới được truy cập vào liên kết này
                </Alert>
                <Alert sx={{ mb: 2 }} severity="success">
                  Quay lại và trải nghiệm dịch vụ tuyệt vời mà chúng tôi mang
                  đến
                </Alert>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                >
                  <Link to="/">Go to back</Link>
                </Button>
              </div>
              <div className="">
                <img
                  src={PageNotFoundImage}
                  // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT154ypO8dVXTJTjuzx33EpBITiz80Wr4DcrQOujQ2EH1fA3OzyobMWFW2kWrqfH1VlagM&usqp=CAU'

                  alt="page-not-found"
                  className="mx-auto inline-block h-full w-full max-w-[640px] object-cover rounded-2xl"
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
