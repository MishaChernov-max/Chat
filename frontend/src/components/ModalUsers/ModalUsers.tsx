import Modal from "@mui/material/Modal";
import ChatListPanel from "../ChatListPanel/ChatListPanel";
import { Box } from "@mui/material";

export type ModalUsersType = {
  showModal: boolean;
  showFilterTabs: boolean;
  handleOnClick?: (...args: any[]) => any;
  isLink?: boolean;
};
function ModalUsers({
  showModal,
  showFilterTabs,
  handleOnClick,
  isLink,
}: ModalUsersType) {
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
          <ChatListPanel
            showFilterTabs={showFilterTabs}
            handleOnClick={handleOnClick}
            isLink={isLink}
          />
        </Box>
      </Modal>
    </>
  );
}
export default ModalUsers;
