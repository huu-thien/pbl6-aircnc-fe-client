import Header from '@/components/Header/Header';
import { ReactNode } from 'react';

type propTypes = {
  page: ReactNode;
};

const ChatLayout = ({ page }: propTypes) => {
  return (
    <div className='h-screen overflow-y-hidden'>
      <Header />
      <div className='mx-auto w-full mt-[80px]'>{page}</div>
    </div>
  );
};

export default ChatLayout;
