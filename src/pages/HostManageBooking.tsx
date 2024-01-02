import { Breadcrumbs, Dialog, DialogActions, DialogContent, Button, ImageListItem, Box, Rating } from '@mui/material';
import ImageListMUI from '@mui/material/ImageList';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getListBookingOfHost, postRequestCancelBooking } from '@/services/BookingService/bookingService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FileObject } from '@/shared/BecomeHost';
import { ChangFileImageCancelBookingToUrl } from '@/helpers/ChangFileImageToUrl/ChangFileImageCancelBookingToUrl';
import { GuestCancelType } from '@/@types/booking';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getHostDetailByUserID } from '@/services/HostService/hostService';
import { postCreateReviewGuest } from '@/services/GuestService/guestService';
import { ContentReviewGuestType } from '@/@types/guest';
import StarIcon from '@mui/icons-material/Star';
import { differentDays } from '@/helpers/DifferentTime/differentDays';

const labels: { [index: string]: string } = {
  1: 'Quá tệ',
  2: 'Tệ',
  3: 'Hài lòng',
  4: 'Tốt',
  5: 'Quá tuyệt vời',
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const CancellationReason = ['PersonalIssue', 'NaturalDisaster', 'PropertyIssue', 'Pandemic', 'Sickness', 'Other'];

const HostManageBooking = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id) || 1;
  const isHost = useSelector((state: RootState) => state.auth.user?.isHost);
  const [listBooking, setListBooking] = useState([]);
  const [cancellationReason, setCancellationReason] = useState<string>(CancellationReason[0]);
  const [reason, setReason] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [guestId, setGuestId] = useState(0);
  const navigate = useNavigate();

  const handleChangeCancellationReason = (event: SelectChangeEvent) => {
    setCancellationReason(event.target.value as string);
  };
  console.log(cancellationReason);

  const [openModalCancel, setOpenModalCancel] = useState(false);
  const handleOpenModalCancel = () => setOpenModalCancel(true);
  const handleCloseModalCancel = () => {
    setOpenModalCancel(false);
    setCancellationReason(CancellationReason[0]);
    setReason('');
    setSelectedFiles([]);
  };

  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some((file) => file.name === fileName);
  };
  const [hostId, setHostId] = useState(0);
  const getHostId = async (userId: number) => {
    const response = await getHostDetailByUserID(userId);
    console.log('respone:', response);

    if (response && response.status === 200) {
      setHostId(response.data.id);
    }
  };
  console.log(hostId);

  useEffect(() => {
    if (isHost) getHostId(Number(userId));
  }, [userId]);

  const getListBookingFromDB = useCallback(async () => {
    try {
      const response = await getListBookingOfHost(hostId);
      if (response && response.status === 200) {
        setListBooking(response.data.data);
        console.log('listBooking:', userId);
      }
    } catch (err) {
      console.log(err);
    }
  }, [hostId]);

  useEffect(() => {
    getListBookingFromDB();
  }, [getListBookingFromDB]);

  const handleCancelRequestBooking = async (bookingId: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let reponseChangeImageUrl: any[] | undefined = [];
      let listImage = [];
      if (selectedFiles.length > 0) {
        reponseChangeImageUrl = await ChangFileImageCancelBookingToUrl(selectedFiles as File[]);
        if (reponseChangeImageUrl && reponseChangeImageUrl.length > 0) {
          listImage = reponseChangeImageUrl.map((item) => item.url);
        }
      }
      const dataCancelBooking: GuestCancelType = {
        bookingId: bookingId,
        cancellationReason: cancellationReason,
        reason: reason,
        isGuest: false,
        attachments: listImage,
      };
      const responseCancelBooking = await postRequestCancelBooking(dataCancelBooking);
      console.log('post:', responseCancelBooking);

      if (responseCancelBooking && responseCancelBooking.status === 204) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang hủy booking !',
            success: 'Hủy booking thành công ! Tiền của bạn sẽ được hoàn lại theo chính sách hủy của host !',
          })
          .then(() => {
            getListBookingFromDB();
            handleCloseModalCancel();
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [open, setOpen] = useState(false);
  const [scoreGuest, setScoreGuest] = useState<number | null>(3);
  const [contentReview, setContentReview] = useState('');
  const [hoverGuest, setHoverGuest] = useState(-1);
  const handleCancelReview = async () => {
    setScoreGuest(3);
    setContentReview('');
    setOpen(false);
  };
  const handleReview = async (guestId: number) => {
    setOpen(true);
    setGuestId(guestId);
  };

  const handleReviewGuest = async () => {
    if (contentReview !== '' && scoreGuest !== null) {
      try {
        const dataPostReview: ContentReviewGuestType = {
          rating: scoreGuest || 0,
          content: contentReview,
        };
        const response = await postCreateReviewGuest(guestId, dataPostReview);
        if (response && response.status === 200) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang đăng đánh giá của bạn',
              success: 'Đăng đánh giá thành công',
            })
            .then(() => {
              handleCancelReview();
              navigate(`/guest/${guestId}`);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Bạn phải nhập đủ thông tin để đánh giá !');
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
      field: 'guestName',
      headerName: 'Tên khách',
      type: 'number',
      headerAlign: 'left',
      flex: 1,
      align: 'left',
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { guestName, guestId } }: { row: { guestName: string; guestId: number } }) => {
        return (
          <Link to={`/guest/${guestId}`} className='hover:text-cyan-700'>
            {guestName}
          </Link>
        );
      },
    },
    {
      field: 'checkInDate',
      headerName: 'Ngày Check In',
      flex: 1,
      renderCell: ({ row: { checkInDate } }: { row: { checkInDate: string } }) => {
        return <p className='text-cyan-800'>{formatDateTime(checkInDate)}</p>;
      },
    },
    {
      field: 'checkOutDate',
      headerName: 'Ngày Check Out',
      flex: 1,
      renderCell: ({ row: { checkOutDate } }: { row: { checkOutDate: string } }) => {
        return <p className='text-cyan-800'>{formatDateTime(checkOutDate)}</p>;
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng thanh toán',
      align: 'left',
      flex: 1,
      renderCell: ({
        row: { numberOfDays, pricePerNight, cleaningFee },
      }: {
        row: { numberOfDays: number; pricePerNight: number; cleaningFee: number };
      }) => {
        return <p>{formatMoney(numberOfDays * pricePerNight + cleaningFee)} vnd</p>;
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
              <Chip label='Chờ thanh toán' sx={{ backgroundColor: '#faeacf', color: '#f39c11' }} />
            )}
            {status === 'Confirmed' && (
              <Chip label='Đã xác nhận' sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }} />
            )}
            {status === 'Rejected' && <Chip label='Thất bại' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />}
            {status === 'CheckedIn' && <Chip label='Check In' sx={{ backgroundColor: '#efe1f5', color: '#9a59b5' }} />}
            {status === 'Completed' && <Chip label='Hoàn tất' sx={{ backgroundColor: '#fae3ee', color: '#b33871' }} />}
            {status === 'CancelledBeforeCheckIn' && (
              <Chip label='Hủy trước check in' sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }} />
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
      renderCell: ({
        row,
      }: {
        row: { id: number; status: string; guestId: number; guestName: string; checkInDate: string };
      }) => {
        const days = differentDays(row.checkInDate);

        return (
          <>
            {row.status === 'Pending' && days >= 2 && (
              <>
                <button
                  type='button'
                  className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2'
                  onClick={handleOpenModalCancel}
                >
                  Hủy booking
                </button>
                <Dialog open={openModalCancel} onClose={handleCloseModalCancel} maxWidth='xs' fullWidth>
                  <DialogActions className=''>
                    <Button onClick={handleCloseModalCancel} color='primary'>
                      Đóng
                    </Button>
                  </DialogActions>
                  <h3 className='text-cyan-800 font-medium uppercase pb-4 text-center'>Đơn hủy booking</h3>

                  <DialogContent>
                    <div className=''>
                      <FormControl fullWidth>
                        <InputLabel id='cancellationReason'>Lý do</InputLabel>
                        <Select
                          labelId='cancellationReason'
                          id='demo-simple-select'
                          value={cancellationReason}
                          label='Lý do'
                          onChange={handleChangeCancellationReason}
                          size='medium'
                        >
                          <MenuItem value={CancellationReason[0]} selected>
                            Vấn để cá nhân
                          </MenuItem>
                          <MenuItem value={CancellationReason[1]}>Thảm họa thiên nhiên</MenuItem>
                          <MenuItem value={CancellationReason[2]}>Vấn đề về phòng</MenuItem>
                          <MenuItem value={CancellationReason[3]}>Dịch bệnh</MenuItem>
                          <MenuItem value={CancellationReason[4]}>Bệnh tật</MenuItem>
                          <MenuItem value={CancellationReason[5]}>Lý do khác</MenuItem>
                        </Select>
                      </FormControl>
                      <p className='text-sm pt-3 pb-2 text-gray-700'>Mô tả cụ thể</p>
                      <textarea
                        rows={4}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none'
                        placeholder='Mô tả cụ thể ...'
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      ></textarea>

                      <p className='text-sm pt-3 pb-2 text-gray-700'>Hình ảnh minh chứng</p>
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              const selectedFileList = Array.from(files);
                              // Lọc ra các tệp mới không trùng tên
                              const newFiles: FileObject[] = selectedFileList.filter((file) => !fileExists(file.name));

                              if (newFiles.length > 0) {
                                // Thêm các tệp mới vào danh sách
                                setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newFiles]);
                              }
                            }
                          }}
                          multiple
                          id='listImage'
                          style={{ display: 'none' }}
                        />
                        <label htmlFor='listImage'>
                          <Button
                            variant='contained'
                            color='primary'
                            component='span'
                            startIcon={<CloudUploadIcon />}
                            size='small'
                          >
                            Upload Images
                          </Button>
                        </label>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => {
                            setSelectedFiles([]);
                            // setFieldValue('listImage', []);
                          }}
                          style={{ marginLeft: '10px' }}
                          size='small'
                        >
                          Reset
                        </Button>
                        <div>
                          {selectedFiles.length > 0 && (
                            <div className='py-2'>
                              {/* <h3 className="text-sm py-2">Selected Images:</h3> */}
                              <ImageListMUI sx={{ height: 200 }} variant='quilted' cols={1} rowHeight={200}>
                                {selectedFiles.map((file, index) => (
                                  <ImageListItem key={index}>
                                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`} loading='lazy' />
                                  </ImageListItem>
                                ))}
                              </ImageListMUI>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center justify-end gap-4 pt-8'>
                        <Button variant='outlined' size='small' onClick={handleCloseModalCancel}>
                          Cancel
                        </Button>
                        <Button variant='contained' size='small' onClick={() => handleCancelRequestBooking(row.id)}>
                          Hủy booking
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {row.status === 'Confirmed' && days >= 2 && (
              <>
                <button
                  type='button'
                  className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2'
                  onClick={handleOpenModalCancel}
                >
                  Hủy booking
                </button>
                <Dialog open={openModalCancel} onClose={handleCloseModalCancel} maxWidth='xs' fullWidth>
                  <DialogActions className=''>
                    <Button onClick={handleCloseModalCancel} color='primary'>
                      Đóng
                    </Button>
                  </DialogActions>
                  <h3 className='text-cyan-800 font-medium uppercase pb-4 text-center'>Đơn hủy booking</h3>

                  <DialogContent>
                    <div className=''>
                      <FormControl fullWidth>
                        <InputLabel id='cancellationReason'>Lý do</InputLabel>
                        <Select
                          labelId='cancellationReason'
                          id='demo-simple-select'
                          value={cancellationReason}
                          label='Lý do'
                          onChange={handleChangeCancellationReason}
                          size='medium'
                        >
                          <MenuItem value={CancellationReason[0]} selected>
                            Vấn để cá nhân
                          </MenuItem>
                          <MenuItem value={CancellationReason[1]}>Thảm họa thiên nhiên</MenuItem>
                          <MenuItem value={CancellationReason[2]}>Vấn đề về phòng</MenuItem>
                          <MenuItem value={CancellationReason[3]}>Dịch bệnh</MenuItem>
                          <MenuItem value={CancellationReason[4]}>Bệnh tật</MenuItem>
                          <MenuItem value={CancellationReason[5]}>Lý do khác</MenuItem>
                        </Select>
                      </FormControl>
                      <p className='text-sm pt-3 pb-2 text-gray-700'>Mô tả cụ thể</p>
                      <textarea
                        rows={4}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none'
                        placeholder='Mô tả cụ thể ...'
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      ></textarea>

                      <p className='text-sm pt-3 pb-2 text-gray-700'>Hình ảnh minh chứng</p>
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              const selectedFileList = Array.from(files);
                              // Lọc ra các tệp mới không trùng tên
                              const newFiles: FileObject[] = selectedFileList.filter((file) => !fileExists(file.name));

                              if (newFiles.length > 0) {
                                // Thêm các tệp mới vào danh sách
                                setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newFiles]);
                              }
                            }
                          }}
                          multiple
                          id='listImage'
                          style={{ display: 'none' }}
                        />
                        <label htmlFor='listImage'>
                          <Button
                            variant='contained'
                            color='primary'
                            component='span'
                            startIcon={<CloudUploadIcon />}
                            size='small'
                          >
                            Upload Images
                          </Button>
                        </label>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => {
                            setSelectedFiles([]);
                            // setFieldValue('listImage', []);
                          }}
                          style={{ marginLeft: '10px' }}
                          size='small'
                        >
                          Reset
                        </Button>
                        <div>
                          {selectedFiles.length > 0 && (
                            <div className='py-2'>
                              {/* <h3 className="text-sm py-2">Selected Images:</h3> */}
                              <ImageListMUI sx={{ height: 200 }} variant='quilted' cols={1} rowHeight={200}>
                                {selectedFiles.map((file, index) => (
                                  <ImageListItem key={index}>
                                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`} loading='lazy' />
                                  </ImageListItem>
                                ))}
                              </ImageListMUI>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center justify-end gap-4 pt-8'>
                        <Button variant='outlined' size='small' onClick={handleCloseModalCancel}>
                          Cancel
                        </Button>
                        <Button variant='contained' size='small' onClick={() => handleCancelRequestBooking(row.id)}>
                          Hủy booking
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {row.status === 'Completed' && (
              <button
                type='button'
                className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2'
                onClick={() => handleReview(row.guestId)}
              >
                Review
              </button>
            )}
            {open && (
              <Dialog open={open} onClose={handleCancelReview} maxWidth='xs' fullWidth>
                <DialogActions className=''>
                  <Button onClick={handleCancelReview} color='primary'>
                    Đóng
                  </Button>
                </DialogActions>
                <h2 className='text-center font-medium text-xl text-cyan-700'>Nhận xét về khách {row.guestName}</h2>
                <DialogContent>
                  <div>
                    <p className='pb-2 text-cyan-700'>Sự hài lòng của bạn</p>
                    <div className='flex items-center gap-4 py-1'>
                      <p className='text-gray-700 min-w-[120px]'>Địa điểm:</p>
                      <Rating
                        name='scoreGuest'
                        value={scoreGuest}
                        precision={1}
                        getLabelText={getLabelText}
                        onChange={(_event, newValue) => {
                          setScoreGuest(newValue);
                        }}
                        onChangeActive={(_event, newHover) => {
                          setHoverGuest(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                      />
                      {scoreGuest !== null && (
                        <p className='text-xs text-cyan-700 '>{labels[hoverGuest !== -1 ? hoverGuest : scoreGuest]}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className='pt-4 pb-2 text-cyan-700'>Nội dung đánh giá</p>
                    <textarea
                      rows={4}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none'
                      placeholder='Nội dung đánh giá ...'
                      value={contentReview}
                      onChange={(e) => setContentReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='flex justify-end gap-4 pt-4'>
                    <Button variant='outlined' onClick={handleCancelReview}>
                      Hủy
                    </Button>
                    <Button variant='contained' onClick={handleReviewGuest}>
                      Đánh giá
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className='w-full max-w-7xl mx-auto pt-8 pb-2'>
      <Breadcrumbs>
        <p className='hover:underline hover:text-cyan-600' onClick={() => navigate(-1)}>
          Trang chủ
        </p>
        <p>Danh sách booking</p>
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

export default HostManageBooking;
