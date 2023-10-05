import MenuQuantityCustomer from "../HomePage/FilterCategory/MenuQuantityCustomer"
import BookingTime from "./BookingRoom/BookingTime"
import Button from "@mui/material/Button"
import { Divider } from '@mui/material';
const infoPriceRoom ={
  priceRoomPerNight: 74,
  numberOfNights: 5,
  disCount: 10,
  serviceCharge: 50
}

const BookingRoom = () => {
  const price = infoPriceRoom.numberOfNights* infoPriceRoom.priceRoomPerNight;
  const total = price - infoPriceRoom.disCount + infoPriceRoom.serviceCharge;
  return (
    <div className='grid ' style={{border:'1px solid #000',borderRadius: '7px',background: '#F5F5F5'}}>
      
      <div className='grid mt-3 ml-5 mr-5 gap-5'>
        <p style={{fontSize:'20px'}}>${infoPriceRoom.priceRoomPerNight}/đêm</p>
        <div className="grid ">
          <BookingTime/>
          <MenuQuantityCustomer width={400} />
        </div>
        <Button variant="contained" style={{height:56}}> Đặt phòng</Button>
      </div>
      <div className="grid mt-7 ml-5 mr-5 mb-5 gap-2">
        <div className="flex justify-between">
          <p>${infoPriceRoom.priceRoomPerNight} x {infoPriceRoom.numberOfNights} đêm</p>
          <p>{price}</p>
        </div>
        <div className="flex justify-between">
          <p>Giảm giá cho thời gian ở dài hạn</p>
          <p>-${infoPriceRoom.disCount}</p>
        </div>
        <div className="flex justify-between">
          <p>Phí dịch vụ AirCnC</p>
          <p>${infoPriceRoom.serviceCharge}</p>
        </div>
        <Divider/>
        <div className="flex justify-between" style={{fontSize:18}}>
          <p>Tổng trước thuế </p>
          <p>${total}</p>
        </div>
      </div>

      
    </div>
  )
}

export default BookingRoom