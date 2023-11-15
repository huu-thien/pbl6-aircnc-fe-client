// import ListUserContact from "@/components/Chat/ListUserContact";
// import Message from "@/components/Chat/Message/Message";
import ConversationScreen from "@/components/Chat/ConversationScreen";
import SideBar from "@/components/Chat/SideBar";

const Chat = () => {
    return (
      <div className="flex gap-1">
        {/* <ListUserContact/> */}
        
        <SideBar/>
        <ConversationScreen/>
      </div>
    );
}

export default Chat