import { PropertyReview } from '@/@types/property';
import { getPropertyReview } from '@/services/PropertyService/propertyService';
import { Avatar } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import StarIcon from '@mui/icons-material/Star';
import { ChangeEvent, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

interface PropsType {
  propertyId: number;
}
const Evaluate = ({ propertyId }: PropsType) => {
  const [listReview, setListReview] = useState<PropertyReview[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    console.log(value);
  };

  useEffect(() => {
    getListReviewProperty(propertyId, currentPage);
  }, [propertyId, currentPage]);

  const getListReviewProperty = async (id: number, currentPage: number) => {
    const response = await getPropertyReview(id, currentPage);
    console.log(response.data);
    if (response && response.status === 200) {
      setListReview(response.data.data);
      setTotalPages(response.data.totalPages);
    }
  };
  console.log(listReview);
  

  return (
    <div className='pt-6'>
      <h2 style={{ fontSize: '18px', marginBottom: 10 }}>Đánh giá</h2>
      <div className='grid grid-cols-2 gap-5'>
        {listReview &&
          listReview.length > 0 &&
          listReview.map((review, index) => (
            <div key={`${review.guestName}_${index}`} className='flex flex-col p-2 shadow-md rounded-md'>
              <div className='w-1/2'>
                <div className='flex items-center gap-4 p-3'>
                  <Avatar src={review.guestAvatarUrl} />
                  <div>
                    <p className='text-cyan-700'>{review.guestName}</p>
                    <p className='text-gray-400 text-xs font-thin'>{review.reviewTime}</p>
                  </div>
                </div>
                <p className='font-thin text-gray-500 px-4 italic text-md'>"{review.content}"</p>
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
                    <SignLanguageIcon sx={{ color: '#28a745' }} />
                    <span className='pt-1 text-cyan-700'>{review.communication}</span>
                  </div>
                  <div className='text-sm px-4 text-center flex flex-col'>
                    <StarIcon sx={{ color: '#feb207' }} />
                    <span className='pt-1 text-cyan-700'>{review.averageRating.toFixed(2)}</span>
                  </div>
                  <div className='text-sm px-4 text-center flex flex-col'>
                    <StarIcon sx={{ color: '#feb207' }} />
                    <span className='pt-1 text-cyan-700'>{review.averageRating.toFixed(2)}</span>
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
    </div>
  );
};

export default Evaluate;
