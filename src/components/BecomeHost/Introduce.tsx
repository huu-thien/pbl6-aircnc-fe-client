import BecomeHostBanner from '@/assets/images/become-host-banner.webp';
const introduce = [
  {
    title: 'Nhận sự hướng dẫn riêng từ một Chủ nhà siêu cấp - VIP PRO HOST',
    describe:
      'Chúng tôi sẽ kết nối bạn với một Chủ nhà siêu cấp trong khu vực của bạn, người sẽ hướng dẫn bạn từ câu hỏi đầu tiên cho đến vị khách đầu tiên qua tính năng trò chuyện.',
  },
  {
    title: 'Vị khách có kinh nghiệm cho lượt đặt phòng đầu tiên của bạn',
    describe:
      'Với lượt đặt phòng đầu tiên, bạn có thể lựa chọn chào đón một khách có kinh nghiệm, đã có ít nhất 3 kỳ ở và lịch sử hoạt động tốt trên AirCnC. Hãy tạo phòng ngay.',
  },
  {
    title: 'Hỗ trợ đặc biệt từ AirCnC và đăng ký dễ dàng với AirCnC Setup',
    describe:
      'Chỉ cần nhấn nút là Chủ nhà mới có thể liên hệ với nhân viên Hỗ trợ cộng đồng được đào tạo đặc biệt, có thể trợ giúp về mọi vấn đề, từ sự cố tài khoản cho đến hỗ trợ thanh toán.',
  },
];
const Introduce = () => {
  return (
    <div className='pt-4'>
      <div className='flex justify-center mb-5'>
        <img src={BecomeHostBanner} alt='Become Host banner' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-12'>
        {introduce.map((prop, propIndex) => (
          <div key={propIndex} className='py-4'>
            <h2 className='font-semibold text-cyan-700 pb-4'>{prop.title}</h2>
            <p className='font-thin text-gray-600'>{prop.describe}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Introduce;
