import { useEffect } from "react";
import { io } from "socket.io-client";
import useActions from "./useActions";
const useSocketConnection = () => {
  const { setConnection } = useActions();
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      setConnection(true);
    });
    socket.on("disconnect", () => {
      setConnection(false);
    });
    socket.on("connect_error", () => setConnection(false));

    return () => {
      socket.disconnect();
    };
  }, [setConnection]);
};
export default useSocketConnection;
