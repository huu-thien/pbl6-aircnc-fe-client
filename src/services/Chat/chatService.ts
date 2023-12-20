import http from '@/utils/http';

const controller = new AbortController();
export const getContacts = () => {
  return http.get(`api/chat/contacts`, { signal: controller.signal });
};
export const getMessagesByUserId = (id:number) => {
  return http.get(`api/chat/messages/${id}`, { signal: controller.signal });
};
export const connectionChat = ()=>{
  return http.get(`chathub`,{signal: controller.signal})
}