import { provinces } from '@/@types/city';
import { FormikErrors } from 'formik/dist/types';
import { toast } from 'react-toastify';

interface PropsType {
  address: string;
  position: { lat: number; lon: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lon: number;
    }>
  >;
  setListAddressResult: React.Dispatch<React.SetStateAction<never[]>>;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<{
    roomName: string;
    description: string;
    address: string;
    quantityOld: string;
    quantityChild: string;
    quantityBedRooms: string;
    quantityBed: string;
    quantityBathRooms: string;
    utilities: string[];
    pricePerNight: string;
    policy: 'flexible';
    listImage: [
      {
        name: '';
        type: '';
        size: '';
      },
    ];
    feeCleaning: string;
    typeRoom: string;
  }>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}
const AddressResult = ({ address, position, setPosition, setListAddressResult, setFieldValue, setCity }: PropsType) => {
  const handlePickAddress = () => {
    toast.success('Hệ thống đã chấp nhận địa chỉ này');
    setPosition(position);
    setListAddressResult([]);
    const cityPost = provinces.find((city) => address.includes(city));
    if (cityPost) setCity(cityPost);
    setFieldValue('address', address);
  };

  return (
    <p className='cursor-pointer py-1.5 hover:bg-slate-200 px-4 text-gray-800' onClick={handlePickAddress}>
      {address}
    </p>
  );
};

export default AddressResult;
