import { Breadcrumbs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getListBookingGuest } from '@/services/BookingService/bookingService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import Chip from '@mui/material/Chip';

const ListBookingGuest = () => {
  const navigate = useNavigate();
  const guestId = useSelector((state: RootState) => state.auth.user?.id) || 1;

  const [listBooking, setListBooking] = useState([]);
  useEffect(() => {
    getListBookingFromDB();
  }, []);
  const getListBookingFromDB = async () => {
    try {
      const response = await getListBookingGuest(guestId);
      console.log(response);

      if (response && response.status === 200) {
        setListBooking(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'propertyName',
      headerName: 'Tên phòng',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { propertyName, propertyId } }: { row: { propertyName: string; propertyId: number } }) => {
        return (
          <Link to={`/detail-room/${propertyId}`} className='hover:text-cyan-700'>
            {propertyName}
          </Link>
        );
      },
    },
    {
      field: 'hostName',
      headerName: 'Tên chủ nhà',
      type: 'number',
      headerAlign: 'left',
      flex: 1,
      align: 'left',
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { hostName, hostId } }: { row: { hostName: string; hostId: number } }) => {
        return (
          <Link to={`/host/${hostId}`} className='hover:text-cyan-700'>
            {hostName}
          </Link>
        );
      },
    },
    {
      field: 'checkInDate',
      headerName: 'Ngày Check In',
      flex: 1,
      renderCell: ({ row: { checkInDate } }: { row: { checkInDate: string } }) => {
        return <p className="text-cyan-800">{formatDateTime(checkInDate)}</p>;
      },
    },
    {
      field: 'checkOutDate',
      headerName: 'Ngày Check Out',
      flex: 1,
      renderCell: ({ row: { checkOutDate } }: { row: { checkOutDate: string } }) => {
        return <p className="text-cyan-800">{formatDateTime(checkOutDate)}</p>;
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng thanh toán',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { totalPrice } }: { row: { totalPrice: number } }) => {
        return <p>{formatMoney(totalPrice)} vnd</p>;
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      align: 'left',
      flex: 1,

      renderCell: ({ row: { status } }: { row: { status: string } }) => {
        return (
          <>
            {status === 'Pending' && (
              <Chip label='Chờ thanh toán' sx={{ backgroundColor: '#faeacf', color: '#f39c11 ' }} />
            )}
            {status === 'Confirmed' && (
              <Chip label='Đã xác nhận' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
            )}
            {status === 'Rejected' && <Chip label='Thất bại' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />}
            {status === 'CheckedIn' && <Chip label='Check In' sx={{ backgroundColor: '#efe1f5', color: '#9a59b5' }} />}
            {status === 'Completed' && <Chip label='Hoàn tất' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />}
            {status === 'CancelledBeforeCheckIn' && (
              <Chip label='Hủy trước khi đặt' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
            )}
            {status === 'CancelledAfterCheckIn' && (
              <Chip label='Hủy sau khi đặt' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
            )}
          </>
        );
      },
    },
    {
      field: '',
      headerName: 'Action',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { status } }: { row: { status: string } }) => {
        return (
          <>
            {status === 'Pending' && (
              <button
                type='button'
                className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2'
              >
                Thanh toán
              </button>
            )}
            {status === 'Confirmed' && (
              <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2">Hủy phòng</button>
            )}
          </>
        );
      },
    },
  ];
  console.log(listBooking);

  return (
    <div className='w-full max-w-7xl mx-auto pt-8 pb-2'>
      <Breadcrumbs aria-aria-label='Breadcrumbs'>
        <p className='hover:underline hover:text-cyan-600' onClick={() => navigate(-1)}>
          Trang chủ
        </p>
        <p>Danh sách đặt phòng</p>
      </Breadcrumbs>
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            // color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(25,118,210,0.2)',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            // backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: 'rgba(25,118,210,0.2)',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `#1976d2 !important`,
            marginBottom: 2,
          },
        }}
      >
        <DataGrid
          rows={listBooking}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          // disableRowSelectionOnClick
          // pageSizeOptions={[2]}
        />
      </Box>
    </div>
  );
};

export default ListBookingGuest;
