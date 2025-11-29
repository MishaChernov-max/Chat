import { Box } from "@mui/material";
import type { userType } from "../../api/users";
import User from "../User/User";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export type UsersType = {
  users: userType[];
  handleOnClick: (...args: any[]) => any;
};
function Users({ users, handleOnClick }: UsersType) {
  const foundUsers = useSelector((state: RootState) => state.users.chats);
  return (
    <Box>
      {foundUsers.length > 0
        ? foundUsers.map((u) => (
            <User user={u} handleOnClick={handleOnClick} key={u._id} />
          ))
        : users.map((u) => (
            <User user={u} handleOnClick={handleOnClick} key={u._id} />
          ))}
    </Box>
  );
}
export default Users;
