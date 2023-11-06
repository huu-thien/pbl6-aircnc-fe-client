import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};
const properties = ['Tất cả', 'Id', 'CheckInDate', 'CheckOutDate', 'CreatedAt', 'Status'];
const statuses = [
  'Tất cả',
  'Pending',
  'Confirmed',
  'Rejected',
  'CancelledBeforeCheckIn',
  'CancelledAfterCheckIn',
  'Completed',
];
let selectedOrderBy = '';
let selectedStatus = '';
const Filter = () => {
  // const [orderBy, setOrderBy] = React.useState('');
  // const handleChangeProp = (event: SelectChangeEvent) => {
  //     setOrderBy(event.target.value as string);
  // };
  // console.log('orderBy: ', orderBy);

  // const [status, setStatus] = React.useState('');

  // const handleChangeStatus = (event: SelectChangeEvent) => {
  //   setStatus(event.target.value as string);
  // };
  // console.log('status: ', status);
  // const handleSearch = () => {
  //   setStatus(status);
  //   setOrderBy(orderBy);
  // };

  const [, setOrderBy] = React.useState('');
  const [, setStatus] = React.useState('');
  const handleOrderByChange = (event: SelectChangeEvent) => {
    selectedOrderBy = event.target.value;
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    selectedStatus = event.target.value;
  };
  const handleSearch = () => {
    setOrderBy(selectedOrderBy);
    setStatus(selectedStatus);
  };
  const filterList = {
    orderBy: selectedOrderBy,
    status: selectedStatus,
  };
  console.log(filterList);
  return (
    <div className='inline-flex gap-10 pb-5'>
      <div className='flex gap-5'>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id='demo-simple-select-label' sx={{ fontSize: 14 }}>
            Sắp xếp
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={orderBy}
            label='Sắp xếp'
            onChange={handleOrderByChange}
            MenuProps={MenuProps}
            sx={{ fontSize: 13 }}
          >
            {properties.map((property, index) => (
              <MenuItem key={`property-${index}`} value={property} sx={{ fontSize: 13 }}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '220px' }}>
          <InputLabel id='demo-simple-select-label' sx={{ fontSize: 14 }}>
            Tình Trạng
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={status}
            label='Tình trạng lb'
            onChange={handleStatusChange}
            MenuProps={MenuProps}
            sx={{ fontSize: 14 }}
          >
            {statuses.map((status, index) => (
              <MenuItem key={`status-${index}`} value={status} sx={{ fontSize: 13 }}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button sx={{ m: 'auto' }} variant='contained' size='large' onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Filter;
