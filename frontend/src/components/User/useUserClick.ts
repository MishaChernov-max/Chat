import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getChatThunk } from "../../store/slices/usersSlice";
import { useNavigate } from "react-router-dom";

export const useUserClick = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { chatLoading, chatError } = useSelector(
    (state: RootState) => state.users
  );
  const handleClick = async (_id: string) => {
    console.log("user", user);
    const chat = await dispatch(
      getChatThunk({ Id: user?._id!, userId: _id })
    ).unwrap();
    navigate(`/chat/${chat._id}`);
  };
  return { chatLoading, chatError, handleClick };
};
