import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchSearchResults } from "../store/slices/searchSlice";

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats, isLoading, isError } = useSelector(
    (state: RootState) => state.searchSlice
  );
  const getSearch = (q: string) => {
    dispatch(fetchSearchResults(q));
  };
  return { chats, isLoading, isError, getSearch };
};
