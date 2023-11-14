import RoomItem from './RoomItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { PropertyType } from '@/@types/property';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { getPropertyList, setPageIndexParamsType } from '@/redux-toolkit/property.slice';
import Skeleton from '../Skeleton';

const RoomList = () => {
  const propertyList = useSelector((state: RootState) => state.property.propertyList);
  const filterParams = useSelector((state: RootState) => state.property.filterParams);
  const totalPageStores = useSelector((state: RootState) => state.property.filterParams.TotalPages);
  const curentPageStores = useSelector((state: RootState) => state.property.filterParams.PageIndex);
  const loading = useSelector((state: RootState) => state.property.loading);

  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(curentPageStores);

  useEffect(() => {
    const promise = dispatch(getPropertyList({ ...filterParams }));
    return () => {
      promise.abort();
    };
  }, [dispatch, filterParams]);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    dispatch(getPropertyList({ ...filterParams, PageIndex: value }));
    dispatch(setPageIndexParamsType(value));
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Sử dụng thuộc tính behavior để tạo hiệu ứng cuộn mượt
    });
  };
  console.log(propertyList);

  return (
    <div>
      {propertyList.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5'>
            {loading && propertyList.map((property: PropertyType, index) => <Skeleton key={`skeleton-${index}`} />)}
            {!loading &&
              propertyList.map((property: PropertyType, index) => (
                <RoomItem
                  key={`perroperty_${index}`}
                  id={property.id}
                  title={property.title}
                  propertyImage={property.propertyImages}
                  pricePerNight={property.pricePerNight}
                  numberOfReviews={property.numberOfReviews}
                  rating={property.rating}
                  isFavorite={property.isFavorite}
                />
              ))}
          </div>
          <div className='py-8 flex items-center'>
            <Pagination
              color='primary'
              count={totalPageStores}
              page={currentPage}
              onChange={handleChangePage}
              sx={{ width: '100%', mx: 'auto' }}
            />
          </div>
        </div>
      ) : (
        <div className='px-5 md:px-10'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='py-12'>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-12 items-center'>
                <div className='py-8'>
                  <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                    Có vẻ như phòng bạn muốn tìm không tồn tại 💓
                  </h1>
                  <p className='text-center text-cyan-700'>
                    Hãy xóa bộ lọc và tìm kiếm những căn phòng tuyệt với khác nhé !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;
