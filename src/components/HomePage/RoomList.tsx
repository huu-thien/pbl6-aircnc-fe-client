import { getListProperty } from '@/services/PropertyService/propertyService';
import RoomItem from './RoomItem';
import { useEffect, useState } from 'react';
import { PropertyType } from '@/@types/property';

const RoomList = () => {
  const [listProperty, setListProperty] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const response = await getListProperty();
    if (response && response.status === 200) {
      setListProperty(response.data.data);
    }
  };
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5'>
      {listProperty.map((property: PropertyType, index) => (
        <RoomItem
          key={`perroperty_${index}`}
          id={property.id}
          title={property.title}
          propertyImage={property.propertyImages}
          pricePerNight={property.pricePerNight}
          numberOfReviews={property.numberOfReviews}
          rating={property.rating}
        />
      ))}
    </div>
  );
};

export default RoomList;
