export interface PropsContact {
  id: number;
  fullName: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
}
export interface PropsMessage {
  id: number;
  senderId: number;
  receiverId: number;
  senderName: string;
  senderAvatarUrl: string;
  content: string;
  messageTime: string;
}
