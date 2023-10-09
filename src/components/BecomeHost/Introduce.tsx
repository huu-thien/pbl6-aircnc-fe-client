const introduce = [
    {
      title: 'Nhận sự hướng dẫn riêng từ một Chủ nhà siêu cấp',
      describe: 'Chúng tôi sẽ kết nối bạn với một Chủ nhà siêu cấp trong khu vực của bạn, người sẽ hướng dẫn bạn từ câu hỏi đầu tiên cho đến vị khách đầu tiên – qua điện thoại, cuộc gọi video hoặc tính năng trò chuyện.'
    },
    {
      title:'Vị khách có kinh nghiệm cho lượt đặt phòng đầu tiên của bạn',
      describe:'Với lượt đặt phòng đầu tiên, bạn có thể lựa chọn chào đón một khách có kinh nghiệm, đã có ít nhất 3 kỳ ở và lịch sử hoạt động tốt trên Airbnb.'
    },
    {
      title:'Hỗ trợ đặc biệt từ Airbnb',
      describe:'Chỉ cần nhấn nút là Chủ nhà mới có thể liên hệ với nhân viên Hỗ trợ cộng đồng được đào tạo đặc biệt, có thể trợ giúp về mọi vấn đề, từ sự cố tài khoản cho đến hỗ trợ thanh toán.'
    }
  ]
const Introduce = () => {
  return (
    <div className='mt-24 mb-20 grid'>
        <h1 className='text-center font-semibold text-3xl  '>Dễ dàng cho thuê nhà trên AirCnC</h1>
        <div className='flex justify-center mb-5'><img src="https://1office.vn/wp-content/uploads/2022/03/cach-tiep-can-khach-hang-e1646130144649.png" alt="" style={{ width:'75%'}}/></div>
        <div className='grid grid-cols-1 sm:grid-cols-3  gap-5'>
              {
                introduce.map((prop,propIndex)=>(
                  <div key={propIndex} className='block'>
                    <h2 className='font-semibold'>{prop.title}</h2>
                    <p className='font-thin'>{prop.describe}</p>
                  </div>
              ))}
        </div>        
    </div>
  )
}

export default Introduce