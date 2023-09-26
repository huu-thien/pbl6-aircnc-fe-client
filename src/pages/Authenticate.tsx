import { useState } from 'react';
import Login from '@/components/Authenticate/Login';
import Register from '@/components/Authenticate/Register';
import BannerAuthenticatie from '@/assets/images/banner-authenticate.webp';
const Authenticate = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setIsRegister(!isRegister);
  };

  const spaceTop = isLogin && !isRegister ? 'pt-20' : 'pt-12';
  return (
    <div className="px-5 md:px-10 pb-5 md:pb-0 bg-gradient bg-no-repeat">
      <div className="mx-auto w-full max-w-7xl">
        <div className={spaceTop}>
          <div className="grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 ">
            {isLogin && !isRegister && <Login toggleLoginRegister={toggleLoginRegister} />}
            {isRegister && !isLogin && <Register toggleLoginRegister={toggleLoginRegister} />}
            <div className="max-[991px]:mx-auto max-[991px]:max-w-[720px]">
              <img src={BannerAuthenticatie} alt="banner-authenticate" className="inline-block max-w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
