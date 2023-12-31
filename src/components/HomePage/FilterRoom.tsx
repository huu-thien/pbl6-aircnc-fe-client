import CityCategory from './FilterCategory/CityCategory';
import MenuQuantityCustomer from './FilterCategory/MenuQuantityCustomer';
import PropertyType from './FilterCategory/PropertyType';
import PriceRange from './FilterCategory/PriceRange';
import TimeTravel from './FilterCategory/TimeTravel';
import { Button, IconButton, SelectChangeEvent, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFilterParams } from '@/redux-toolkit/property.slice';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FilterRoom = () => {
  const filterParams = useSelector((state: RootState) => state.property.filterParams);
  const dispatch = useDispatch();

  const filterParamsType = useSelector((state: RootState) => state.property.filterParams.Type);
  const filterParamsCity = useSelector((state: RootState) => state.property.filterParams.City);
  const filterParamsCheckInDate = useSelector((state: RootState) => state.property.filterParams.CheckInDate);
  const filterParamsCheckOutDate = useSelector((state: RootState) => state.property.filterParams.CheckOutDate);
  const filterParamsAdultCount = useSelector((state: RootState) => state.property.filterParams.AdultCount);
  const filterParamsChildCount = useSelector((state: RootState) => state.property.filterParams.ChildCount);
  const filterParamsMinPrice = useSelector((state: RootState) => state.property.filterParams.MinPrice);
  const filterParamsMaxPrice = useSelector((state: RootState) => state.property.filterParams.MaxPrice);

  // PropertyType
  const [propertyType, setPropertyType] = useState<string[]>(filterParamsType || []);
  const handleChangePropertyType = (event: SelectChangeEvent<typeof propertyType>) => {
    const {
      target: { value },
    } = event;
    setPropertyType(typeof value === 'string' ? value.split(',') : value);
  };
  // CityCategory
  const [city, setCity] = useState(filterParamsCity || '');
  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  // TimeTravel
  const [timeStart, setTimeStart] = useState(filterParamsCheckInDate);
  const [timeEnd, setTimeEnd] = useState(filterParamsCheckOutDate);
  // MenuQuantityCustomer
  const [quantityOld, setQuantityOld] = useState<number>(filterParamsAdultCount || 0);
  const [quantityYoung, setQuantityYoung] = useState<number>(filterParamsChildCount || 0);
  // Price Range
  const [minPrice, setMinPrice] = useState<number>(() => {
    if (filterParamsMinPrice === undefined) return 1;
    return filterParamsMinPrice / 1000000;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    if (filterParamsMaxPrice === undefined) return 100;
    return filterParamsMaxPrice / 1000000;
  });

  // Filter
  const handlerFilterProperty = () => {
    const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1500));
    toast
      .promise(resolveAfter2Sec, {
        pending: 'Đang lọc phòng ⌛',
        success: 'Lọc thành công !',
      })
      .then(() => {
        dispatch(
          setFilterParams({
            ...filterParams,
            Type: propertyType,
            City: city,
            CheckInDate: timeStart,
            CheckOutDate: timeEnd,
            AdultCount: quantityOld,
            ChildCount: quantityYoung,
            MinPrice: minPrice * 1000000,
            MaxPrice: maxPrice * 1000000,
            PageIndex: 1,
          }),
        );
      });
  };
  const handlerClearFilter = () => {
    const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
    toast
      .promise(resolveAfter2Sec, {
        pending: 'Đang xóa bộ lọc ⌛',
        success: 'Xóa bộ lọc thành công !',
      })
      .then(() => {
        dispatch(
          setFilterParams({
            PageIndex: 1,
            Type: undefined,
            City: undefined,
            CheckInDate: undefined,
            CheckOutDate: undefined,
            MinPrice: undefined,
            MaxPrice: undefined,
            AdultCount: undefined,
            ChildCount: undefined,
            Search: undefined,
            TotalPages: 7,
          }),
        );
      });
    setCity('');
    setPropertyType([]);
    setTimeStart('');
    setTimeEnd('');
    setQuantityOld(0);
    setQuantityYoung(0);
    setMinPrice(0);
    setMaxPrice(100);
  };

  return (
    <>
      <div className='justify-between md:flex md:items-center flex-wrap m-0 pb-6'>
        <PropertyType
          propertyType={propertyType}
          handleChangePropertyType={handleChangePropertyType}
          // setPropertyType={setPropertyType}
        />
        <CityCategory city={city as string} handleChangeCity={handleChangeCity} />
        <TimeTravel setTimeStart={setTimeStart} setTimeEnd={setTimeEnd} />
        <MenuQuantityCustomer
          quantityOld={quantityOld}
          setQuantityOld={setQuantityOld}
          quantityYoung={quantityYoung}
          setQuantityYoung={setQuantityYoung}
        />
        <PriceRange minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div>
      <div className='flex gap-6 justify-center pb-4'>
        {/* <Button variant='outlined' size='large' sx={{ color: 'red', borderColor: 'red' }} onClick={handlerClearFilter}>
          Clear filter
        </Button> */}
        <Tooltip title='Xóa bộ lọc'>
          <IconButton aria-label='clear-filter' onClick={handlerClearFilter}>
            <DeleteForeverIcon sx={{ color: '#c92327', fontSize: 24 }} />
          </IconButton>
        </Tooltip>
        <Button variant='contained' size='large' onClick={handlerFilterProperty}>
          Filter
        </Button>
      </div>
    </>
  );
};

export default FilterRoom;
