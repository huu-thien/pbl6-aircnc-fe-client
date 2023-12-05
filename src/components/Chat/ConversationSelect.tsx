
import { PropsContact } from "@/@types/chat";
import { Avatar } from "@mui/material";
// import { useRouter } from 'next/router';
// import { useNavigate } from 'react-router-dom';

interface ConversationSelectProps extends PropsContact {
  onSelectUser: () => void;
}

const ConversationSelect: React.FC<ConversationSelectProps> = ({id,fullName,avatarUrl,lastMessage,lastMessageTime,onSelectUser}) => {
  // const navigate = useNavigate();

	// const onSelectConversation = () => {
	// 	navigate(`conversations/${id}`)
	// }
  console.log(id);
  return (
    <div className="flex items-center cursor-pointer p-2 break-all border-b-2 border-solid hover:bg-gray-300" onClick={onSelectUser}>
      <Avatar src ={avatarUrl} className="m-3"/>
      <div className="grid grid-cols-1">
        <span className="font-medium">{fullName}</span>
        <div className="inline-flex gap-5 font-light ">
          <span className="overflow-hidden max-w-[100px] whitespace-nowrap text-ellipsis">{lastMessage}</span>
          <span className="">{lastMessageTime}</span>
        </div>
      </div>
    </div>
  )
}
// const avatarUrl='https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
// const fullName='Doan Quoc'
// const lastMessage='Dep cai nao do em oi anh thuong em nhieu lam'
// const lastMessageTime='20:11'
// const ConversationSelect = () => {
//   return (
//     <div className="flex items-center cursor-pointer p-2 break-all border-b-2 border-solid hover:bg-gray-300">
//       <Avatar src ={avatarUrl} className="m-3"/>
//       <div className="grid grid-cols-1">
//         <span className="font-medium">{fullName}</span>
//         <div className="inline-flex gap-5 font-light">
//           <span className="overflow-hidden max-w-[160px] whitespace-nowrap text-ellipsis">{lastMessage}</span>
//           <span>{lastMessageTime}</span>
//         </div>
//       </div>
//     </div>
//   )
// }


export default ConversationSelect