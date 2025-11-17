import StatusWrapper from "../StatusWrapper/StatusWrapper";
import Users from "../Users/Users";
import { useFetchUsers } from "./useFetchUsers";

export type UserListType = {
  handleOnClick: (...args: any[]) => any;
};

function UserList({ handleOnClick }: UserListType) {
  const { isLoading, isError, users } = useFetchUsers();
  return (
    <>
      <StatusWrapper isLoading={isLoading} isError={isError}>
        <Users users={users} handleOnClick={handleOnClick} />
      </StatusWrapper>
    </>
  );
}
export default UserList;
