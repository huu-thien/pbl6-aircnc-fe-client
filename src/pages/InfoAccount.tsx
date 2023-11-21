import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useEffect, useState } from 'react';
import { Breadcrumbs, Button, TextField } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { InfoAccountPut, InfoAccountType } from '@/@types/account';
import { getInfoAccount, updateInfoAccount } from '@/services/InfoAccount/infoAccountService';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { getHostDetailByUserID } from '@/services/HostService/hostService';
import { HostType } from '@/@types/host';
import { toast } from 'react-toastify';
import { saveInfoUserUpdate } from '@/redux-toolkit/auth.slice';
import { AvatarChangeOneFile } from '@/helpers/ChangFileImageToUrl/ChangFileImagePostPropertyToUrl';


const InfoAccount = () => {
  // const userLogin = useSelector((state: RootState) => state.auth.user);
  const id = useSelector((state: RootState) => state.auth.user?.id);
  const user = useSelector((state: RootState) => state.auth.user);

  // console.log("id la:",id);
  const dispatch = useDispatch();
  const [infoAccount, setInfoAccount] = useState<InfoAccountType | null>(null);
  const [avatar, setAvatar] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [hostInfo, setHostInfo] = useState<HostType | null>(null);
  useEffect(() => {
    const getInfoAccountApi = async (id: number) => {
      try {
        const response = await getInfoAccount(id); // Assuming you have an API function
        if (response && response.status === 200) {
          setInfoAccount(response.data);
          setPhoneNumber(response.data.phoneNumber);
          setAddress(response.data.address);
          setEmail(response.data.email);
          setInfo(response.data.introduction);
          setAvatar(response.data.avatarUrl);
          setName(response.data.fullName);
          setIsHost(response.data.isHost);
        }
      } catch (error) {
        console.error('Error fetching account information:', error);
      }
    };

    if (id) {
      getInfoAccountApi(Number(id));
    }
  }, [id]);
  // console.log('phai host ko ne', isHost, id);
  useEffect(() => {
    if (isHost) getHostInfoApi(Number(id));
  }, [id]);

  const getHostInfoApi = async (userId: number) => {
    const response = await getHostDetailByUserID(userId);
    console.log('respone:', response);

    if (response && response.status === 200) {
      setHostInfo(response.data);
    }
  };

  // console.log('so reivews:', hostInfo?.numberOfReviews);
  const city = infoAccount?.city ?? '';
  if (avatar == null)
    setAvatar(
      'https://res.cloudinary.com/ds7fwcwvz/image/upload/v1700037881/avatar/e3236e45-ad10-476a-83a9-236360df1504-avartar.png',
    );
  let urlAvatar = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAvatarChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    console.log('file da chon', selectedFile);
    try {
      // console.log('day duoc ko');
      const responseAvatar: { url: string } = await AvatarChangeOneFile(selectedFile);
      // console.log('response avartar:', responseAvatar.url);
      urlAvatar = responseAvatar.url;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      console.log('that bai r');
    }
    // Xử lý tệp hình ảnh ở đây, bạn có thể tải lên máy chủ hoặc xử lý trên máy khách.
    // Sau đó, bạn có thể cập nhật trạng thái "avatar" với ảnh mới.
    setAvatar(urlAvatar);
    const avatar = urlAvatar;
    // const uploadAvatar: { url: string } = await ChangOneFile(selectedFile);
    if (id !== undefined) {
      try {
        const infoAccount: InfoAccountPut = {
          fullName: name,
          introduction: info,
          phoneNumber: phoneNumber,
          email: email,
          city: city,
          address: address,
          avatarUrl: avatar,
        };
        console.log(infoAccount);

        const response = await updateInfoAccount(id, infoAccount);
        console.log('response:', response);
        if (response && response.status === 200) {
          toast.success('Cập nhật avatar thành công !');
          dispatch(saveInfoUserUpdate(infoAccount));
        } else {
          console.error('Failed to upload avatar:', response);
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        console.log('that bai r');
      }
    }
  };
  const handleUploadAvatar = () => {
    const fileInput = document.getElementById('avatarInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleSaveClick = async (field:string, successMessage:string) => {
    const value = field === 'name' ? name : email;
    const setIsEditing = field === 'name' ? setIsEditingName : setIsEditingEmail;
    if (value.trim() !== '') {
      setIsEditing((prev) => !prev);
      if (id !== undefined) {
        try {
          const infoAccount = {
            fullName: name,
            introduction: info,
            phoneNumber: phoneNumber,
            email: email,
            city: city,
            address: address,
            avatarUrl: avatar,
          };
          const response = await updateInfoAccount(id, infoAccount);
          if (response && response.status === 200) {
            toast.success(successMessage);
            dispatch(saveInfoUserUpdate(infoAccount));
          } else {
            console.error(`Failed to update ${field}:`, response);
          }
        } catch (error) {
          console.error(`Error updating ${field}:`, error);
        }
      }
    } else {
      toast.error(`${field === 'name' ? 'Họ tên' : 'Email'} không được bỏ trống!`);
    }
  };
  const handleSaveNameClick = () => {
    handleSaveClick('name', 'Cập nhật tên đầy đủ thành công!');
  };
  const handleSaveEmailClick = () => {
    handleSaveClick('email', 'Cập nhật email thành công!');
  };
  const updateInfo = async (infoType:string, successMessage:string) => {
    try {
      const infoAccount = {
        fullName: name,
        introduction: infoType === 'info' ? info : '',
        phoneNumber: infoType === 'phoneNumber' ? phoneNumber : '',
        email: email,
        city: city,
        address: infoType === 'address' ? address : '',
        avatarUrl: avatar,
      };
      if (id !== undefined)
      {
        const response = await updateInfoAccount(id, infoAccount);
        console.log('response:', response);
    
        if (response && response.status === 200) {
          toast.success(successMessage);
        } else {
          console.error(`Failed to update ${infoType}:`, response);
        }
      }
    } catch (error) {
      console.error(`Error updating ${infoType}:`, error);
    }
  };
  const handleSaveAddressClick = async () => {
    setIsEditingAddress((prev) => !prev);
    if (address.trim() !== '') {
      if (id !== undefined) {
        updateInfo('address', 'Cập nhật địa chỉ thành công !');
      }
    } else {
      toast.success('Bạn vừa xóa địa chỉ !');
    }
  };
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const handleSavePhoneNumberClick = async () => {
    if (validatePhoneNumber(phoneNumber) || phoneNumber.trim() === '') {
      setIsEditingPhoneNumber((prev) => !prev);
      if (phoneNumber.trim() !== '') {
        if (id !== undefined) {
          updateInfo('phoneNumber', 'Cập nhật số điện thoại thành công !');
        }
      } else {
        toast.success('Bạn vừa xóa số điện thoại !');
      }
    } else {
      toast.error('Số điện thoại không đúng định dạng !');
    }
  };
  const handleSaveInfoClick = async () => {
    setIsEditingInfo((prev) => !prev);
    if (info.trim() !== '') {
      if (id !== undefined) {
        updateInfo('info', 'Cập nhật giới thiệu bản thân thành công');
      }
    } else {
      toast.success('Bạn vừa xóa thông tin giới thiệu bản thân !');
    }
  };
  return (
    <div>
      {user ? (
        <div className='max-w-7xl mx-auto w-full py-8 min-h-[600px] p-4'>
          <Breadcrumbs aria-label='breadcrumb' className='py-4'>
            <Link className='hover:underline hover:text-cyan-600 cursor-pointer' to='/'>
              Trang chủ
            </Link>
            <p className='text-cyan-600'>Thông tin cá nhân</p>
          </Breadcrumbs>
          <div className=''>
            <div className='max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-white shadow-xl rounded-lg text-gray-900'>
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
                <p className='text-center pt-4 text-xl text-cyan-700'>{name}</p>
              </div>
              <ul className='py-4 mt-2 text-gray-700 flex items-center justify-around'>
                {isHost ? (
                  <li className='flex flex-col items-center justify-around'>
                    <ReviewsIcon className='w-4 fill-current text-blue-900' />
                    <div>{hostInfo?.numberOfReviews}</div>
                  </li>
                ) : (
                  <li></li>
                )}
                <li className='flex flex-col items-center justify-around'>
                  <AccessTimeFilledIcon className='w-4 fill-current text-blue-900' />
                  <div>{formatDateTime(infoAccount?.createdAt ?? '')}</div>
                </li>
                {isHost ? (
                  <li className='flex flex-col items-center justify-between'>
                    <StarIcon className='w-4 fill-current text-blue-900' />
                    <div>{hostInfo?.rating}</div>
                  </li>
                ) : (
                  <li></li>
                )}
              </ul>
            </div>
            <div className=' max-w-2xl sm:max-w-s md:max-w-sm lg:max-w-lg xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto bg-white overflow-hidden shadow rounded-lg border'>
              <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
                <dl className='sm:divide-y sm:divide-gray-200'>
                  <div className='py-3 flex justify-between items-center gap-5'>
                    <dt className='text-sm font-medium text-gray-500 px-4 '>Họ tên</dt>
                    <div className='flex gap-4 flex-1 mr-4'>
                      <TextField
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size='small'
                        id='name'
                        disabled={!isEditingName}
                        fullWidth
                      />
                      {isEditingName ? (
                        <Button
                          variant='contained'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={handleSaveNameClick}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          variant='outlined'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={() => setIsEditingName(!isEditingName)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className='py-3 flex justify-between items-center gap-7'>
                    <dt className='text-sm font-medium text-gray-500 px-4 '>Email</dt>
                    <div className='flex gap-4 flex-1 mr-4'>
                      <TextField
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size='small'
                        id='email'
                        disabled={!isEditingEmail}
                        fullWidth
                      />
                      {isEditingEmail ? (
                        <Button
                          variant='contained'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={handleSaveEmailClick}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          variant='outlined'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={() => setIsEditingEmail(!isEditingEmail)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className='py-3 flex justify-between items-center gap-10'>
                    <dt className='text-sm font-medium text-gray-500 px-4'>SĐT</dt>
                    <div className='flex gap-4 flex-1 mr-4'>
                      <TextField
                        type='text'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        size='small'
                        id='phoneNumber'
                        disabled={!isEditingPhoneNumber}
                        fullWidth
                      />
                      {isEditingPhoneNumber ? (
                        <Button
                          variant='contained'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={handleSavePhoneNumberClick}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          variant='outlined'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={() => setIsEditingPhoneNumber(!isEditingPhoneNumber)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className='py-3 flex justify-between items-center gap-5'>
                    <dt className='text-sm font-medium text-gray-500 px-4'>Địa chỉ</dt>
                    <div className='flex gap-4 flex-1 mr-4'>
                      <TextField
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        size='small'
                        id='address'
                        disabled={!isEditingAddress}
                        fullWidth
                      />
                      {isEditingAddress ? (
                        <Button
                          variant='contained'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={handleSaveAddressClick}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          variant='outlined'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40'
                          onClick={() => setIsEditingAddress(!isEditingAddress)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className='py-3 flex justify-between'>
                    <dt className='text-sm font-medium text-gray-500 px-4 mt-2'>Giới thiệu</dt>
                    <div className='flex gap-4 flex-1 mr-4 text-justify'>
                      <TextField
                        type='text'
                        multiline
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        size='small'
                        id='info'
                        disabled={!isEditingInfo}
                        fullWidth
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'justify' },
                          },
                        }}
                      />
                      {isEditingInfo ? (
                        <Button
                          variant='contained'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40 h-10'
                          onClick={handleSaveInfoClick}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          variant='outlined'
                          color='primary'
                          className='px-1 py-1 bg-blue-500 text-white rounded-md mx-4 w-40 h-10'
                          onClick={() => setIsEditingInfo(!isEditingInfo)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='/authenticate' />
      )}
    </div>
  );
};
export default InfoAccount;
