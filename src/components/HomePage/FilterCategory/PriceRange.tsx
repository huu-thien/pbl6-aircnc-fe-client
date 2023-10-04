import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const prices = ['Tất cả mức giá', 'Dưới $20', 'Dưới $50', '$70', '$100'];

export default function BasicSelect() {
  const [price, setPrice] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };
  console.log(price);

  return (
    <FormControl fullWidth sx={{minWidth: 200, width: 200}}>
      <InputLabel id="demo-simple-select-label">Giá phòng/ngày </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={price}
        label="Giá phòng/ngày"
        onChange={handleChange}
      >
        {prices.map((price, index) => (
          <MenuItem key={`price-${index}`} value={price}>
            {price}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
