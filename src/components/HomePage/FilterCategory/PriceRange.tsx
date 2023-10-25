import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { Box, TextField } from '@mui/material';

interface PropsType {
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const PriceRange = ({minPrice, maxPrice, setMinPrice, setMaxPrice} : PropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    if(Array.isArray(newValue)) {
      setMinPrice(newValue[0]);
      setMaxPrice(newValue[1])
      // console.log(newValue[0], newValue[1]);
    }
  };
  const handleChangePrice = () => {
    setMinPrice(100);
    setMaxPrice(900)
  };
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
        {maxPrice > 100 ? `Mức giá: lớn hơn 100 triệu` : `Giá: từ ${minPrice} triệu đến ${maxPrice} triệu`}
        {/* Giá: từ {minPrice} triệu đến {maxPrice} triệu */}
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
            value={`${minPrice} triệu`}
          />
          <TextField
            disabled
            id='standard-basic'
            label='Đến'
            variant='standard'
            sx={{ width: 120, pb: 2 }}
            value={`${maxPrice} triệu`}
          />
        </MenuItem>
        <MenuItem>
          <Box sx={{ width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={[minPrice, maxPrice]}
              onChange={handleChangeRange}
              step={1}
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
