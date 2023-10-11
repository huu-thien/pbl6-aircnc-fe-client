import { Box, Divider } from "@mui/material"
const informationHost = {
    src:'https://astral.vn/wp-content/uploads/2023/05/anh-gai-xinh-lo-clip-169.jpg',
    alt:'image of host',
    name:'Ngọc',
    numberOfReivews:'7',
    joiningDate:'02/02/2022'
}
const ProfileHost = () => {
  return (
    <Box
      sx={{
        minWidth: 300,
        height: 300,
        backgroundColor: '#F8F8FF',
        borderRadius: 3,
        boxShadow: 13,
      }}
    >
      <div className='grid grid-cols-2 m-2 gap-5'>
        <div className=''>
          <img
            src={informationHost.src}
            alt={informationHost.alt}
            style={{ width: '150px', height: '150px' , margin:'5px',borderRadius:'50%'}}
          />
          <p className='ml-10 text-2xl'>{informationHost.name}</p>
        </div>
        <div className='grid grid-cols-1'>

          <p className='text-2xl'>{informationHost.numberOfReivews}</p>
          <p className='font-thin -mt-3'>Đánh giá</p>
          <Divider/>
          <p className='text-2xl'>{informationHost.joiningDate}</p>
          <p className='font-thin -mt-3'>Bắt đầu tham gia</p>
        </div>
      </div>
    </Box>
  )
}

export default ProfileHost