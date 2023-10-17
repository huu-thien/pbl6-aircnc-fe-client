import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { Box, TextField } from '@mui/material';

// function valuetext(value: number) {
//   return `${value}°C`;
// }

const PriceRange = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  console.log(value);
  const handleChangePrice = () => {
    setValue([100, 999] as number[]);
  };
  console.log(value);

  return (
    <div className=''>
      <Button
        sx={{ height: 60, minWidth: 300 }}
        fullWidth
        variant='outlined'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
      >
        Mức giá: từ {value[0]} đến {value[1]} triệu
      </Button>
      <Menu
        className='rouned-lg'
        id='account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            borderRadius: 3,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className='flex gap-4 pb-12'>
          <TextField
            disabled
            id='standard-basic'
            label='Từ'
            variant='standard'
            sx={{ width: 120, pb: 2 }}
            value={`${value[0]} triệu`}
          />
          <TextField
            disabled
            id='standard-basic'
            label='Đến'
            variant='standard'
            sx={{ width: 120, pb: 2 }}
            value={`${value[1]} triệu`}
          />
        </MenuItem>
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={value}
              onChange={handleChangeRange}
              step={0.5}
              valueLabelDisplay='auto'
              // getAriaValueText={valuetext}
            />
          </Box>
        </MenuItem>
        <MenuItem onClick={handleChangePrice}>
          <p className='text-cyan-700'>Lớn hơn 100 triệu</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PriceRange;
