import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useState } from 'react';
import { Breadcrumbs, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const infoAccount = {
  name: '',
  email: '',
  phoneNumber: '',
  address: '',
  introduction: '',
  avatarUrl: '',
};

const src = 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-1-avatar-2754574_120513.png';

const InfoAccount = () => {
  const [avatar, setAvatar] = useState<string>(src);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [address, setAddress] = useState('123 Main St Anytown, USA 12345');
  const [name, setName] = useState('Doan Quoc');
  const [email, setEmail] = useState('example@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [info, setInfo] = useState(
    'A commodi sunt est nisi et. Sunt ratione vel rerum. Illo corporis dolorum quo aperiam beatae ut aut. Possimus dolorum vel in molestiae nemo. Minus dicta commodi est iure quis. Et nihil laudantium asperiores.',
  );
  const handleAvatarChange = (event: any) => {
    const selectedFile = event.target.files[0];
    // Xử lý tệp hình ảnh ở đây, bạn có thể tải lên máy chủ hoặc xử lý trên máy khách.
    // Sau đó, bạn có thể cập nhật trạng thái "avatar" với ảnh mới.
    setAvatar(URL.createObjectURL(selectedFile));
  };
  const handleUploadAvatar = () => {
    const fileInput = document.getElementById('avatarInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };
  const handleSaveNameClick = () => {
    if (name.trim() !== '') {
      // Kiểm tra xem địa chỉ đã chỉnh sửa có giá trị hoặc không
      setIsEditingName(false);
      infoAccount.name = name;
      // You can add code here to save the updated address to your backend or wherever it needs to be saved.
    }
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(true);
  };
  const handleSaveEmailClick = () => {
    if (email.trim() !== '') {
      setIsEditingEmail(false);
      infoAccount.email = email;
    }
  };

  const handleEditPhoneNumberClick = () => {
    setIsEditingPhoneNumber(true);
  };
  const handleSavePhoneNumberClick = () => {
    if (phoneNumber.trim() !== '') {
      setIsEditingPhoneNumber(false);
      infoAccount.phoneNumber = phoneNumber;
    }
  };

  const handleEditAddressClick = () => {
    setIsEditingAddress(true);
  };
  const handleSaveAddressClick = () => {
    if (address.trim() !== '') {
      setIsEditingAddress(false);
      infoAccount.address = address;
    }
  };

  const handleEditInfoClick = () => {
    setIsEditingInfo(true);
  };
  const handleSaveInfoClick = () => {
    if (info.trim() !== '') {
      setIsEditingInfo(false);
      infoAccount.introduction = info;
    }
  };

  return (
    <div className='max-w-7xl mx-auto w-full py-8 min-h-[6 00px] p-4'>
      <Breadcrumbs aria-label='breadcrumb' className='py-4'>
        <Link className='hover:underline hover:text-cyan-600 cursor-pointer' to='/'>
          Trang chủ
        </Link>
        <p className='text-cyan-600'>Thông tin cá nhân</p>
      </Breadcrumbs>
      <div className=''>
        <div className='max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-white shadow-xl rounded-lg text-gray-900'>
          <div className='mx-auto w-32 h-32 relative border-4 border-white rounded-full'>
            <input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              id='avatarInput'
              style={{ display: 'none' }}
            />
            <button onClick={handleUploadAvatar} className='ml-28'>
              <AddAPhotoIcon />
            </button>
            <img className='w-[120px] h-[120px] rounded-full -mt-7' src={avatar} />
          </div>
          <div className='text-center'>
            <p className='text-center pt-4 text-xl text-cyan-700'>Doan Quoc</p>
          </div>
          <ul className='py-4 mt-2 text-gray-700 flex items-center justify-around'>
            <li className='flex flex-col items-center justify-around'>
              <ReviewsIcon className='w-4 fill-current text-blue-900' />
              <div>10</div>
            </li>
            <li className='flex flex-col items-center justify-around'>
              <AccessTimeFilledIcon className='w-4 fill-current text-blue-900' />
              <div>01/11/2023</div>
            </li>
            <li className='flex flex-col items-center justify-between'>
              <StarIcon className='w-4 fill-current text-blue-900' />
              <div>4.1</div>
            </li>
          </ul>
        </div>
        <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-white overflow-hidden shadow rounded-lg border'>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <dl className='sm:divide-y sm:divide-gray-200'>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Họ tên</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {isEditingName ? (
                    <TextField
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      size='small'
                      id='name'
                    />
                  ) : (
                    <span>{name}</span>
                  )}
                  {isEditingName ? (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-blue-500 text-white rounded-md' onClick={handleSaveNameClick}>
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-gray-300 text-gray-600 rounded-md' onClick={handleEditNameClick}>
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Địa chỉ email</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {isEditingEmail ? (
                    <TextField
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size='small'
                      id='email'
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                  {isEditingEmail ? (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-blue-500 text-white rounded-md' onClick={handleSaveEmailClick}>
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-gray-300 text-gray-600 rounded-md' onClick={handleEditEmailClick}>
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Số điện thoại</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {isEditingPhoneNumber ? (
                    <TextField
                      type='text'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      size='small'
                      id='phoneNumber'
                    />
                  ) : (
                    <span>{phoneNumber}</span>
                  )}
                  {isEditingPhoneNumber ? (
                    <div className='mt-2'>
                      <button
                        className='px-3 py-1 bg-blue-500 text-white rounded-md'
                        onClick={handleSavePhoneNumberClick}
                      >
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <button
                        className='px-3 py-1 bg-gray-300 text-gray-600 rounded-md'
                        onClick={handleEditPhoneNumberClick}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Địa chỉ</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {isEditingAddress ? (
                    <TextField
                      type='text'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size='small'
                      id='address'
                    />
                  ) : (
                    <span>{address}</span>
                  )}
                  {isEditingAddress ? (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-blue-500 text-white rounded-md' onClick={handleSaveAddressClick}>
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <button
                        className='px-3 py-1 bg-gray-300 text-gray-600 rounded-md'
                        onClick={handleEditAddressClick}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Giới thiệu</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-justify'>
                  {isEditingInfo ? (
                    <TextField multiline value={info} onChange={(e) => setInfo(e.target.value)} fullWidth />
                  ) : (
                    <span>{info}</span>
                  )}
                  {isEditingInfo ? (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-blue-500 text-white rounded-md' onClick={handleSaveInfoClick}>
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <button className='px-3 py-1 bg-gray-300 text-gray-600 rounded-md' onClick={handleEditInfoClick}>
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAccount;
