import { Box } from "@mui/material";
import type { userType } from "../../api/users";
import User from "../User/User";

export type UsersType = {
  users: userType[];
  handleOnClick: (...args: any[]) => any;
};
function Users({ users, handleOnClick }: UsersType) {
  return (
    <Box>
      {users.map((u) => (
        <User user={u} handleOnClick={handleOnClick} key={u._id} />
      ))}
    </Box>
  );
}
export default Users;
