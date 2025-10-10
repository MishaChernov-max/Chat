import type { userType } from "../../api/users";

export const enrichUsersWithOnlineStatus = (
  allUsers: userType[],
  onlineUsers: string[]
) => {
  console.log("users", allUsers, "onlineUsers", onlineUsers);
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
