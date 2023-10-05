import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
const numberOfHostReviews = 20;
const introduceOfHost = 'Chúng tôi đã từng làm việc tại Marriott International trong nhiều năm và thích đi du lịch. Căn hộ EM Đà Nẵng là đứa con đầu lòng của chúng tôi để tận dụng tối đa trải nghiệm cho thời gian lưu trú của bạn và làm cho bạn cảm thấy như ở nhà với mức sống cao.';
const IntroduceHost = () => {
  return (
    <div className='-mb-10'>
      <div className='flex justify-between mb-2'> 
        <Avatar 
          alt="Travis Howard" 
          src="https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png" 
          sx={{width:70, height:70}}
        />
        <Button variant="contained" style={{width:186,fontSize:13}}>Liên hệ với chủ nhà</Button>
      </div>
      <div className='flex justify-between mt-5 '>
        <p style={{fontSize:'18px', fontWeight:500}}>Chủ nhà NHS</p>
        <Button variant="text" style={{color:'black'}}><StarIcon/>{numberOfHostReviews} Đánh giá</Button>
      </div>
      <i style={{marginRight:'auto',marginLeft:'auto'}}>{introduceOfHost}</i>
    </div>
      
  )
}

export default IntroduceHost