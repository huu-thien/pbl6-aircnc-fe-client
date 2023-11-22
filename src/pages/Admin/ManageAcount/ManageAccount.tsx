import HeaderAdmin from '@/components/Admin/HeaderAdmin';
import AccountItem from './AccountItem';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useEffect, useState } from 'react';
import { AccountType } from '@/@types/manageAccount';
import { getAllAccountsApi } from '@/services/Admin/ManageAcount/accountService';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ManageAccount = () => {

  const [isHostOnly, setIsHostOnly] = useState<string>('All');

  const handleChange = (event: SelectChangeEvent) => {
    setIsHostOnly(event.target.value as string);
  };

  const [listAccount, setListAccount] = useState<AccountType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    getListAccount(currentPage, isHostOnly);
  }, [currentPage, isHostOnly]);

  const getListAccount = async (currentPage: number, isHostOnly: string) => {
    try {
      const response = await getAllAccountsApi(currentPage, isHostOnly);
      if (response && response.status === 200) {
        setTotalPages(response.data.totalPages);
        setListAccount(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  // console.log(listAccount);

  return (
    <div className='p-4 '>
      <HeaderAdmin title='Quản lý tài khoản' />
      <FormControl size='small' sx={{width: 200, my: 2, background: 'white'}}>
        <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isHostOnly}
          label="Vai trò"
          onChange={handleChange}
        >
          <MenuItem value="All">Tất cả</MenuItem>
          <MenuItem value="onlyHost">Chủ nhà</MenuItem>
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
                Tên đầy đủ
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Số điện thoại
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày tham gia
              </th>
              <th scope='col' className='px-6 py-3'>
                Avatar
              </th>
              <th scope='col' className='px-6 py-3'>
                Role
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listAccount.map((account) => (
              <AccountItem account={account} />
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
