import { Avatar } from "@material-ui/core"
import Message from "./Message/Message"

import { PropsContact } from "@/@types/chat";
interface ConversationScreenProps {
  selectedUser: PropsContact | null;
}
const ConversationScreen: React.FC<ConversationScreenProps> = ({ selectedUser })=> {
  // const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="grid grid-cols-1 h-full w-full">
        <div className="sticky top-0 bg-gray-200 z-50 flex items-center p-3 h-20 border-b border-whitesmoke w-full">
            <Avatar src={selectedUser?.avatarUrl}/>
            <div className="ml-4 flex-grow" >
                <h3 className="mb-1">{selectedUser?.fullName}</h3>
            </div>
        </div>
        {selectedUser && <Message selectedUser={selectedUser} />}
        {/* {selectedUser && <TextInput selectedUser={selectedUser} />} */}
    </div>
  )
}

export default ConversationScreen
