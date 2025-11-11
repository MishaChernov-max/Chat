import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import GroupModals from "../GroupModals/GroupModals";
import Groups from "../Groups/Groups";
import useGroups from "../../hooks/useGroups";
import StatusWrapper from "../StatusWrapper/StatusWrapper";

function GroupList() {
  const color = grey[50];
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleAddGroupClick = () => {
    setShowModal(true);
  };
  const { isGroupsLoading, isGroupsError, groups } = useGroups();
  return (
    <>
      {showModal && (
        <GroupModals showModal={showModal} setShowModal={setShowModal} />
      )}
      <Box sx={{ width: "100%", margin: "0 auto", mt: 2 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h4" component="h4">
            Groups
          </Typography>

          <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
            <IconButton
              aria-label="create"
              onClick={() => {
                handleAddGroupClick();
              }}
            >
              <AddCircleOutlineIcon fontSize="large" htmlColor={color} />
            </IconButton>
            <Typography variant="h4" component="h4">
              New Group
            </Typography>
          </Stack>
        </Stack>
        <StatusWrapper isError={isGroupsError} isLoading={isGroupsLoading}>
          {!groups?.length && <span>Групп нет....</span>}
          <Groups groups={groups} />
        </StatusWrapper>
      </Box>
    </>
  );
}
export default GroupList;
