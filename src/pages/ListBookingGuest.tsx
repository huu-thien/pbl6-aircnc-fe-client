import Filter from '@/components/ListBookingGuest/Filter'
import { Breadcrumbs } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'

const listRoomBookingGuest = [
  {
    id: 1,
    propertyId :1,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :2,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :3,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :4,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :5,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Confirmed',
    note: '',
  },
  {
    id: 1,
    propertyId :6,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :7,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  },
  {
    id: 1,
    propertyId :8,
    propertyName : 'Nong Trai NHS',
    hostID:1,
    hostName: 'Thanh Binh',
    hostEmail: 'abc@gmail.com',
    hostPhoneNumber: '0933838221',
    checkInDate: '23/09/2023',
    checkOutDate: '25/09/2023',
    numberOfDays: 2,
    pricePerNight: 40000,
    totalPrice: 80000,
    numberOfAdults: 2,
    numberOfChildren: 3,
    status: 'Pending',
    note: '',
  }
]

const ListBookingGuest = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full max-w-7xl mx-auto py-8'>
      <Breadcrumbs aria-aria-label='Breadcrumbs' className='pb-4'>
        <p className='hover:underline hover:text-cyan-600' onClick={()=> navigate(-1)}>
          Trang chủ
        </p>
        <p>Danh sách booking</p>
      </Breadcrumbs>  
      <Filter/> 
      <Divider/>
      <h1 className="text-center text-3xl text-cyan-700 pb-4 pt-5">Danh sách các booking</h1>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-4 py-3'>ID Room</th>
              <th scope='col' className='px-4 py-3'>Tên Phòng</th>
              <th scope='col' className='px-4 py-3'>Tên Host</th>
              <th scope='col' className='px-4 py-3'>SĐT Host</th>
              <th scope='col' className='px-4 py-3'>Số người lớn</th>
              <th scope='col' className='px-4 py-3'>Số trẻ em</th>
              <th scope='col' className='px-4 py-3'>Ngày Check-in</th>
              <th scope='col' className='px-4 py-3'>Ngày Check-out</th>
              <th scope='col' className='px-4 py-3'>Tổng giá</th>
              <th scope='col' className='px-4 py-3'>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {listRoomBookingGuest.map(item => (
              <tr key={item.propertyId} className='border-b dark:border-gray-700'>
                <td className='px-4 py-3'>{item.propertyId}</td>
                <td className='px-4 py-3'>{item.propertyName}</td>
                <td className='px-4 py-3'>{item.hostName}</td>
                <td className='px-4 py-3'>{item.hostPhoneNumber}</td>
                <td className='px-4 py-3'>{item.numberOfAdults}</td>
                <td className='px-4 py-3'>{item.numberOfChildren}</td>
                <td className='px-4 py-3'>{item.checkInDate}</td>
                <td className='px-4 py-3'>{item.checkOutDate}</td>
                <td className='px-4 py-3'>{item.totalPrice}</td>
                { item.status.toUpperCase()=="PENDING"?
                  <td scope="row" className="px-4 py-3 font-semibold text-blue-600 whitespace-nowrap dark:text-white">{item.status}</td>:
                  <td scope="row" className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap dark:text-white">{item.status}</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBookingGuest