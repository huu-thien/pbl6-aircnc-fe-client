import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const provinces = [
  'Hà Nội',
  'Hà Giang',
  'Cao Bằng',
  'Lào Cai',
  'Điện Biên',
  'Lai Châu',
  'Sơn La',
  'Yên Bái',
  'Hoà Bình',
  'Thanh Hóa',
  'Nghệ An',
  'Hà Tĩnh',
  'Quảng Bình',
  'Quảng Trị',
  'Thừa Thiên-Huế',
  'Đà Nẵng',
  'Quảng Nam',
  'Quảng Ngãi',
  'Bình Định',
  'Phú Yên',
  'Khánh Hòa',
  'Ninh Thuận',
  'Bình Thuận',
  'Kon Tum',
  'Gia Lai',
  'Đắk Lắk',
  'Đắk Nông',
  'Lâm Đồng',
  'Bình Phước',
  'Tây Ninh',
  'Bình Dương',
  'Đồng Nai',
  'Bà Rịa-Vũng Tàu',
  'TP. Hồ Chí Minh',
  'Long An',
  'Tiền Giang',
  'Bến Tre',
  'Trà Vinh',
  'Vĩnh Long',
  'Đồng Tháp',
  'An Giang',
  'Kiên Giang',
  'Cần Thơ',
  'Hậu Giang',
  'Sóc Trăng',
  'Bạc Liêu',
  'Cà Mau',
  'Đồng Bằng Sông Cửu Long',
  'Bà Rịa',
  'Sài Gòn',
  'Bắc Ninh',
  'Bắc Giang',
  'Hải Dương',
  'Hải Phòng',
  'Hưng Yên',
  'Nam Định',
  'Ninh Bình',
  'Thái Bình',
  'Thái Nguyên',
  'Vĩnh Phúc',
  'Phú Thọ',
  'Quảng Ninh',
  'Hòa Bình',
];

export default function BasicSelect() {
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  console.log('city: ', city);

  return (
    <Box sx={{ minWidth: 200, minHeight: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tỉnh/Thành</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Tỉnh/Thành"
          onChange={handleChange}
        >
          {provinces.map((city, index) => (
            <MenuItem key={`city-${index}`} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
