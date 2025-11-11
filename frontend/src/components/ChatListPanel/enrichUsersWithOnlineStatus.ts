import type { userType } from "../../api/users";

export const enrichUsersWithOnlineStatus = (
  allUsers: userType[],
  onlineUsers: string[]
) => {
  return allUsers.map((u) => {
    const user = onlineUsers.includes(u._id);
    if (user) {
      u = {
        ...u,
        isOnline: true,
      };
    }
    return u;
  });
};
