import { useState } from "react";

const IntroduceOfHost = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="justify-between mb-5">
      <h1 className="font-bold text-3xl mt-5 mb-5">Thông tin về Ngọc</h1>
      <p>
      Xin chào, tên tôi là Ngọc hoặc Sophie. 
      Sinh ra và được nuôi dưỡng ở Đà Lạt luôn là lòng biết ơn của tôi. 
      Gia đình tôi có một trang trại nhỏ và một số ngôi nhà nhỏ để chia sẻ hòa bình, thiên nhiên và không khí trong lành với những người khác.{' '}
      
        {showMore && (
          <span>
            Đó là không gian mà tôi có thể chia sẻ sự quan tâm tuyệt vời của tôi đối với lịch sử đặc biệt và sự quyến rũ tự nhiên của Đà Lạt với bạn bè tương lai. 
          </span>
        )}
      </p>
      <button onClick={toggleShowMore} style={{fontStyle:'italic', marginTop:'10px'}}>
        {showMore ? 'Ẩn bớt' : 'Đọc thêm'}
      </button>
    </div>
  )
}

export default IntroduceOfHost