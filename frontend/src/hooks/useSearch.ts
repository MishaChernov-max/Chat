import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchSearchResults } from "../store/slices/usersSlice";

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats, isLoading, isError } = useSelector(
    (state: RootState) => state.users
  );
  const getSearch = (q: string) => {
    console.log("Выполянется поиск со значением", q);
    dispatch(fetchSearchResults(q));
  };
  return { chats, isLoading, isError, getSearch };
};
