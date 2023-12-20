import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = ['Room', 'Resort', 'Villa', 'HomeStay', 'House', 'Hotel', 'Cabin', 'Apartment'];

interface PropsType {
  propertyType: string[];
  handleChangePropertyType: (event: SelectChangeEvent<string[]>) => void;
  // setPropertyType: React.Dispatch<React.SetStateAction<string[]>>;
}

const PropertyType = ({ propertyType, handleChangePropertyType }: PropsType) => {
  return (
    <div>
      <FormControl sx={{ width: 200, minHeight: 12 }}>
        <InputLabel id='demo-multiple-checkbox-label'>Loại phòng</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={propertyType}
          onChange={handleChangePropertyType}
          input={<OutlinedInput label='Loại phòng' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={propertyType.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default PropertyType;
