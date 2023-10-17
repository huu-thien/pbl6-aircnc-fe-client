import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState } from 'react';

const customersReview = [
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
  {
    src: 'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt: 'AvartarOfPhuong',
    name: 'Phương',
    dateReivew: '08/09/2023',
    contentReview:
      'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10',
  },
];
const CustomerReview = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const firstThreeCustomersReiew = customersReview.slice(0, 3);
  return (
    <div className='py-4'>
      <h2 className='font-semibold text-2xl text-cyan-700'>Đánh giá về Ngọc</h2>

      <div className='grid grid-cols-3 gap-4'>
        {firstThreeCustomersReiew.map((customerReview, index) => (
          <div className='shadow-md p-4 rounded-lg' key={index}>
            <div className='m-2'>
              <div className='flex gap-4 items-center'>
                <img src={customerReview.src} alt={customerReview.alt} className='w-[70px] h-[70px] rounded-full' />
                <div className=''>
                  <p className='font-semibold'>{customerReview.name}</p>
                  <p className='font-thin text-gray-400 text-xs'>{customerReview.dateReivew}</p>
                </div>
              </div>
              <p className='font-light text-justify text-sm text-gray-500 pt-4'>"{customerReview.contentReview}"</p>
            </div>
          </div>
        ))}
      </div>
      <div className='py-4'>
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          Hiển thị thêm đánh giá
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
          <DialogActions className=''>
            <Button onClick={handleClose} color='primary'>
              Đóng
            </Button>
          </DialogActions>
          <h2 className='text-center font-medium text-xl'>Tất cả đánh giá</h2>
          <DialogContent>
            <div className=''>
              {customersReview.map((customerReview, index) => (
                <div className='shadow-md p-4 rounded-lg' key={index}>
                  <div className='m-2'>
                    <div className='flex gap-4 items-center'>
                      <img
                        src={customerReview.src}
                        alt={customerReview.alt}
                        className='w-[70px] h-[70px] rounded-full'
                      />
                      <div className=''>
                        <p className='font-semibold'>{customerReview.name}</p>
                        <p className='font-thin text-gray-400 text-xs'>{customerReview.dateReivew}</p>
                      </div>
                    </div>
                    <p className='font-light text-justify text-sm text-gray-500 pt-4'>
                      "{customerReview.contentReview}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerReview;
