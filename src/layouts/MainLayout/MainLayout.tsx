import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ReactNode } from 'react';

type propTypes = {
  page: ReactNode;
};

const MainLayout = ({ page }: propTypes) => {
  return (
    <div>
      <Header />
      <div className='mx-auto w-full max-w-[1440px] mt-[80px]'>{page}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
