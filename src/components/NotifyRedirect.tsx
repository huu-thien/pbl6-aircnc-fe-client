import { useEffect, useState } from 'react';

const NotifyRedirect = () => {
  const [second, setSecond] = useState(20);
  useEffect(() => {
    const secondInterval = setInterval(() => {
      if (second > 0) {
        setSecond((second) => second - 1);
      }
    }, 1000);
    return () => {
      clearInterval(secondInterval);
    };
  }, [second]);
  return <p className='text-lg text-center text-cyan-700 pt-6'>Bạn sẽ quay lại trang chủ trong {second} giây nữa</p>;
};

export default NotifyRedirect;
