import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const useGetNotifications = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const getNotifications = (id: string) => {
    return notifications.users.find((n) => n.userId === id)?.quantity;
  };
  return { getNotifications };
};
