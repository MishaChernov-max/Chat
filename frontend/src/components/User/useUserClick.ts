import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getChatThunk } from "../../store/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";

export const useUserClick = () => {
  const { setActiveUser } = useActions();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError } = useSelector((state: RootState) => state.users);
  const handleClick = async (_id: string) => {
    setActiveUser(_id);
    console.log("user", user);
    const chat = await dispatch(
      getChatThunk({ Id: user?._id!, userId: _id })
    ).unwrap();
    navigate(`/chat/${chat._id}`);
  };
  return { isLoading, isError, handleClick };
};
