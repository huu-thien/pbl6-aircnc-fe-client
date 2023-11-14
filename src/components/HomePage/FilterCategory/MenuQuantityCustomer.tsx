import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface PropsType {
  quantityOld: number;
  setQuantityOld: React.Dispatch<React.SetStateAction<number>>;
  quantityYoung: number;
  setQuantityYoung: React.Dispatch<React.SetStateAction<number>>;
}

const MenuQuantityCustomer = ({ quantityOld, setQuantityOld, quantityYoung, setQuantityYoung }: PropsType) => {
  const handleIncreaseOld = () => {
    setQuantityOld(quantityOld + 1);
  };
  const handleDecreaseOld = () => {
    if (quantityOld >= 1) setQuantityOld(quantityOld - 1);
  };
  const handleIncreaseYoung = () => {
    setQuantityYoung(quantityYoung + 1);
  };
  const handleDecreaseYoung = () => {
    if (quantityYoung >= 1) setQuantityYoung(quantityYoung - 1);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const numberOfGuest = quantityOld + quantityYoung;
  return (
    <div className=''>
      <Button
        sx={{ height: 60 }}
        fullWidth
        variant='outlined'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Số khách: {numberOfGuest} người
      </Button>
      <Menu
        className='rouned-lg'
        id='account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          Số người lớn:
          <Button onClick={handleDecreaseOld}>
            <RemoveCircleOutlineIcon sx={{ color: '#257b9a', mr: 1 }} />
          </Button>
          <p>{quantityOld}</p>
          <Button onClick={handleIncreaseOld}>
            <AddCircleOutlineIcon sx={{ color: '#257b9a', ml: 1 }} />
          </Button>
        </MenuItem>
        <MenuItem>
          Số trẻ em:
          <Button onClick={handleDecreaseYoung}>
            <RemoveCircleOutlineIcon sx={{ color: '#257b9a', ml: 3.8, mr: 2 }} />
          </Button>
          <p>{quantityYoung}</p>
          <Button onClick={handleIncreaseYoung}>
            <AddCircleOutlineIcon sx={{ color: '#257b9a', ml: 1 }} />
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuQuantityCustomer;
