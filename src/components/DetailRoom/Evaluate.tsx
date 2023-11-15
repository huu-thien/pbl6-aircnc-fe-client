import { PropertyReview, GeneralScore } from '@/@types/property';
import { deleteReviewProperty, getGeneralScore, getPropertyReview } from '@/services/PropertyService/propertyService';
import { Avatar, Fade, Modal, Box, Backdrop, IconButton, Button } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { ChangeEvent, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DeleteIcon from '@mui/icons-material/Delete';

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
  propertyId: number;
  updateReview: number;
}
const Evaluate = ({ propertyId, updateReview }: PropsType) => {
  const userIdLogin = useSelector((state: RootState) => state.auth.user?.id) || null;

  const [listReview, setListReview] = useState<PropertyReview[]>([]);
  const [generalScore, setGeneralScore] = useState<GeneralScore>({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    checkIn: 0,
    value: 0,
    location: 0,
    numberOfReviews: 0,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getListReviewProperty(propertyId, currentPage);
    getGeneralScoreProperty(propertyId);
  }, [propertyId, currentPage, updateReview]);

  const getListReviewProperty = async (id: number, currentPage: number) => {
    const response = await getPropertyReview(id, currentPage);
    if (response && response.status === 200) {
      setListReview(response.data.data);
      setTotalPages(response.data.totalPages);
    }
  };
  const getGeneralScoreProperty = async (id: number) => {
    const response = await getGeneralScore(id);
    if (response && response.status === 200) {
      setGeneralScore(response.data);
    }
  };

  const handleDeleteReview = async (id: number) => {
    try {
      const response = await deleteReviewProperty(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(listReview);

  return (
    <div className='pt-6'>
      {/* general */}
      {generalScore.numberOfReviews > 0 && (
        <>
          <h2 className='text-xl text-cyan-800 font-bold pb-2 pt-5'>
            Chấm điểm trung bình của khách ({generalScore.numberOfReviews} đánh giá)
          </h2>
          <div className='flex items-center justify-between py-4'>
            <div className='w-full pr-4'>
              {/* <p className='text-sm pb-2'>Xếp hạng tổng thể</p> */}
              <>
                <div className='flex my-1 items-center gap-2'>
                  <EditLocationIcon sx={{ color: '#c92327', fontSize: 16 }} />
                  <div className='relative w-full h-1.5 bg-[#c1c1c1]'>
                    <div
                      className={`absolute top-0 h-full w-[${Math.floor(
                        (generalScore.location / 5) * 100,
                      )}%] bg-[#c92327]`}
                    ></div>
                  </div>
                </div>
                <div className='flex my-1 items-center gap-2'>
                  <CleaningServicesIcon sx={{ color: '#feb207', fontSize: 16 }} />
                  <div className='relative w-full h-1.5 bg-[#c1c1c1]'>
                    <div
                      className={`absolute top-0 h-full w-[${Math.floor(
                        (generalScore.cleanliness / 5) * 100,
                      )}%] bg-[#feb207]`}
                    ></div>
                  </div>
                </div>
                <div className='flex my-1 items-center gap-2'>
                  <MessageIcon sx={{ color: '#28a745', fontSize: 16 }} />
                  <div className='relative w-full h-1.5 bg-[#c1c1c1]'>
                    <div
                      className={`absolute top-0 h-full w-[${Math.floor(
                        (generalScore.communication / 5) * 100,
                      )}%] bg-[#28a745]`}
                    ></div>
                  </div>
                </div>
                <div className='flex my-1 items-center gap-2'>
                  <CheckCircleIcon sx={{ color: '#1e5bf8', fontSize: 16 }} />
                  <div
                    className={`relative w-full h-1.5 bg-[#c1c1c1] before:absolute before:top-0 before:h-full before:w-[${Math.floor(
                      (generalScore.checkIn / 5) * 100,
                    )}%] before:bg-[#1e5bf8]`}
                  >
                    {/* <div
                    className={`absolute top-0 h-full w-[${Math.floor(
                      (generalScore.checkIn / 5) * 100,
                    )}%] bg-[#1e5bf8]`}
                  ></div> */}
                  </div>
                </div>
                <div className='flex my-1 items-center gap-2'>
                  <AccessTimeFilledIcon sx={{ color: '#27a645', fontSize: 16 }} />
                  <div
                    className={`relative w-full h-1.5 bg-[#c1c1c1] before:absolute before:top-0 before:h-full before:w-[${Math.floor(
                      (generalScore.accuracy / 5) * 100,
                    )}%] before:bg-[#1e5bf8]`}
                  >
                    {/* <div
                    className={`absolute top-0 h-full w-[${Math.floor(
                      (generalScore.accuracy / 5) * 100,
                    )}%] bg-[#27a645]`}
                  ></div> */}
                  </div>
                </div>
                <div className='flex my-1 items-center gap-2'>
                  <LocalOfferIcon sx={{ color: '#371881', fontSize: 16 }} />

                  <div className='relative w-full h-1.5 bg-[#c1c1c1]'>
                    <div
                      className={`absolute top-0 h-full w-[${Math.floor(
                        (generalScore.value / 5) * 100,
                      )}%] bg-[#feb207]`}
                    ></div>
                  </div>
                </div>
              </>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Vị trí</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.location.toFixed(2)}</p>
              <p>
                <EditLocationIcon sx={{ color: '#c92327', fontSize: 32 }} />
              </p>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Mức độ sạch sẽ</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.cleanliness.toFixed(2)}</p>
              <p>
                <CleaningServicesIcon sx={{ color: '#feb207', fontSize: 32 }} />
              </p>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Giao tiếp</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.communication.toFixed(2)}</p>
              <p>
                <MessageIcon sx={{ color: '#28a745', fontSize: 32 }} />
              </p>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Nhận phòng</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.checkIn.toFixed(2)}</p>
              <p>
                <CheckCircleIcon sx={{ color: '#1e5bf8', fontSize: 32 }} />
              </p>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Độ chính xác</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.accuracy.toFixed(2)}</p>
              <p>
                <AccessTimeFilledIcon sx={{ color: '#27a645', fontSize: 32 }} />
              </p>
            </div>
            <div className='w-full border-l-2 flex flex-col items-start gap-3 pl-4'>
              <p className='text-gray-700'>Giá trị</p>
              <p className='text-3xl text-gray-600 font-thin'>{generalScore.value.toFixed(2)}</p>
              <p>
                <LocalOfferIcon sx={{ color: '#371881', fontSize: 32 }} />
              </p>
            </div>
          </div>
        </>
      )}

      <>
        <h2 className='text-xl text-cyan-800 font-bold pb-2 pt-5'>Đánh giá</h2>
        {generalScore.numberOfReviews > 0 ? (
          <>
            <div className='grid grid-cols-2 gap-5'>
              {listReview &&
                listReview.length > 0 &&
                listReview.map((review, index) => (
                  <div key={`${review.guestName}_${index}`} className='flex flex-col p-2 shadow-md rounded-md'>
                    <div className=''>
                      <div className='flex items-center gap-4 p-3'>
                        <Avatar src={review.guestAvatarUrl} />
                        <div className=' w-full flex justify-between'>
                          <div>
                            <p className='text-cyan-700'>{review.guestName}</p>
                            <p className='text-gray-400 text-xs font-thin'>{formatDateTime(review.reviewTime)}</p>
                          </div>
                          {review.userId === userIdLogin && (
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
                                      <Button
                                        variant='contained'
                                        size='small'
                                        onClick={() => handleDeleteReview(review.id)}
                                      >
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
                      <p className='min-h-[48px] line-clamp-2 font-thin text-gray-500 px-4 italic text-md'>
                        "{review.content}"
                      </p>
                    </div>
                    <div className='pt-2'>
                      <p className='text-center pb-4 text-cyan-700'>Đánh giá trên thang điểm 5</p>
                      <div className='flex items-center justify-center'>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <EditLocationIcon sx={{ color: '#c92327' }} />
                          <span className='pt-1 text-cyan-700'>{review.location}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <CleaningServicesIcon sx={{ color: '#feb207' }} />
                          <span className='pt-1 text-cyan-700'>{review.cleanliness}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <MessageIcon sx={{ color: '#28a745' }} />
                          <span className='pt-1 text-cyan-700'>{review.communication}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <CheckCircleIcon sx={{ color: '#1e5bf8' }} />
                          <span className='pt-1 text-cyan-700'>{review.checkIn}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <AccessTimeFilledIcon sx={{ color: '#27a645' }} />
                          <span className='pt-1 text-cyan-700'>{review.accuracy}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <LocalOfferIcon sx={{ color: '#371881' }} />
                          <span className='pt-1 text-cyan-700'>{review.value}</span>
                        </div>
                        <div className='text-sm px-4 text-center flex flex-col'>
                          <StarIcon sx={{ color: '#feb207' }} />
                          <span className='pt-1 text-cyan-700'>{review.averageRating.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className='py-8'>
              <Pagination
                color='primary'
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                sx={{ width: '100%', mx: 'auto' }}
              />
            </div>
          </>
        ) : (
          <p className='text-sm text-gray-500'>Chưa có đánh giá nào !</p>
        )}
      </>
    </div>
  );
};

export default Evaluate;
