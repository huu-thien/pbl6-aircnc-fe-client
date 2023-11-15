import { Avatar } from "@mui/material";


const avartarUrl = 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg';


const ConversationSelect = () => {
  return (
    <div className="flex items-center cursor-pointer p-2 break-all border-b-2 border-solid hover:bg-gray-300">
        <Avatar src ={avartarUrl} className="m-3"/>
        <span>quocdoan@gmail.com</span>
    </div>
  )
}

export default ConversationSelect