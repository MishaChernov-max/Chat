import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, IconButton, Input, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { ModalGroupsType } from "../GroupModals/GroupModals";
import useCreateGroup from "../../hooks/useCreateGroup";

function GroupForm({ showModal, setShowModal }: ModalGroupsType) {
  const { handleCreateGroupClick } = useCreateGroup();
  const [value, setValue] = useState<string>("");
  return (
    <>
      <form
        onSubmit={() => {
          if (value.trim()) {
            handleCreateGroupClick(value);
            setShowModal(false);
          }
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: "40px" }}>
          <IconButton>
            <AddAPhotoIcon sx={{ width: "100px", height: "100px" }} />
          </IconButton>
          <Stack>
            <Typography component="h4" variant="h4" sx={{ color: "#FFFFFF" }}>
              Название группы
            </Typography>
            <Input
              value={value}
              sx={{ width: "100%", color: "#FFFFFF", mt: 3 }}
              placeholder="Название группы"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              if (showModal) {
                setShowModal(false);
              }
            }}
            sx={{ marginTop: 6 }}
          >
            Отмена
          </Button>
          <Button type="submit" sx={{ marginTop: 6 }}>
            Сохранить
          </Button>
        </Stack>
      </form>
    </>
  );
}
export default GroupForm;
