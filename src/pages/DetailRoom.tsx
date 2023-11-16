import { PropertyType } from '@/@types/property';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BookingRoom from '@/components/DetailRoom/BookingRoom';
import Evaluate from '@/components/DetailRoom/Evaluate';
import ImageList from '@/components/DetailRoom/ImageList';
import IntroduceHost from '@/components/DetailRoom/IntroduceHost';
import IntroduceRoom from '@/components/DetailRoom/IntroduceRoom';
import LocationOnMap from '@/components/DetailRoom/LocationOnMap';
import TitleRoom from '@/components/DetailRoom/TitleRoom';
import { getPropertyDetail } from '@/services/PropertyService/propertyService';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import PostReview from '@/components/DetailRoom/PostReview';

const DetailRoom = () => {
  const navigate = useNavigate();
  const [propertyDetail, setPropertyDetail] = useState<PropertyType | null>(null);
  const [updateReview, setUpdateReview] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    getPropertyDetailApi(id as string);
  }, [id]);

  const getPropertyDetailApi = async (propertyId: string) => {
    try {
      const response = await getPropertyDetail(Number(propertyId));
      if (response && response.status === 200) {
        setPropertyDetail(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='max-w-7xl mx-auto w-full py-8 px-6 lg:px-0'>
      <Breadcrumbs aria-label='breadcrumb'>
        <p className='hover:underline hover:text-cyan-600' onClick={() => navigate(-1)}>
          Trang chủ
        </p>
        <p color=''>Chi tiết phòng</p>
      </Breadcrumbs>
      {propertyDetail && (
        <TitleRoom title={propertyDetail.title} address={propertyDetail.address} city={propertyDetail.city} />
      )}
      {propertyDetail && <ImageList propertyImages={propertyDetail.propertyImages} />}

      <div className='lg:flex lg:items-start lg:justify-between mb-5 gap-16'>
        {propertyDetail && (
          <div className='flex flex-col gap-6 w-full lg:w-3/5'>
            <IntroduceHost hostId={propertyDetail.hostId} />
            <Divider />
            <IntroduceRoom
              bathroomCount={propertyDetail.bathroomCount}
              bedCount={propertyDetail.bedCount}
              description={propertyDetail.description}
              maxAdultCount={propertyDetail.maxAdultCount}
              maxChildCount={propertyDetail.maxChildCount}
              numberOfReviews={propertyDetail.numberOfReviews}
              rating={propertyDetail.rating}
              propertyUtilities={propertyDetail.propertyUtilities}
            />
          </div>
        )}
        {propertyDetail && (
          <BookingRoom
            pricePerNight={propertyDetail.pricePerNight}
            propertyId={Number(id)}
            cleaningFee={propertyDetail.cleaningFee}
            maxAdultCount={propertyDetail.maxAdultCount}
            maxChildCount={propertyDetail.maxChildCount}
          />
        )}
      </div>
      <Divider />
      {propertyDetail && <LocationOnMap latitude={propertyDetail.latitude} longitude={propertyDetail.longitude} />}
      <Divider />
      {propertyDetail && <Evaluate propertyId={propertyDetail.id} updateReview={updateReview} />}
      {propertyDetail && (
        <PostReview propertyId={propertyDetail.id} onUpdateReview={setUpdateReview} />
      )}
    </div>
  );
};

export default DetailRoom;
