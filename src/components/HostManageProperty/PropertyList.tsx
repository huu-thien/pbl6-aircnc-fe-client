import { PropertyType } from '@/@types/property';
import { getListPropertyOfHostApi } from '@/services/HostService/hostService';
import { useEffect, useState } from 'react';
import RoomItem from '../HomePage/RoomItem';
import Skeleton from '../Skeleton';

interface Propstype {
  hostId: number;
}

const PropertyList = ({ hostId }: Propstype) => {
  const [listPropertyOfHost, setListPropertyOfHost] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getListPropertyOfHost(hostId);
  }, [hostId]);

  const getListPropertyOfHost = async (hostId: number) => {
    setIsLoading(true);
    try {
      const response = await getListPropertyOfHostApi(hostId);
      if (response && response.status == 200) {
        setListPropertyOfHost(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  console.log(listPropertyOfHost);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5'>
      {isLoading && listPropertyOfHost.map((_, index) => <Skeleton key={`skeleton-${index}`} />)}
      {!isLoading &&
        listPropertyOfHost.length > 0 &&
        listPropertyOfHost.map((property, index) => (
          <RoomItem
            key={`perroperty_${index}`}
            id={property.id}
            title={property.title}
            propertyImage={property.propertyImages}
            pricePerNight={property.pricePerNight}
            numberOfReviews={property.numberOfReviews}
            rating={property.rating}
            isFavorite={property.isFavorite}
            isHostEditable={true}
          />
        ))}
    </div>
  );
};

export default PropertyList;
