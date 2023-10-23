import { PropertyImage, PropertyType } from '@/@types/property';
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

import { Link, useParams } from 'react-router-dom';

const DetailRoom = () => {
  const [propertyDetail, setPropertyDetail] = useState<PropertyType | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getPropertyDetailApi(id as string);
  }, [id]);

  const getPropertyDetailApi = async (propertyId: string) => {
    const response = await getPropertyDetail(Number(propertyId));
    setPropertyDetail(response.data);
  };
  // console.log(propertyDetail);

  return (
    <div className='max-w-7xl mx-auto w-full py-8'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" className="hover:underline hover:text-cyan-600">
          Trang chủ
        </Link>
        <p color="text.primary">Chi tiết phòng</p>
      </Breadcrumbs>
      <TitleRoom title={propertyDetail?.title as string} />
      {propertyDetail && <ImageList propertyImages={propertyDetail.propertyImages} />}

      <div className='flex items-start justify-between mb-5'>
        {propertyDetail && (
          <div className='flex flex-col gap-8 mr-60'>
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
            />
          </div>
        )}
        <BookingRoom pricePerNight={propertyDetail?.pricePerNight} />
      </div>
      <Divider />
      <LocationOnMap />
      <Divider />
      <Evaluate />
    </div>
  );
};

export default DetailRoom;
