
interface Propstype {
  name: string;
  introduction: string;
  address: string;
  city: string;
}

const IntroduceOfHost = ({ name, introduction, address, city }: Propstype) => {
  return (
    <div className='pb-5'>
      <h4 className='font-semibold text-2xl text-cyan-700'>Thông tin về {name}</h4>
      <p className='py-2 font-thin text-gray-500'>Thành phố: {city}</p>
      <p className='font-thin text-gray-500'>Địa chỉ: {address}</p>

      <p className='py-4 font-thin text-gray-500 line-clamp-3'> {introduction} </p>
    </div>
  );
};

export default IntroduceOfHost;
