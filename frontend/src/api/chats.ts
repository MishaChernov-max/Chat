import instance from "./instance";

export async function getChats(userId: string) {
  console.log("userId", userId);
  return await instance.get(`/chats/${userId}`);
}

export async function getChat(currentUserId: string, friendUserId: string) {
  return await instance.post("/chat", {
    currentUserId: currentUserId,
    friendUserId: friendUserId,
  });
}

export async function getChatById(chatId: string) {
  return await instance.get(`/chat/${chatId}`);
}
