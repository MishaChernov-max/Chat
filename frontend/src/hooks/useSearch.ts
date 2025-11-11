import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchSearchResults } from "../store/slices/fetchUsersSlice";

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats, isSearchLoading, isSearchError } = useSelector(
    (state: RootState) => state.users
  );
  const getSearch = (q: string) => {
    dispatch(fetchSearchResults(q));
  };
  return { chats, isSearchLoading, isSearchError, getSearch };
};
