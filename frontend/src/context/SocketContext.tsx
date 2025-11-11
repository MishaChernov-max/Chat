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

type SocketContextProviderType = {
  children: ReactNode;
};

type NotificationData = {
  roomId: string;
  text: string;
  from: string;
};

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketContextProviderType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>();
  const {
    getOnlineUsers,
    getDisconnectUser,
    getOnlineUser,
    updateChatCache,
    updateChatCacheByGroupId,
    undoLoading,
    getMessages,
  } = useActions();

  const { roomId } = useSelector((state: RootState) => state.messageSlice);

  useEffect(() => {
    const token = getLocalStorage("accessToken");
    if (!user?._id || !token) return;
    const newSocket = io("http://localhost:5000", {
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
  }, [user?._id]);
  useEffect(() => {
    const handleNotification = (data: NotificationData) => {
      if (data.roomId !== roomId) {
        setCurrentNotification(data);
        setOpen(true);
      }
    };
    const handleUnreadUpdate = (data: {
      roomId: string;
      unread_count: number;
    }) => {
      if (roomId !== data.roomId) {
        updateChatCache({
          index: data.roomId,
          unreadCount: data.unread_count,
          action: "UPDATE_UNREAD_COUNT",
        });
      } else {
        fetch("http://localhost:5000/api/mark-as-read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: roomId,
            userId: user?._id,
          }),
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Error status: ${res.status}`);
          }
        });
      }
    };
    const handleNewMessage = (chat: any) => {
      updateChatCache({
        index: chat.roomId,
        messages: chat.messages,
        action: "ADD_MESSAGE",
      });
      if (roomId === chat.roomId) {
        undoLoading();
        getMessages(chat.messages);
      }
    };
    const handleNewGroupMessage = (chat: any) => {
      updateChatCacheByGroupId({
        index: chat.roomId,
        messages: chat.messages,
      });
      if (roomId === chat.roomId) {
        undoLoading();
        getMessages(chat.messages);
      }
    };
    socket?.on("new-message-group", handleNewGroupMessage);
    socket?.on("notification", handleNotification);
    socket?.on("unread_update", handleUnreadUpdate);
    socket?.on("new-message", handleNewMessage);
    return () => {
      socket?.off("notification", handleNotification);
      socket?.off("unread_update", handleUnreadUpdate);
      socket?.off("new-message", handleNewMessage);
      socket?.off("new-message-group", handleNewGroupMessage);
    };
  }, [socket, roomId]);
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
