import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const BookingConfirmed = () => {
  const navigate = useNavigate();
  return (
    <div className='max-w-7xl mx-auto w-full py-8'>
      
      <div className="inline-flex gap-3">
        <p className='hover:underline hover:text-cyan-600' onClick={() => navigate(-1)}>
          <ArrowBackIcon/>
        </p>
        <h1 className="font-bold text-2xl  text-cyan-800 line-clamp-1">Yêu cầu đặt phòng/đặt chỗ</h1>
      </div>

      
      <h2 className="text-xl text-cyan-800 font-bold pt-8 pb-3">Chuyến đi của bạn</h2>
      <div className="grid grid-cols-3 gap-1.5">
        <div className='inline-flex justify-between font-extralight'>
          <p>Ngày đi</p>
          <p>26/10/2023</p>
        </div>
        <div className=''></div>
        <div className=''></div>
        <div className='inline-flex justify-between font-extralight'>
          <p>Ngày về</p>
          <p>28/10/2023</p>
        </div>
        <div className=''></div>
        <div className=''></div>
        <div className='inline-flex justify-between font-extralight'>
          <p>Số người lớn</p>
          <p>2 người</p>
        </div>
        <div className=''></div>
        <div className=''></div>
        <div className='inline-flex justify-between font-extralight'>
          <p>Số trẻ em</p>
          <p>5 người</p> 
        </div>
        <div className=''></div>
        <div className=''></div>
        <div className='inline-flex justify-between font-extralight'>
          <p>Giá tiền mỗi đêm x số đêm</p>
          <p>50000VND x 5</p>
        </div>
        <div className=''></div>
        <div className=''></div>
        <div className='inline-flex justify-between font-semibold'>
          <p>Tổng tiền</p>
          <p>25000000VND</p>
        </div>
      </div>
      <h2 className="text-xl text-cyan-800 font-bold pb-3 pt-5">Ghi chú cho chủ nhà</h2>
      <TextareaAutosize
        minRows={10}
        maxRows={20}
        placeholder="Nhập nội dung ở đây"
        style={{ width: '50%',border:'1px solid', borderRadius:'5px' }} 
      />
      <h2 className="text-xl text-cyan-800 font-bold pb-3 pt-5">Chính sách hủy</h2>
        <p className='text-cyan-700'>Chính sách linh hoạt</p>
        <p className=' font-extralight text-sm'>
            Người thuê có thể hủy phòng trong 48h trước khi checkin và được hoàn trả 100% tiền đặt phòng.
            Nếu sau thời gian đó thì bên cho thuê được trả tiền cho mỗi đêm đã ở và đêm tiếp theo. Cụ thể
            như sau:
        </p>
        <p className=' font-thin text-sm'>
          - Nếu người thuê chưa ở đêm nào thì tính tiền 1 đêm (không tính chi phí dọn dẹp)
        </p>
        <p className=' font-thin text-sm pb-5'>
          - Đã ở ⅗ đêm thì tính ⅘ đêm (có tính chi phsi dọn dẹp)
        </p>
      
      <Button variant='contained' >
        Yêu cầu đặt phòng
      </Button>
    </div>
  )
}

export default BookingConfirmed