import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import GroupForm from "../GroupForm/GroupForm";
import { Stack } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
export type ModalGroupsType = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
function GroupModals({ showModal, setShowModal }: ModalGroupsType) {
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#312F2F",
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Stack direction="column">
            <GroupForm showModal={showModal} setShowModal={setShowModal} />
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
export default GroupModals;
