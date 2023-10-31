import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  FormHelperText,
  ImageListItem,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ImageListMUI from '@mui/material/ImageList';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { GeneralSchema, generalInformation } from '@/helpers/BecomeHostValidate/GeneralInformValidate';
import { Formik } from 'formik';
import { FileObject, MenuProps, getStyles, listUtilities } from '@/shared/BecomeHost';
import { postImagePropertyUrl } from '@/services/PropertyService/propertyService';

const InformationRoomAndPolicy = () => {
  const [utilities] = useState<string[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const theme = useTheme();
  const handleChangeAccordion = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some((file) => file.name === fileName);
  };

  const handleSubmitBecomeHost = async (values: any) => {
    const formData = new FormData();
    formData.append('file', values.listImage[0]);
    console.log(values.listImage[0]);
    const response = await postImagePropertyUrl(formData);
    console.log(response);
  };

  return (
    <div className='py-8'>
      <h2 className='text-center text-2xl text-cyan-700 pb-4'>NHẬP CÁC THÔNG TIN VỀ PHÒNG, ĐIỀU KHOẢN VÀ CHÍNH SÁCH</h2>
      <div className='max-w-4xl mx-auto'>
        <Formik initialValues={generalInformation} onSubmit={handleSubmitBecomeHost} validationSchema={GeneralSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit} name='become-host' method='get'>
                <p className='text-xl py-3 text-cyan-700 uppercase'>Thông tin tổng quan</p>
                <div className='mb-2'>
                  <label htmlFor='roomName' className=''>
                    Tên phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    fullWidth
                    id='roomName'
                    label='Nhập tên phòng'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.roomName}
                    error={!!touched.roomName && !!errors.roomName}
                    helperText={touched.roomName && errors.roomName}
                  />
                </div>

                <div className='mb-2'>
                  <label htmlFor='description' className=''>
                    Mô tả phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    fullWidth
                    id='description'
                    label='Nhập mô tả phòng'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='address' className=''>
                    Địa chỉ
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    fullWidth
                    id='address'
                    label='Nhập địa chỉ phòng'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                </div>
                <p className='text-xl py-3 text-cyan-700 uppercase'>Thông tin chi tiết</p>
                <div className='mb-2'>
                  <label htmlFor='quantityOld' className=''>
                    Số lượng người lớn tối đa
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='quantityOld'
                    label='Nhập số lượng người lớn tối đa'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityOld}
                    error={!!touched.quantityOld && !!errors.quantityOld}
                    helperText={touched.quantityOld && errors.quantityOld}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='quantityChild' className=''>
                    Số lượng trẻ em tối đa
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='quantityChild'
                    label='Nhập số lượng người lớn tối đa'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityChild}
                    error={!!touched.quantityChild && !!errors.quantityChild}
                    helperText={touched.quantityChild && errors.quantityChild}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='quantityBedRooms' className=''>
                    Số lượng phòng ngủ
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='quantityBedRooms'
                    label='Nhập số lượng phòng ngủ'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBedRooms}
                    error={!!touched.quantityBedRooms && !!errors.quantityBedRooms}
                    helperText={touched.quantityBedRooms && errors.quantityBedRooms}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='quantityBed' className=''>
                    Số lượng giường
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='quantityBed'
                    label='Nhập số lượng giường'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBed}
                    error={!!touched.quantityBed && !!errors.quantityBed}
                    helperText={touched.quantityBed && errors.quantityBed}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='quantityBathRooms' className=''>
                    Số lượng phòng tắm
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='quantityBathRooms'
                    label='Nhập số lượng phòng tắm'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBathRooms}
                    error={!!touched.quantityBathRooms && !!errors.quantityBathRooms}
                    helperText={touched.quantityBathRooms && errors.quantityBathRooms}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='utilities'>Thêm tiện ích</label>
                  <Select
                    labelId='utilities'
                    name='utilities'
                    id='utilities'
                    multiple
                    value={values.utilities}
                    onChange={handleChange}
                    error={!!touched.utilities && !!errors.utilities}
                    onBlur={handleBlur}
                    input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{
                      mt: 1,
                    }}
                    fullWidth
                    MenuProps={MenuProps}
                  >
                    {listUtilities.map((utility) => (
                      <MenuItem key={utility} value={utility} style={getStyles(utility, utilities, theme)}>
                        <Checkbox checked={values.utilities.includes(utility)} />
                        {utility}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.utilities && errors.utilities && (
                    <FormHelperText style={{ color: '#D32F2F', marginLeft: '10px' }}>{errors.utilities}</FormHelperText>
                  )}
                </div>
                <div className='mb-2'>
                  <label htmlFor='pricePerNight' className=''>
                    Giá phòng 1 đêm
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='pricePerNight'
                    label='Nhập giá tiền / đêm'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pricePerNight}
                    error={!!touched.pricePerNight && !!errors.pricePerNight}
                    helperText={touched.pricePerNight && errors.pricePerNight}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='feeCleaning' className=''>
                    Phí vệ sinh
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type='number'
                    fullWidth
                    id='feeCleaning'
                    label='Nhập phí vệ sinh'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.feeCleaning}
                    error={!!touched.feeCleaning && !!errors.feeCleaning}
                    helperText={touched.feeCleaning && errors.feeCleaning}
                  />
                </div>

                <p className='text-xl py-3 text-cyan-700 uppercase'>Chính sách & Điều khoản</p>
                <div>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='flexible'
                    name='policy'
                    onChange={handleChange}
                  >
                    <FormControlLabel value='flexible' control={<Radio />} label='Flexible' />
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                        <p className='text-cyan-700'>Chính sách linh hoạt</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='text-gray-600 font-thin text-sm'>
                          Người thuê có thể hủy phòng trong 48h trước khi checkin và được hoàn trả 100% tiền đặt phòng.
                          Nếu sau thời gian đó thì bên cho thuê được trả tiền cho mỗi đêm đã ở và đêm tiếp theo. Cụ thể
                          như sau:
                        </p>
                        <p className='text-gray-600 font-thin text-sm'>
                          - Nếu người thuê chưa ở đêm nào thì tính tiền 1 đêm (không tính chi phí dọn dẹp)
                        </p>
                        <p className='text-gray-600 font-thin text-sm'>
                          - Đã ở ⅗ đêm thì tính ⅘ đêm (có tính chi phsi dọn dẹp)
                        </p>
                        <div className='pt-4'>
                          <p className='text-sm text-cyan-700 font-medium'>
                            Dành cho người cho thuê, áp dụng cho toàn hệ thống
                          </p>
                          <p className='text-gray-600 font-thin text-sm'>
                            - Nếu hủy phòng trong vòng 48h, thì bị phạt 50% tổng tiền của các đêm (ko tính tiền hoa hồng
                            của hệ thống và tiền vệ sinh)
                          </p>
                          <p className='text-gray-600 font-thin text-sm'>- Nếu từ 48h đến 14 ngày, bị phạt 25%</p>
                          <p className='text-gray-600 font-thin text-sm'>- Trên 14 ngày, phạt 10%</p>
                          <p className='text-gray-600 font-thin text-sm'>
                            - Nếu có lý do chính đáng: thiên tai, dịch bệnh thì không bị phạt
                          </p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <FormControlLabel value='strict' control={<Radio />} label='Strict' />
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
                      <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
                        <p className='text-cyan-700'>Chính sách nghiêm ngặt</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='text-gray-600 font-thin text-sm'>
                          Người thuê có thể hủy phòng trước 5 ngày và được hoàn trả 100% tiền đặt phòng. Nếu sau thời
                          gian đó thì bên cho thuê được trả tiền cho mỗi đêm đã ở + 50% các đêm chưa ở. Ví dụ:
                        </p>
                        <p className='text-gray-600 font-thin text-sm'>
                          - Nếu chưa ở đêm nào thì được tính tiền 2.5 đêm
                        </p>
                        <p className='text-gray-600 font-thin text-sm'>
                          - Nếu đã ở 2 đêm thì được tính: 2 + 50% * 3 = 3.5 đêm
                        </p>
                        <div className='pt-4'>
                          <p className='text-sm text-cyan-700 font-medium'>
                            Dành cho người cho thuê, áp dụng cho toàn hệ thống
                          </p>
                          <p className='text-gray-600 font-thin text-sm'>
                            - Nếu hủy phòng trong vòng 48h, thì bị phạt 50% tổng tiền của các đêm (không tính tiền hoa
                            hồng của hệ thống và tiền vệ sinh)
                          </p>
                          <p className='text-gray-600 font-thin text-sm'>- Nếu từ 48h đến 14 ngày, bị phạt 25%</p>
                          <p className='text-gray-600 font-thin text-sm'>- Trên 14 ngày, phạt 10%</p>
                          <p className='text-gray-600 font-thin text-sm'>
                            - Nếu có lý do chính đáng: thiên tai, dịch bệnh thì không bị phạt
                          </p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </RadioGroup>
                </div>
                <div className='py-8'>
                  <p className='text-xl py-3 text-cyan-700 uppercase'>THÊM ẢNH ĐỂ QUẢNG BÁ PHÒNG CỦA BẠN</p>
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
                            // console.log(selectedFiles);
                            setFieldValue('listImage', [...selectedFiles, ...newFiles]);
                          }
                        }
                      }}
                      multiple
                      id='listImage'
                      style={{ display: 'none' }}
                    />
                    {/* <button onClick={handleUpload}>Upload Images</button> */}
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
                        setFieldValue('listImage', []);
                      }}
                      style={{ marginLeft: '10px' }}
                      size='small'
                    >
                      Reset
                    </Button>
                    {errors.listImage && touched.listImage && (
                      <FormHelperText style={{ color: '#D32F2F', marginLeft: '10px' }}>Ít nhất 4 ảnh</FormHelperText>
                    )}
                    <div>
                      {selectedFiles.length > 0 && (
                        <div>
                          <h3>Selected Images:</h3>
                          <ImageListMUI sx={{ height: 700 }} variant='quilted' cols={2} rowHeight={800}>
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
                </div>
                <Button type='submit' variant='contained' color='primary'>
                  Bắt đầu cho thuê
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default InformationRoomAndPolicy;
