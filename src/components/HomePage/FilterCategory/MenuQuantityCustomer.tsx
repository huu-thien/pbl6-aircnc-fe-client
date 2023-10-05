import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
interface MyComponentProps {
  width: number;
}

const MenuQuantityCustomer: React.FC<MyComponentProps> = ({width}) => {
  const [quantityOld, setQuantityOld] = React.useState(0);
  const [quantityYoung, setQuantityYoung] = React.useState(0);
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
  console.log('Quantity old: ', quantityOld);
  console.log('Quantity young: ', quantityYoung);
  const numberOfGuest = quantityOld + quantityYoung;
  return (
    <div className="">
      <Button
        variant="outlined"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ height: 56 , width: width, color:'#4F4F4F'}}
      >
        Số khách:  {numberOfGuest} người
      </Button>
      <Menu
        className="rouned-lg"
        id="account-menu"
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
            <RemoveCircleOutlineIcon sx={{ color: 'black', mr: 1 }} />
          </Button>
          <p>{quantityOld}</p>
          <Button onClick={handleIncreaseOld}>
            <AddCircleOutlineIcon sx={{ color: 'black', ml: 1 }} />
          </Button>
        </MenuItem>
        <MenuItem>
          Số trẻ em:
          <Button onClick={handleDecreaseYoung}>
            <RemoveCircleOutlineIcon sx={{ color: 'black', ml: 3.8, mr: 2 }} />
          </Button>
          <p>{quantityYoung}</p>
          <Button onClick={handleIncreaseYoung}>
            <AddCircleOutlineIcon sx={{ color: 'black', ml: 1 }} />
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuQuantityCustomer;
