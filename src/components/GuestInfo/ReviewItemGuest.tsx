import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade, Modal, Box, Backdrop, IconButton, Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import { deleteReviewGuest } from '@/services/GuestService/guestService';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
interface PropsType {
  content: string;
  reviewerAvatarUrl: string;
  reviewerName: string;
  reviewTime: string;
  rating: number;
  userId: number;
  hostId: number;
  reviewId: number;
  setPostReviewUpdate: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getListReview: (guestId: number, page: number) => Promise<void>;
  guestId: number;
}

const ReviewItemGuest = ({
  content,
  reviewerAvatarUrl,
  reviewerName,
  reviewTime,
  rating,
  userId,
  hostId,
  reviewId,
  setPostReviewUpdate,
  setCurrentPage,
  getListReview,
  guestId,
}: PropsType) => {
  const userIdLogin = useSelector((state: RootState) => state.auth.user?.id) || null;

  const yellowStars = Math.round(rating); // Số ngôi sao màu vàng
  const grayStars = 5 - yellowStars; // Số ngôi sao màu xám
  const yellowStarArray = Array(yellowStars).fill('yellow');
  const grayStarArray = Array(grayStars).fill('gray');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const response = await deleteReviewGuest(reviewId);
      if (response && response.status === 204) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xóa đánh giá của bạn',
            success: 'Xóa đánh giá thành công',
          })
          .then(() => {
            setPostReviewUpdate((prev) => prev + 1);
            setCurrentPage(1);
            handleClose();
            getListReview(guestId, 1);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='shadow-md p-4 rounded-lg'>
      <div className='m-2'>
        <div className='flex gap-4 items-center'>
          <Link to={`/host/${hostId}`}>
            <img src={reviewerAvatarUrl} alt={reviewerName} className='w-[70px] h-[70px] rounded-full' />
          </Link>
          <div className=''>
            <p className='font-semibold pb-2'>{reviewerName}</p>
            <p className='font-thin text-gray-400 text-xs'>{formatDateTime(reviewTime)}</p>
          </div>
        </div>
        <p className='font-light text-justify text-sm text-gray-500 pt-4 line-clamp-3 min-h-[76px]'>"{content}"</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex'>
          {yellowStarArray.map((_, index) => (
            <StarIcon key={`review_${index}`} sx={{ color: '#feb207' }} />
          ))}
          {grayStarArray.map((_, index) => (
            <StarIcon key={`review_${index}`} sx={{ color: '#eaeaea' }} />
          ))}
        </div>
        {userId === userIdLogin && (
          <>
            <IconButton aria-label='delete' onClick={handleOpen}>
              <DeleteIcon sx={{ color: '#c92327 ' }} />
            </IconButton>
            <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <p>Bạn có chắc chắn muốn xóa đánh giá này không ?</p>
                  <div className='pt-4 flex justify-center gap-4'>
                    <Button variant='outlined' size='small' onClick={handleClose}>
                      Không
                    </Button>
                    <Button variant='contained' size='small' onClick={() => handleDeleteReview(reviewId)}>
                      Có
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewItemGuest;
