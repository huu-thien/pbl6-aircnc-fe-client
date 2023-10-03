import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const prices = [
  "Tất cả mức giá",
  "Dưới $20",
  "Dưới $50",
  "$70",
  "$100"
];


export default function BasicSelect() {
  const [price, setPrice] = React.useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };
  console.log(price);
  
  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Giá phòng/ngày </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={price}
          label="Giá phòng/ngày"
          onChange={handleChange}
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {
            prices.map((price,index)=><MenuItem key={`price-${index}`} value={price}>{price}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}