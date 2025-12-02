// import type { Dispatch, SetStateAction } from "react";
// import type { userType } from "../../api/users";
// import Drawer from "@mui/material/Drawer";
// import Chats from "../Chats/Chats";
// import { enrichUsersWithOnlineStatus } from "../ChatListPanel/enrichUsersWithOnlineStatus";
// import handleClickChat from "../../utils/handleClickChat";

// export type MembersListType = {
//   open: boolean;
//   toggleDrawer: Dispatch<SetStateAction<boolean>>;
//   participiants: userType[];
//   onlineMembers: string[];
// };
// function MembersList({
//   open,
//   toggleDrawer,
//   participiants,
//   onlineMembers,
// }: MembersListType) {
//   const members = enrichUsersWithOnlineStatus(participiants, onlineMembers);
//   const drawerStyle = {
//     "& .MuiDrawer-paper": {
//       background: "#312F2F",
//     },
//   };
//   return (
//     <>
//       <Drawer
//         sx={drawerStyle}
//         open={open}
//         onClose={() => {
//           toggleDrawer(false);
//         }}
//         anchor="right"
//       >
//         <Chats chats={members} handleOnClick={handleClickChat} />
//       </Drawer>
//     </>
//   );
// }
// export default MembersList;
