import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};
const provinces = [
  'An Giang',
  'Bà Rịa',
  'Bà Rịa-Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Cà Mau',
  'Cao Bằng',
  'Cần Thơ',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Bằng Sông Cửu Long',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hoà Bình',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Long An',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sài Gòn',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên-Huế',
  'Tiền Giang',
  'TP. Hồ Chí Minh',
  'Trà Vinh',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];

export default function BasicSelect() {
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  console.log('city: ', city);

  return (
    <FormControl fullWidth sx={{ minWidth: 200, width: 200 }}>
      <InputLabel id="demo-simple-select-label">Tỉnh/Thành</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={city}
        label="Tỉnh/Thành"
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {provinces.map((city, index) => (
          <MenuItem key={`city-${index}`} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
