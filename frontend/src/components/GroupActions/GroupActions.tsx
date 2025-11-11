import Stack from "@mui/material/Stack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import type { Dispatch, SetStateAction } from "react";

export type GroupActionsType = {
  setSideBar: Dispatch<SetStateAction<boolean>>;
};
function GroupActions({ setSideBar }: GroupActionsType) {
  const handleGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSideBar(true);
  };
  return (
    <>
      <Stack direction="row">
        <IconButton
          sx={{ color: "white", "&:hover": { color: "#ffffff98" } }}
          onClick={handleGroupClick}
        >
          <PersonAddIcon />
        </IconButton>
      </Stack>
    </>
  );
}
export default GroupActions;
