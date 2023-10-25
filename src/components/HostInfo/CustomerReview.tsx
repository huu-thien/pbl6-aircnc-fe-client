import { ReviewHostType } from '@/@types/review';
import { getHostReviews } from '@/services/HostService/hostService';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';

interface PropsType {
  hostId: number;
}

const CustomerReview = ({ hostId }: PropsType) => {
  const [listReview, setListReview] = useState<ReviewHostType[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getListReview(hostId);
  }, [hostId]);

  const getListReview = async (hostId: number) => {
    try {
      const response = await getHostReviews(hostId);
      if (response && response.status === 200) {
        setListReview(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const firstThreeCustomersReiew = listReview.slice(0, 3);
  return (
    <div className='py-4'>
      <h2 className='font-semibold text-2xl text-cyan-700 py-4'>Đánh giá về Ngọc</h2>
      <div className='grid grid-cols-3 gap-4'>
        {firstThreeCustomersReiew.map((review, index) => (
          <ReviewItem
            key={`${review.reviewerName}_${index}`}
            content={review.content}
            reviewerAvatarUrl={review.reviewerAvatarUrl}
            reviewerName={review.reviewerName}
            reviewTime={review.reviewTime}
            rating={review.rating}
          />
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
              {listReview.map((review, index) => (
                <ReviewItem
                  key={`${review.reviewerName}_${index}`}
                  content={review.content}
                  reviewerAvatarUrl={review.reviewerAvatarUrl}
                  reviewerName={review.reviewerName}
                  reviewTime={review.reviewTime}
                  rating={review.rating}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerReview;
