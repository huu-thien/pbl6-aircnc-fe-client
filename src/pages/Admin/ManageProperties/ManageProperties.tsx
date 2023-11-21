import HeaderAdmin from '@/components/Admin/HeaderAdmin';
// import AccountItem from './AccountItem';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropertyItem from './PropertyItem';
import { PropertyType } from '@/@types/property';
import { getAllPropertysApi } from '@/services/Admin/ManageProperties/manageProperies';

const ManageProperties = () => {
  const [status, setStatus] = useState<string>('All');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [listProperty, setListProperty] = useState<PropertyType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    getListProperty(currentPage, status);
  }, [currentPage, status]);

  const getListProperty = async (currentPage: number, status: string) => {
    try {
      const response = await getAllPropertysApi(currentPage, status);
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages);
        setListProperty(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  console.log(listProperty);

  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý tài khoản' />
      <FormControl size='small' sx={{ width: 200, my: 2, background: 'white' }}>
        <InputLabel id='demo-simple-select-label'>Trạng thái</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={status}
          label='Trạng thái'
          onChange={handleChange}
        >
          <MenuItem value='All'>Tất cả</MenuItem>
          <MenuItem value='Pending'>Chờ duyệt</MenuItem>
          <MenuItem value='Approved'>Đã duyệt</MenuItem>
          <MenuItem value='Rejected'>Thất bại</MenuItem>
          <MenuItem value='Available'>Có Sẵn</MenuItem>
          <MenuItem value='Unavailable'>Không có Sẵn</MenuItem>
        </Select>
      </FormControl>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3 w-[200px]'>
                Tên phòng
              </th>
              <th scope='col' className='px-6 py-3'>
                Giá tiền / đêm (vnd)
              </th>
              <th scope='col' className='px-6 py-3'>
                Phí vệ sinh (vnd)
              </th>
              <th scope='col' className='px-6 py-3 w-[250px]'>
                Địa chỉ
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Xem chi tiết
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listProperty.map((property, index) => (
              <PropertyItem key={`${property.title}-${index}`} property={property} />
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
