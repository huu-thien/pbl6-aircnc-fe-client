import { ReviewHostType } from '@/@types/review';
import {
  getCheckUserStayedInPropertyOfHost,
  getHostReviews,
  postCreateReviewHost,
} from '@/services/HostService/hostService';
import { Button, Dialog, DialogActions, DialogContent, Pagination, Rating } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import { ContentReviewHostType } from '@/@types/host';

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
  hostId: number;
  name: string;
  setPostReviewUpdate: React.Dispatch<React.SetStateAction<number>>;
}

const CustomerReview = ({ hostId, name, setPostReviewUpdate }: PropsType) => {
  const [listReview, setListReview] = useState<ReviewHostType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isStayed, setIsStayed] = useState<boolean>(true);

  const [open, setOpen] = useState(false);

  const [scoreHost, setScoreHost] = useState<number | null>(3);
  const [hoverHost, setHoverHost] = useState(-1);

  const [contentReview, setContentReview] = useState('');
  useEffect(() => {
    getListReview(hostId, currentPage);
  }, [hostId, currentPage]);

  const getListReview = async (hostId: number, page: number) => {
    try {
      const response = await getHostReviews(hostId, page);
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
    setScoreHost(3);
    setContentReview('');
    setOpen(false);
  };

  const CheckUserStayedInPropertyOfHost = async (hostId: number) => {
    try {
      const response = await getCheckUserStayedInPropertyOfHost(hostId);
      if (response && response.status === 200) {
        setIsStayed(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostReviewHost = async () => {
    if (contentReview !== '' && scoreHost !== null) {
      try {
        const dataPostReview: ContentReviewHostType = {
          rating: scoreHost || 0,
          content: contentReview,
        };
        const response = await postCreateReviewHost(hostId, dataPostReview);
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
              getListReview(hostId, 1);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Bạn phải nhập đủ thông tin để đánh giá !');
    }
  };

  useEffect(() => {
    CheckUserStayedInPropertyOfHost(hostId);
  }, [hostId]);


  return (
    <div className='py-4'>
      <h2 className='font-semibold text-2xl text-cyan-700 py-4'>Đánh giá về {name}</h2>
      <>
        <div className='grid grid-cols-3 gap-4'>
          {listReview.map((review, index) => (
            <ReviewItem
              key={`${review.reviewerName}_${index}`}
              content={review.content}
              reviewerAvatarUrl={review.reviewerAvatarUrl}
              reviewerName={review.reviewerName}
              reviewTime={review.reviewTime}
              rating={review.rating}
              userId={review.userId}
              reviewId={review.id}
              setPostReviewUpdate={setPostReviewUpdate}
              setCurrentPage={setCurrentPage}
              getListReview={getListReview}
              hostId={hostId}
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
            Đánh giá chủ nhà
          </Button>
          <Dialog open={open} onClose={handleCancelReview} maxWidth='xs' fullWidth>
            <DialogActions className=''>
              <Button onClick={handleCancelReview} color='primary'>
                Đóng
              </Button>
            </DialogActions>
            <h2 className='text-center font-medium text-xl text-cyan-700'>Đánh giá chủ nhà {name}</h2>
            <DialogContent>
              <div>
                <p className='pb-2 text-cyan-700'>Sự hài lòng của bạn</p>
                <div className='flex items-center gap-4 py-1'>
                  <p className='text-gray-700 min-w-[120px]'>Địa điểm:</p>
                  <Rating
                    name='scoreHost'
                    value={scoreHost}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(_event, newValue) => {
                      setScoreHost(newValue);
                    }}
                    onChangeActive={(_event, newHover) => {
                      setHoverHost(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                  />
                  {scoreHost !== null && (
                    <p className='text-xs text-cyan-700 '>{labels[hoverHost !== -1 ? hoverHost : scoreHost]}</p>
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
        <p className='text-sm text-gray-700'>Hãy thuê phòng của {name} và quay lại đánh giá !</p>
      )}
    </div>
  );
};

export default CustomerReview;
