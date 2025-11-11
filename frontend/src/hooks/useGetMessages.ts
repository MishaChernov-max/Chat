// import { useEffect } from "react";
// import { useSocket } from "../context/SocketContext";
// import useActions from "./useActions";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store";

// const useGetMessage = () => {
//   const { updateChatCache } = useActions();
//   const { chatCache } = useSelector((state: RootState) => state.users);
//   const { getMessages, undoLoading } = useActions();
//   const { roomId, messages } = useSelector(
//     (state: RootState) => state.messageSlice
//   );
//   const socket = useSocket();
//   return messages;
// };
// export default useGetMessage;
