import { Avatar } from "@material-ui/core"
import Message from "./Message/Message"

const avartarUrl = 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
const ConversationScreen = () => {
  return (
    <div className="grid grid-cols-1 h-full w-full ">
        <div className="sticky top-0 bg-gray-200 z-50 flex items-center p-3 h-20 border-b border-whitesmoke w-full">
            <Avatar src={avartarUrl}/>
            <div className="ml-4 flex-grow" >
                <h3 className="mb-1">quocdoan10b3@gmail.com</h3>
            </div>
        </div>
        <Message/>
    </div>
  )
}

export default ConversationScreen
