import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, type Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import useActions from "../hooks/useActions";
import { clearLocalStorage, getLocalStorage } from "../libs/localStorageApi";
import { Slide, Snackbar } from "@mui/material";
import type { ChatType } from "../store/slices/chatsSlice";
import type { userType } from "../api/users";

type SocketContextProviderType = {
  children: ReactNode;
};

type ReceivedMessage = {
  _id: string;
  chat: ChatType;
  sender: userType;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

type NotificationData = {
  roomId: string;
  text: string;
  from: string;
};

export const SocketContext = createContext<Socket | null>(null);

// const serverPort = VITE_SERVER_PORT.env ||

export const SocketProvider = ({ children }: SocketContextProviderType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentNotification] = useState<NotificationData | null>();
  const {
    getOnlineUsers,
    getDisconnectUser,
    getOnlineUser,
    updateChatMessagesCache,
  } = useActions();

  const { activeChat: chat } = useSelector((state: RootState) => state.chats);

  const token = getLocalStorage("accessToken");

  const serverPort =
    import.meta.env.VITE_SERVER_PORT || "http://localhost:5000";
  useEffect(() => {
    if (!user?._id || !token) return;
    const newSocket = io(serverPort, {
      auth: {
        userId: user?._id,
        token: token,
      },
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);
    newSocket.on("token-error", (data) => {
      if (data.invalidToken === token) {
        clearLocalStorage("accessToken");
        window.location.href = "/loginPage";
      }
    });
    newSocket.on("get-users-online", (onlineUsers) =>
      getOnlineUsers(onlineUsers)
    );
    newSocket.on("new-user-online", (user) => {
      getOnlineUser(user);
    });

    newSocket.on("disconnect-user", (userId) => {
      getDisconnectUser(userId);
    });
    newSocket.on("connect_error", () => newSocket.disconnect());

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id, token]);
  useEffect(() => {
    const handleNewMessage = (message: ReceivedMessage) => {
      updateChatMessagesCache(message);
    };
    socket?.on("new-message", handleNewMessage);
    return () => {
      socket?.off("new-message", handleNewMessage);
    };
  }, [socket, chat?._id]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
      <Slide in={open} direction="down">
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={4500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          message={`${currentNotification?.from}:${currentNotification?.text}`}
        />
      </Slide>
    </SocketContext.Provider>
  );
};
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
