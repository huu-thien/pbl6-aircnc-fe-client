import { Button, Dialog, DialogActions, DialogContent, Pagination, Rating } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import {
  getCheckGuestStayedInPropertyOfHost,
  getGuestReviews,
  postCreateReviewGuest,
} from '@/services/GuestService/guestService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ContentReviewGuestType } from '@/@types/guest';
import ReviewItemGuest from './ReviewItemGuest';
import { ReviewGuestType } from '@/@types/review';

const labels: { [index: string]: string } = {
  1: 'Quá tệ',
  2: 'Tệ',
  3: 'Hài lòng',
  4: 'Tốt',
  5: 'Quá tuyệt vời',
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
interface PropsType {
  guestId: number;
  name: string;
  setPostReviewUpdate: React.Dispatch<React.SetStateAction<number>>;
}

const HostReview = ({ guestId, name, setPostReviewUpdate }: PropsType) => {
  const userIdLogin = useSelector((state: RootState) => state.auth.user?.id) || null;
  const [listReview, setListReview] = useState<ReviewGuestType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isStayed, setIsStayed] = useState<boolean>(true);

  const [open, setOpen] = useState(false);

  const [scoreGuest, setScoreGuest] = useState<number | null>(3);
  const [hoverGuest, setHoverGuest] = useState(-1);

  const [contentReview, setContentReview] = useState('');
  useEffect(() => {
    getListReview(guestId, currentPage);
  }, [guestId, currentPage]);

  const getListReview = async (guestId: number, page: number) => {
    try {
      const response = await getGuestReviews(guestId, page);
      if (response && response.status === 200) {
        setListReview(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleCancelReview = async () => {
    setScoreGuest(3);
    setContentReview('');
    setOpen(false);
  };

  const CheckGuestStayedInPropertyOfHost = async (guestId: number) => {
    try {
      const response = await getCheckGuestStayedInPropertyOfHost(guestId);
      if (response && response.status === 200) {
        setIsStayed(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostReviewHost = async () => {
    if (contentReview !== '' && scoreGuest !== null) {
      try {
        const dataPostReview: ContentReviewGuestType = {
          rating: scoreGuest || 0,
          content: contentReview,
        };
        const response = await postCreateReviewGuest(guestId, dataPostReview);
        if (response && response.status === 200) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang đăng đánh giá của bạn',
              success: 'Đăng đánh giá thành công',
            })
            .then(() => {
              setPostReviewUpdate((prev) => prev + 1);
              handleCancelReview();
              setCurrentPage(1);
              getListReview(guestId, 1);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Bạn phải nhập đủ thông tin để đánh giá !');
    }
  };
  // console.log(listReview);
  useEffect(() => {
    if (userIdLogin) CheckGuestStayedInPropertyOfHost(guestId);
  }, [guestId]);

  return (
    <div className='py-4'>
      <h2 className='font-semibold text-2xl text-cyan-700 py-4'>Đánh giá về {name}</h2>
      <>
        <div className='grid grid-cols-3 gap-4'>
          {listReview.map((review, index) => (
            <ReviewItemGuest
              key={`${review.reviewerName}_${index}`}
              content={review.content}
              reviewerAvatarUrl={review.reviewerAvatarUrl}
              reviewerName={review.reviewerName}
              reviewTime={review.reviewTime}
              rating={review.rating}
              hostId={review.reviewerId}
              userId={review.userId}
              reviewId={review.id}
              setPostReviewUpdate={setPostReviewUpdate}
              setCurrentPage={setCurrentPage}
              getListReview={getListReview}
              guestId={guestId}
            />
          ))}
        </div>
        <div className='py-4'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </>
      {isStayed ? (
        <div className='py-4'>
          <Button variant='outlined' color='primary' onClick={() => setOpen(true)}>
            Nhận xét về khách
          </Button>
          <Dialog open={open} onClose={handleCancelReview} maxWidth='xs' fullWidth>
            <DialogActions className=''>
              <Button onClick={handleCancelReview} color='primary'>
                Đóng
              </Button>
            </DialogActions>
            <h2 className='text-center font-medium text-xl text-cyan-700'>Nhận xét về khách {name}</h2>
            <DialogContent>
              <div>
                <p className='pb-2 text-cyan-700'>Sự hài lòng của bạn</p>
                <div className='flex items-center gap-4 py-1'>
                  <p className='text-gray-700 min-w-[120px]'>Địa điểm:</p>
                  <Rating
                    name='scoreGuest'
                    value={scoreGuest}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(_event, newValue) => {
                      setScoreGuest(newValue);
                    }}
                    onChangeActive={(_event, newHover) => {
                      setHoverGuest(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                  />
                  {scoreGuest !== null && (
                    <p className='text-xs text-cyan-700 '>{labels[hoverGuest !== -1 ? hoverGuest : scoreGuest]}</p>
                  )}
                </div>
              </div>

              <div>
                <p className='pt-4 pb-2 text-cyan-700'>Nội dung đánh giá</p>
                <textarea
                  rows={4}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none'
                  placeholder='Nội dung đánh giá ...'
                  value={contentReview}
                  onChange={(e) => setContentReview(e.target.value)}
                ></textarea>
              </div>
              <div className='flex justify-end gap-4 pt-4'>
                <Button variant='outlined' onClick={handleCancelReview}>
                  Hủy
                </Button>
                <Button variant='contained' onClick={handlePostReviewHost}>
                  Đánh giá
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <p className='text-sm text-gray-700'>Người này chưa từng ở nhà của bạn !</p>
      )}
    </div>
  );
};

export default HostReview;
