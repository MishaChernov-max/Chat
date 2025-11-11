import type { userType } from "../api/users";

const getTypingUsersName = (
  typingUsers: string[],
  participiants: userType[]
) => {
  return participiants
    .filter((u) => typingUsers.includes(u._id) && u.firstName)
    .map((u) => u.firstName!);
};
export default getTypingUsersName;
