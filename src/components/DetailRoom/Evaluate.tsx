import { Avatar } from "@mui/material"
const evaluate = [
{
  alt:"DoanQuoc",
  src:'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  content: 'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!'
},
{
  alt:"NguyenHuuThien",
  src:"https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
  content: 'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!'
},
{
  alt:"DoanQuoc",
  src:'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  content: 'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!'
},
{
  alt:"NguyenHuuThien",
  src:'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  content: 'Chúng tôi thực sự tận hưởng thời gian lưu trú của mình tại Đà Nẵng! Quang cảnh từ căn phòng thật tuyệt vời. Cảm ơn phản ứng của bạn!'
}
]
const Evaluate = () => {
  return (
    <div >
      <h2 style={{fontSize:'18px',marginBottom:10} }>Đánh giá</h2>
      <div className="grid grid-cols-2 gap-5 mr-64">
        {evaluate.map((prop,propIndex) =>(
          <div key={propIndex}>
            <div className="flex gap-4">
              <Avatar alt={prop.alt} src={prop.src} />
              <p style={{ marginTop: 7 }}>{prop.alt}</p>
            </div>
            <p>{prop.content}</p>
          </div>
          ))}
        
      </div>
    </div>
  )
}

export default Evaluate