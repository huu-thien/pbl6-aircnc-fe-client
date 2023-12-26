
import HeaderAdmin from '@/components/Admin/HeaderAdmin';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useEffect, useState } from 'react';

import CancellationItem from './CancellationItem';
import { getAllCancellations } from '@/services/Admin/ManageCancellation/manageCancellation';
import { Cancellationtype } from '@/@types/manageCancellation';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ManageCancellation = () => {

  const [canceller, setCanceller] = useState<string>('All');

  const handleChange = (event: SelectChangeEvent) => {
    setCanceller(event.target.value as string);
    console.log(canceller);
  };

  const [listCancallation, setListCancellation] = useState<Cancellationtype[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    getListAccount(currentPage , canceller);
  }, [currentPage, canceller]);

  const getListAccount = async (currentPage: number, canceller: string) => {
    try {
      const response = await getAllCancellations(currentPage, canceller);
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages);
        setListCancellation(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  console.log(canceller);

  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý đơn hủy booking'/>
      <FormControl size='small' sx={{width: 200, my: 2, background: 'white'}}>
        <InputLabel id="demo-simple-select-label">Bên hủy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={canceller}
          label="Bên hủy"
          onChange={handleChange}
        >
          <MenuItem value="All">Tất cả</MenuItem>
          <MenuItem value='true'>Khách hàng</MenuItem>
          <MenuItem value='false'>Chủ nhà</MenuItem>
        </Select>
      </FormControl>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              {/* <th scope='col' className='px-6 py-3'>
                ID
              </th> */}
              <th scope='col' className='px-6 py-3'>
                Booking ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Lý do hủy
              </th>
              {/* <th scope='col' className='px-6 py-3'>
                Loại yêu cầu
              </th> */}
              <th scope='col' className='px-6 py-3'>
                Tiền phí
              </th>
              <th scope='col' className='px-6 py-3'>
                Số tiền hoàn trả
              </th>
              <th scope='col' className='px-6 py-3'>
                Bên hủy
              </th>
              <th scope='col' className='px-6 py-3'>
                Xem chi tiết
              </th>
              {/* <th scope='col' className='px-6 py-3'>
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {listCancallation.map((cancellation) => (
              <CancellationItem key={cancellation.bookingId} cancellationInfo={cancellation} getListAccount={getListAccount} currentPage={currentPage} canceller={canceller}/>
            ))}
          </tbody>
        </table>
        <div className='py-4 px-4 flex justify-end'>
          <Pagination
            color='primary'
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageCancellation
