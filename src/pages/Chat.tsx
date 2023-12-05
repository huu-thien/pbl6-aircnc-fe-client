
import ConversationScreen from "@/components/Chat/ConversationScreen";
import SideBar from "@/components/Chat/SideBar";
import { useState } from "react";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user:never) => {
    setSelectedUser(user);
  };
    return (
      <div className="flex gap-1 mt-2">
        {/* <ListUserContact/> */}
        
        <SideBar onSelectUser={handleSelectUser}/>
        <ConversationScreen selectedUser={selectedUser}/>
      </div>
    );
}

export default Chat
