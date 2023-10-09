import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface CounterProps {
  selectedValue: number;
  onValueChange: (value: number) => void;
}
const numbers =[
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
]
const Quantity: React.FC<CounterProps> = ({ selectedValue, onValueChange }) => {
  // const [quantity, setQuantity] = React.useState('');

  // const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setQuantity(event.target.value);
  // };
  const handleSelectChange = (event: SelectChangeEvent) => {
    const newValue = parseInt(event.target.value, 10);
    onValueChange(newValue);
  };
  return (    
    <FormControl>
      {/* <InputLabel id="select-label">Number</InputLabel> */}
      <Select
        // labelId="select-label"
        // id="demo-simple-select"
        value={String(selectedValue)}
        // label="Number"
        onChange={handleSelectChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        style={{width:'350px',height:'30px',border:'1px solid #000000'}}
        >
        {numbers.map((number, index) => (
        <MenuItem key={`number-${index}`} value={number}>
          {number}
        </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default Quantity;