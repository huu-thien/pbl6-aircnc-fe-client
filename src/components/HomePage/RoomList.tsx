import RoomItem from './RoomItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { PropertyType } from '@/@types/property';
import { Alert, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { getPropertyList, setPageIndexParamsType } from '@/redux-toolkit/property.slice';

const RoomList = () => {
  const propertyList = useSelector((state: RootState) => state.property.propertyList);
  const filterParams = useSelector((state: RootState) => state.property.filterParams);
  const totalPageStores = useSelector((state: RootState) => state.property.filterParams.TotalPages);
  const curentPageStores = useSelector((state: RootState) => state.property.filterParams.PageIndex)
  const dispatch = useAppDispatch();
  // const [listProperty, setListProperty] = useState([]);

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

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5'>
        {propertyList.length > 0 ? (
          propertyList.map((property: PropertyType, index) => (
            <RoomItem
              key={`perroperty_${index}`}
              id={property.id}
              title={property.title}
              propertyImage={property.propertyImages}
              pricePerNight={property.pricePerNight}
              numberOfReviews={property.numberOfReviews}
              rating={property.rating}
            />
          ))
        ) : (
          <div className="mx-auto">
            <Alert  className="mx-auto w-full" severity='info'>Phòng bạn cần tìm không tồn tại, vui lòng clear bộ lọc</Alert>
          </div>
        )}
      </div>
      <div className='py-8'>
        <Pagination
          color='primary'
          count={totalPageStores}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ width: '100%', mx: 'auto' }}
        />
      </div>
    </div>
  );
};

export default RoomList;
