import type { userType } from "../api/users";

const getOnlineMembers = (onlineUsers: string[], participiants: userType[]) => {
  return participiants
    .filter((u) => onlineUsers.includes(u._id))
    .map((u) => u._id);
};
export default getOnlineMembers;
