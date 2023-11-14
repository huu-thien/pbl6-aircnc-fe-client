import { PropertyUtilitiesType } from '@/@types/property';
// import { formatPropertyName } from '@/helpers/FormatUtility/formatUtility';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import UtilityItem from './UtilityItem';
interface PropsType {
  propertyUtilities: PropertyUtilitiesType[];
}

const PropertyUtilities = ({ propertyUtilities }: PropsType) => {
  const [listUtility] = useState<PropertyUtilitiesType>(propertyUtilities[0]);
  let trueUtility: string[] = [];
  if (listUtility) {
    trueUtility = Object.keys(listUtility).filter((utility) => listUtility[utility] === true);
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='py-4'>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Hiển thị tất cả tiện nghi
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogActions className=''>
          <Button onClick={handleClose} color='primary'>
            Đóng
          </Button>
        </DialogActions>
        <h2 className='text-center font-medium text-xl'>
          {trueUtility.length > 0 ? 'Tất cả tiện nghi' : 'Chưa có tiện nghi nào'}
        </h2>
        <DialogContent>
          <div className=''>
            {trueUtility &&
              trueUtility.map((utility, index) => <UtilityItem key={`${utility}_${index}`} utility={utility} />)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyUtilities;
