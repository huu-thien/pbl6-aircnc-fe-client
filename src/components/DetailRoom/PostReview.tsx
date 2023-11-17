import { Button, Box, Modal, Fade, Backdrop, Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import { getCheckGuestStayed, postCreateReviewProperty } from '@/services/PropertyService/propertyService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
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
  propertyId: number;
  onUpdateReview: React.Dispatch<React.SetStateAction<number>>;
}

const PostReview = ({ propertyId, onUpdateReview }: PropsType) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isStayed, setIsStayed] = useState<boolean>(true);

  const [scoreLocation, setScoreLocation] = useState<number | null>(3);
  const [hoverLocation, setHoverLocation] = useState(-1);

  const [scoreClean, setScoreClean] = useState<number | null>(3);
  const [hoverClean, setHoverClean] = useState(-1);

  const [scoreCommunication, setScoreCommunication] = useState<number | null>(3);
  const [hoverCommunication, setHoverCommunication] = useState(-1);

  const [scoreCheckIn, setScoreCheckIn] = useState<number | null>(3);
  const [hoverCheckIn, setHoverCheckIn] = useState(-1);

  const [scoreAccuracy, setScoreAccuracy] = useState<number | null>(3);
  const [hoverAccuracy, setHoverAccuracy] = useState(-1);

  const [scoreValue, setScoreValue] = useState<number | null>(3);
  const [hoverValue, setHoverValue] = useState(-1);

  const [contentReview, setContentReview] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleCancel = () => {
    setOpenModal(false);
    setScoreLocation(3);
    setScoreClean(3);
    setScoreCommunication(3);
    setScoreCheckIn(3);
    setScoreAccuracy(3);
    setScoreValue(3);
    setContentReview('');
  };
  const CheckUserStayedInProperty = async (propertyId: number) => {
    try {
      const response = await getCheckGuestStayed(propertyId);
      if(response && response.status === 200) {
        setIsStayed(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePostReview = async () => {
    if (
      scoreClean !== null &&
      scoreCommunication !== null &&
      scoreCheckIn !== null &&
      scoreAccuracy !== null &&
      scoreValue !== null &&
      scoreLocation !== null &&
      contentReview !== ''
    ) {
      try {
        const dataPostReview = {
          cleanliness: scoreClean,
          communication: scoreCommunication,
          checkIn: scoreCheckIn,
          accuracy: scoreAccuracy,
          location: scoreLocation,
          value: scoreValue,
          content: contentReview,
        };
        const response = await postCreateReviewProperty(propertyId, dataPostReview);
        if (response && response.status === 200) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang đăng đánh giá !',
              success: 'Đánh giá thành công !',
            })
            .then(() => {
              handleCancel();
              onUpdateReview((prev) => prev + 1);
            });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error('Bạn cần nhập đầy đủ thông tin để đánh giá !');
    }
  };

  useEffect(() => {
    CheckUserStayedInProperty(propertyId);
  }, [propertyId]);
  // console.log(isStayed);
  
  return (
    <>
      <h2 className='text-xl text-cyan-800 font-bold pb-4 pt-5'>Đánh giá của bạn</h2>
      {user ? (
        <div>
          {isStayed && (
            <>
              <Button variant='outlined' onClick={handleOpen}>
                Thêm đánh giá của bạn
              </Button>
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={openModal}>
                  <Box sx={style}>
                    <div>
                      <p className='pb-2 text-cyan-700'>Chấm điểm theo tiêu chí</p>
                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Địa điểm:</p>
                        <Rating
                          name='scoreLocation'
                          value={scoreLocation}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(_event, newValue) => {
                            setScoreLocation(newValue);
                          }}
                          onChangeActive={(_event, newHover) => {
                            setHoverLocation(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreLocation !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverLocation !== -1 ? hoverLocation : scoreLocation]}
                          </p>
                        )}
                      </div>
                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Vệ sinh:</p>
                        <Rating
                          name='scoreClean'
                          value={scoreClean}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(_event, newValue) => {
                            setScoreClean(newValue);
                          }}
                          onChangeActive={(_event, newHover) => {
                            setHoverClean(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreClean !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverClean !== -1 ? hoverClean : scoreClean]}
                          </p>
                        )}
                      </div>
                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Giao tiếp:</p>
                        <Rating
                          name='scoreCommunication'
                          value={scoreCommunication}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(_event, newValue) => {
                            setScoreCommunication(newValue);
                          }}
                          onChangeActive={(_event, newHover) => {
                            setHoverCommunication(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreCommunication !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverCommunication !== -1 ? hoverCommunication : scoreCommunication]}
                          </p>
                        )}
                      </div>
                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Nhận phòng:</p>
                        <Rating
                          name='scoreCheckIn'
                          value={scoreCheckIn}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(_event, newValue) => {
                            setScoreCheckIn(newValue);
                          }}
                          onChangeActive={(_event, newHover) => {
                            setHoverCheckIn(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreCheckIn !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverCheckIn !== -1 ? hoverCheckIn : scoreCheckIn]}
                          </p>
                        )}
                      </div>
                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Độ chính xác:</p>
                        <Rating
                          name='scoreAccuracy'
                          value={scoreAccuracy}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(__event, newValue) => {
                            setScoreAccuracy(newValue);
                          }}
                          onChangeActive={(__event, newHover) => {
                            setHoverAccuracy(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreAccuracy !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverAccuracy !== -1 ? hoverAccuracy : scoreAccuracy]}
                          </p>
                        )}
                      </div>

                      <div className='flex items-center gap-4 py-1'>
                        <p className='text-gray-700 min-w-[120px]'>Giá trị:</p>
                        <Rating
                          name='scoreValue'
                          value={scoreValue}
                          precision={1}
                          getLabelText={getLabelText}
                          onChange={(_event, newValue) => {
                            setScoreValue(newValue);
                          }}
                          onChangeActive={(_event, newHover) => {
                            setHoverValue(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                        />
                        {scoreValue !== null && (
                          <p className='text-xs text-cyan-700 '>
                            {labels[hoverValue !== -1 ? hoverValue : scoreValue]}
                          </p>
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
                      <Button variant='outlined' onClick={handleCancel}>
                        Hủy
                      </Button>
                      <Button variant='contained' onClick={handlePostReview}>
                        Đánh giá
                      </Button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            </>
          )}
          {!isStayed && <p>Hãy đặt phòng để trải nghiệm và quay lại đây đánh giá !</p>}
        </div>
      ) : (
        <p>Hãy đặt phòng để trải nghiệm và quay lại đây đánh giá !</p>
      )}
    </>
  );
};

export default PostReview;
