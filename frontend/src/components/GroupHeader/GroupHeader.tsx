import Box from "@mui/material/Box";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import GroupActions from "../GroupActions/GroupActions";
import { useEffect, useState } from "react";
import MembersList from "../MembersList/MembersList";
import ModalUsers from "../ModalUsers/ModalUsers";
import useAddParticipiant from "../../hooks/useAddParticipiant";
import getOnlineMembers from "../../utils/getOnlineMembers";
import { getGroupById } from "../../store/slices/groupSlice";
import getTypingUsersName from "../../utils/getTypingUsersName";
import TypingUsers from "../TypingUsers/TypingUsers";
import type { groupType } from "../../api/groups";

export type GroupHeaderType = {
  id: string;
};

function GroupHeader({ id }: GroupHeaderType) {
  const { typingUsers } = useSelector((state: RootState) => state.group);
  const { onlineUsers } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [onlineParticipiants, setOnlineParticipiants] = useState<string[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  const [group, setGroup] = useState<groupType | null>(null);
  useEffect(() => {
    const loadGroup = async () => {
      try {
        const g = await dispatch(getGroupById(id)).unwrap();
        setGroup(g);
      } catch (error) {
        console.error("Ошибка загрузки группы", error);
      }
    };
    loadGroup();
  }, [id, dispatch]);

  useEffect(() => {
    const usersTypingNames = getTypingUsersName(
      typingUsers[id] || [],
      group?.participiants || []
    );
    setUsersTyping(usersTypingNames);
  }, [typingUsers, group, id]);

  useEffect(() => {
    if (group) {
      const onlineMembers = getOnlineMembers(
        onlineUsers,
        group?.participiants || []
      );
      setOnlineParticipiants(onlineMembers);
    }
  }, [onlineUsers, group]);

  useEffect(() => {
    const handleClick = () => setShowModal(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleGroupClick = () => {
    setSideBar(true);
  };

  return (
    <>
      <Box
        sx={{
          color: "white",
          background: "#1F1D1D",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "12px",
          paddingRight: "60px",
          marginBottom: "40px",
        }}
      >
        <ModalUsers
          handleOnClick={useAddParticipiant}
          showFilterTabs={false}
          showModal={showModal}
          isLink={false}
        />
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Button onClick={handleGroupClick}>
            <Avatar
              src={ProfilePhoto}
              alt="ProfilePhoto"
              sx={{ width: "80px", height: "80px" }}
            />
          </Button>
          <Stack direction="column" sx={{ alignItems: "flex-start" }}>
            <Typography variant="h5" component="h5">
              {group?.name || "Загрузка..."}
            </Typography>
            <Typography variant="h5" component="h5">
              {group?.participiants?.length || 0} участников,
              <span style={{ margin: "5px" }}>
                {onlineParticipiants.length}
              </span>
              в сети
              {usersTyping.length > 0 && (
                <TypingUsers typingUsers={usersTyping} />
              )}
            </Typography>
          </Stack>
        </Stack>
        <MembersList
          open={sideBar}
          toggleDrawer={setSideBar}
          participiants={group?.participiants || []}
          onlineMembers={onlineParticipiants}
        />
        <GroupActions setSideBar={setShowModal} />
      </Box>
    </>
  );
}

export default GroupHeader;
