import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuQuantityCustomer = () => {
  const [counter1, setCounter1] = React.useState(0);
  const handleIncrease1 = () => {
    setCounter1(counter1 + 1);
  };
  const handleDecrease1 = () => {
    if (counter1 >= 1) setCounter1(counter1 - 1);
  };
  const [counter2, setCounter2] = React.useState(0);
  const handleIncrease2 = () => {
    setCounter2(counter2 + 1);
  };
  const handleDecrease2 = () => {
    if (counter2 >= 1) setCounter2(counter2 - 1);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(counter1);
  console.log(counter2);
  return (

    <div className="">
      <Button
        variant="outlined"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{height: 56}}
      >
        Số khách
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
          <Button onClick={handleDecrease1}>
            <RemoveCircleOutlineIcon sx={{ color: 'black', mr: 1 }} />
          </Button>
          <p>{counter1}</p>
          <Button onClick={handleIncrease1}>
            <AddCircleOutlineIcon sx={{ color: 'black', ml: 1 }} />
          </Button>
        </MenuItem>
        <MenuItem>
          Số trẻ em:
          <Button onClick={handleDecrease2}>
            <RemoveCircleOutlineIcon sx={{ color: 'black', ml: 3.8, mr: 2 }} />
          </Button>
          <p>{counter2}</p>
          <Button onClick={handleIncrease2}>
            <AddCircleOutlineIcon sx={{ color: 'black', ml: 1 }} />
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuQuantityCustomer;
