import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto w-full max-w-7xl min-h-[1000px] mt-[80px]">Main content</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
