import Modal from "@mui/material/Modal";
import ChatListPanel from "../ChatListPanel/ChatListPanel";
import { Box } from "@mui/material";
import handleClickChatModal from "../../utils/handleClckChatModal";

export type ModalUsersType = {
  showModal: boolean;
};
function ModalUsers({ showModal }: ModalUsersType) {
  const centeredModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={centeredModalStyle}>
          <ChatListPanel handleOnClick={handleClickChatModal} />
        </Box>
      </Modal>
    </>
  );
}
export default ModalUsers;
