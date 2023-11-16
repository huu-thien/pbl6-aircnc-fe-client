import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { provinces } from '@/@types/city';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 410,
    },
  },
};

function Provinces() {
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  console.log('city: ', city);

  return (
    <FormControl sx={{ width: 410, height: 30, ml: 1 }}>
      <InputLabel id='demo-simple-select-label'>Tỉnh/ thành phố</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={city}
        label='Tỉnh/thành phố'
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
export default Provinces;
