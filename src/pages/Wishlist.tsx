import { PropertyType } from '@/@types/property';
import RoomItem from '@/components/HomePage/RoomItem';
import { getWishlistProperty } from '@/services/WishlistService/wishlistService';
import { Alert, Breadcrumbs, Pagination } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ImageDecorate from '@/assets/images/booking-decorate.webp';

const WishList = () => {
  const user = true;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [wishlistProperty, setWishlistProperty] = useState<PropertyType[]>([]);
  useEffect(() => {
    getPropertyWishlist(currentPage);
  }, [currentPage]);

  const getPropertyWishlist = async (page: number) => {
    try {
      const response = await getWishlistProperty(page);
      if (response && response.status === 200) {
        setWishlistProperty(response.data.data);
        setTotalPages(response.data.totalPages);
        console.log('goi api thanh cong', response.data);
      }
    } catch (err) {
      console.log('err wishlist: ');
    }
  };
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Sử dụng thuộc tính behavior để tạo hiệu ứng cuộn mượt
    });
  };

  return (
    <div>
      {user ? (
        <div className='max-w-7xl mx-auto w-full min-h-[6 00px] p-4'>
          <Breadcrumbs aria-label='breadcrumb' className='py-4'>
            <Link className='hover:underline hover:text-cyan-600 cursor-pointer' to='/'>
              Trang chủ
            </Link>
            <p className='text-cyan-600'>Danh sách yêu thích</p>
          </Breadcrumbs>
          {wishlistProperty.length > 0 ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 mt-5'>
                {wishlistProperty.map((property, index) => (
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
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  sx={{ width: '100%', mx: 'auto' }}
                />
              </div>
            </>
          ) : (
            <div className='px-5 md:px-10'>
              <div className='mx-auto w-full max-w-7xl'>
                <div className=''>
                  <div className='grid grid-cols-2 md:grid-cols-2 gap-12 items-center'>
                    <div className=''>
                      <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>
                        Danh sách yêu thích của bạn đang trống 💓
                      </h1>
                      <Alert sx={{ mb: 2 }} severity='info' className='text-center'>
                        Hãy thêm những địa điểm mà bạn yêu thích và trải nghiệm chúng !
                      </Alert>
                    </div>
                    <div className=''>
                      <img
                        src={ImageDecorate}
                        alt='Wishlistpage'
                        className='mx-auto inline-block h-full w-full  object-cover rounded-2xl'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Navigate to='/authenticate' />
      )}
    </div>
  );
};

export default WishList;
