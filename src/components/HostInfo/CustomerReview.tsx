import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React, { useState } from 'react'

const customersReview = [
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  },
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  },
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  },
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  },
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  },
  {
    src:'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    alt:'AvartarOfPhuong',
    name:'Phương',
    dateReivew: '08/09/2023',
    contentReview: 'Thời gian lưu trú của Ngọc thật tuyệt vời. Cô ấy không chỉ là một chủ nhà tuyệt vời, mà cô ấy còn giúp chúng tôi theo dõi điện thoại của tôi khi tôi để nó trong taxi. Tiếng Anh của cô ấy thật tuyệt vời và căn phòng cực kỳ đẹp. Rất khuyên dùng! 10/10'
  }
]
const CustomerReview = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const firstThreeCustomersReiew = customersReview.slice(0,3);
  return (
    <div className='grid gap-5 mb-5 mt-2'>
      <h2 className='font-semibold text-2xl'>Đánh giá về Ngọc</h2>
      <div className='flex justify-between'>
        { firstThreeCustomersReiew.map((customerReview,index) => (
          <Box
            sx={{
            width: 300,
            height: 300,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            boxShadow: 13,
            }}
            key={index}
          >
            <div className='m-2'>
              <div className='inline-flex'>
                <img
                  src={customerReview.src}
                  alt={customerReview.alt}
                  style={{ width: '50px', height: '50px' , margin:'5px',borderRadius:'50%'}}
                />
                <div className='mt-1'>
                  <p className=''>{customerReview.name}</p>
                  <p className='font-thin'>{customerReview.dateReivew}</p>
                </div>
              </div>
              <p className='font-light text-justify'>
                {customerReview.contentReview}
              </p>
            </div>         
          </Box>
        ))}

      </div>
      <div>  
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Hiển thị thêm đánh giá
        </Button>
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
        >
          
          <DialogActions className=''>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
          <h2 className='text-center font-medium text-xl'>Tất cả đánh giá</h2>
          <DialogContent>
            <div className=''>
            { customersReview.map((customerReview,index) => (
              <Box
                sx={{
                width: 380,
                height: 300,
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: 13,
                }}
                key={index}
              >
                <div className='m-2'>
                  <div className='inline-flex'>
                    <img
                      src={customerReview.src}
                      alt={customerReview.alt}
                      style={{ width: '50px', height: '50px' , margin:'5px',borderRadius:'50%'}}
                    />
                    <div className='mt-1'>
                      <p className=''>{customerReview.name}</p>
                      <p className='font-thin'>{customerReview.dateReivew}</p>
                    </div>
                  </div>
                  <p className='font-light text-justify'>
                    {customerReview.contentReview}
                  </p>
                </div>         
              </Box>
        ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CustomerReview