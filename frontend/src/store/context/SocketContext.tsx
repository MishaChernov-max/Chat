import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import type { RootState } from "..";

type SocketContextProviderType = {
  children: ReactNode;
};

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketContextProviderType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { setConnection, getOnlineUsers, getDisconnectUser, getOnlineUser } =
    useActions();
  useEffect(() => {
    if (!user?._id) return;
    const newSocket = io("http://localhost:5000", {
      auth: {
        userId: user?._id,
      },
    });
    setSocket(newSocket);
    newSocket.on("get-users-online", (onlineUsers) =>
      getOnlineUsers(onlineUsers)
    );
    newSocket.on("new-user-online", (user) => {
      getOnlineUser(user);
    });
    newSocket.on("connect", () => {
      setConnection(true);
    });
    newSocket.on("disconnect", () => {
      setConnection(false);
    });
    newSocket.on("disconnect-user", (userId) => {
      getDisconnectUser(userId);
    });
    newSocket.on("connect_error", () => newSocket.disconnect());

    return () => {
      newSocket.disconnect();
    };
  }, [setConnection, user?._id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
