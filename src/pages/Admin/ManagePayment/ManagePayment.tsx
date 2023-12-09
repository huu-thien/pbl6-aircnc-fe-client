import HeaderAdmin from '@/components/Admin/HeaderAdmin';
import PaymentItem from './PaymentItem';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useEffect, useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllHostPayment } from '@/services/PaymentService/paymentService';
import { HostPaymentType } from '@/@types/hostpayment';

const ManageAccount = () => {
  const [status, setStatus] = useState<string>('All');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [listHostPayment, setListHostPayment] = useState<HostPaymentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    getListHostPayment(currentPage, status);
  }, [currentPage, status]);

  const getListHostPayment = async (currentPage: number, status: string) => {
    try {
      const response = await getAllHostPayment(currentPage, status);
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages);
        setListHostPayment(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  // console.log(listHostPayment);

  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý thanh toán cho Host' />
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
          <MenuItem value='Pending'>Chờ thanh toán</MenuItem>
          <MenuItem value='Paid'>Đã thanh toán</MenuItem>
          <MenuItem value='Cancelled'>Đã hủy</MenuItem>
        </Select>
      </FormControl>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên chủ thẻ
              </th>
              <th scope='col' className='px-6 py-3'>
                Số thẻ
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên ngân hàng
              </th>
              <th scope='col' className='px-6 py-3'>
                Số tiền
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listHostPayment.map((hostpayment: HostPaymentType) => (
              <PaymentItem
                hostpayment={hostpayment}
                currentPage={currentPage}
                status={status}
                getListHostPayment={getListHostPayment}
              />
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

export default ManageAccount;
