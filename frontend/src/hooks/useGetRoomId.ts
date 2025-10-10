export const GetRoomId = (friendId: string, currentId: string) => {
  return [friendId, currentId].sort().join("_");
};
