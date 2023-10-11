import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Xem tất cả
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
        <DialogContent>
          <div className=''>

          </div>

        </DialogContent>
        
      </Dialog>
    </div>
  );
}

export default App;
