import React, { useState } from 'react';
import { Tabs, Tab, FormControl, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Quantity from './Quantity';
import Amenities from './Utilities';

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
const provinces = [
  'An Giang',
  'Bà Rịa',
  'Bà Rịa-Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Cà Mau',
  'Cao Bằng',
  'Cần Thơ',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Bằng Sông Cửu Long',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hoà Bình',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Long An',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sài Gòn',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên-Huế',
  'Tiền Giang',
  'TP. Hồ Chí Minh',
  'Trà Vinh',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];

const InformationRoomAndPolicy: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [roomName, setRoomName] = useState('');
  const [descriptionRoom, setDescriptionRoom] = useState('');
  const [city, setCity] = useState('');
  
  const [quantityOld, setQuantityOld] = useState(0);
  const [quantityYoung, setQuantityYoung] = useState(0);
  const [quantityBedroom, setQuantityBedroom] = useState(0);
  const [quantityBed, setQuantityBed] = useState(0);
  const [quantityBathroom, setQuantityBathroom] = useState(0);
  const [utilities, setUtilities] = useState([]);

  const [policy, setPolicy] = React.useState('Flexible');
  

  const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setSelectedTab(newValue);
  };
  const handleRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
   };
  const handleDescriptionRoom = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionRoom(event.target.value);
  };
  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const handleValueQuantityOld = (newValue: number) => {
    setQuantityOld(newValue);
  };
  const handleValueQuantityYoung = (newValue: number) => {
    setQuantityYoung(newValue);
  };
  const handleValueQuantityBedroom = (newValue: number) => {
    setQuantityBedroom(newValue);
  };
  const handleValueQuantityBed = (newValue: number) => {
    setQuantityBed(newValue);
  };
  const handleValueQuantityBathroom = (newValue: number) => {
    setQuantityBathroom(newValue);
  };
  const handleSelectedUtilities = (selectedValues: React.SetStateAction<never[]>) => {
    setUtilities(selectedValues);
  };

  const handleChangePolicy = (event: { target: { value: any; }; }) => {
    setPolicy(event.target.value);
  };

  console.log("Ten phong: ", roomName);
  console.log("Mo ta phong: ",descriptionRoom);
  console.log("Dia chi: ", city);
  console.log("So nguoi lon max: " ,quantityOld);
  console.log("So tre em max: " ,quantityYoung);
  console.log("So phong ngu : " ,quantityBedroom);
  console.log("So giuong: " ,quantityBed);
  console.log("So phong tam: " ,quantityBathroom);
  console.log("Tien ich: ",utilities);
  console.log("Chinh sach: ",policy);
  return (
    <div className='mb-10' >
      <h2>NHẬP CÁC THÔNG TIN VỀ PHÒNG, ĐIỀU KHOẢN VÀ CHÍNH SÁCH</h2>
      <div>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary" // Màu chỉ báo dưới tab hiện tại
          textColor="primary" // Màu chữ cho các tab
          
        >
          <Tab label="Thông tin tổng quan" style={{fontSize:'12px'}}/>
          <Tab label="Thông tin chi tiết" style={{fontSize:'12px'}}/>
          <Tab label="Điều khoản và chính sách" style={{fontSize:'12px'}}/>
        </Tabs>
        {/* Hiển thị nội dung của tab hiện tại */}
        
        { selectedTab === 0 && 
          <div className='grid gap-2' style={{border:'4px solid #3366CC', width:'560px',height: '130px'}}>
            <div className='inline-flex gap-12 mt-3'>
              <p>Tên phòng :</p>
              <input
                className="input-with-border " // Sử dụng lớp CSS đã định nghĩa
                type="text"
                value={roomName}
                onChange={handleRoomName}
                placeholder="Nhập văn bản ở đây"
                style={{border: '1px solid #000000', width:'400px',marginLeft:'3px'}}
            />
            </div>
            <div className='inline-flex gap-20'>
              <p> Mô tả :</p>
              <textarea
                value={descriptionRoom}
                onChange={handleDescriptionRoom}
                placeholder="Mô tả chỗ ở của bạn"
                rows={1} // Số dòng mặc định
                cols={44} // Số cột mặc định
                style={{border: '1px solid #000000', marginLeft:'7px',width:'400px'}}
              />
            </div>
            <div className='flex gap-20'>
              <p className=''> Địa chỉ :</p>
              <FormControl >
                {/* <InputLabel id="demo-simple-select-label" >Tỉnh/ thành phố</InputLabel> */}
                <Select
                  // labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  value={city}
                  // label="Tỉnh/thành phố"
                  onChange={handleChangeCity}
                  MenuProps={MenuProps}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  style={{width:'401px',height:'30px',border:'1px solid #000000',marginLeft:'-2px'}}
                >
                  
                  {provinces.map((city, index) => (
                    <MenuItem key={`city-${index}`} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        }
        { selectedTab === 1 && 
          <div className='grid gap-2' style={{border:'4px solid #3366CC', width:'560px',height: '255px'}}>
            <div className='inline-flex gap-12 mt-3'>
              <p>Số người lớn max :</p>
              <Quantity selectedValue={quantityOld} onValueChange={handleValueQuantityOld} />
            </div>
            <div className='inline-flex gap-16 '>
              <p>Số trẻ em max :</p>
              <div className='ml-1.5'><Quantity selectedValue={quantityYoung} onValueChange={handleValueQuantityYoung}/></div>
            </div>
            <div className='inline-flex gap-16 '>
              <p>Số phòng ngủ :</p>
              <div className='ml-2.5'><Quantity selectedValue={quantityBedroom} onValueChange={handleValueQuantityBedroom}/></div>
            </div>
            <div className='inline-flex gap-24 '>
              <p>Số giường :</p>
              <div className='ml-2'><Quantity selectedValue={quantityBed} onValueChange={handleValueQuantityBed}/></div>
            </div>
            <div className='inline-flex gap-16 '>
              <p>Số phòng tắm :</p>
              <div className='ml-2.5'><Quantity selectedValue={quantityBathroom} onValueChange={handleValueQuantityBathroom}/></div>
            </div>
            <div className='inline-flex gap-28 '>
              <p>Tiện ích :</p>
              <div className='ml-3'><Amenities onSelectedValuesChange={()=>handleSelectedUtilities}/></div>
            </div>
            
            
          </div>
        }
        { selectedTab === 2 && 
          <div>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={policy}
                onChange={handleChangePolicy}
              >
                <FormControlLabel value="flexible" control={<Radio />} label="Flexible" />
                <p className='font-thin'>
                  Guest có thể cancel 48h trước khi checkin và dc refund 100%
                  Nếu sau thời gian đó thì bên host được trả tiền cho mỗi đêm đã ở + 1:
                  Chưa ở đêm nào thì dc tính 1 đêm (ko tinh chi phi don dep) 
                  Đã ở ⅗ đêm thì tính ⅘ đêm (+ them chi phi don dep)
                </p>
                <FormControlLabel value="strict" control={<Radio />} label="Strict" />
                <p className='font-thin'>
                  Guest có thể cancel trước 5 ngày và dc refund 100%
                  Nếu sau thời gian đó thì bên host dc trả tiền cho mỗi đêm đã ở + 1, và 50% các đêm chưa ở: (vd nếu guest đặt 5 đêm)
                  Nếu chưa ở đêm nào thì đc tính tiền 2,5 đêm
                  Nếu đã ở 2 đêm thì tính tiền  2/ 5 + 50% * 3/5 = 3,5 đêm
                </p>
              </RadioGroup>
            </FormControl>
          </div>
        }
      </div>
    </div>
  );
}

export default InformationRoomAndPolicy;