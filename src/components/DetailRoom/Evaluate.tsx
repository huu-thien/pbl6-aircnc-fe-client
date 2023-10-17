import { Avatar } from '@mui/material';
const evaluate = [
  {
    alt: 'DoanQuoc',
    src: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    content:
      'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!',
  },
  {
    alt: 'NguyenHuuThien',
    src: 'https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg',
    content:
      'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!',
  },
  {
    alt: 'DoanQuoc',
    src: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    content:
      'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!',
  },
  {
    alt: 'NguyenHuuThien',
    src: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    content:
      'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!',
  },
];
const Evaluate = () => {
  return (
    <div className='pt-6'>
      <h2 style={{ fontSize: '18px', marginBottom: 10 }}>Đánh giá</h2>
      <div className='grid grid-cols-2 gap-5'>
        {evaluate.map((prop, propIndex) => (
          <div key={propIndex}>
            <div className='flex items-center gap-4 p-3'>
              <Avatar alt={prop.alt} src={prop.src} />
              <p>{prop.alt}</p>
            </div>
            <p className='font-thin text-gray-500 px-4 italic text-md'>"{prop.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evaluate;
