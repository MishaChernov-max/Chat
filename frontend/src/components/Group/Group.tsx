// import { Box } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import type { groupType } from "../../api/groups";
// import { Link } from "react-router-dom";

// function Group({ _id, name, photo }: groupType) {
//   const type = "group";
//   const { handleGroupClick } = useGroupClick(_id);
//   return (
//     <>
//       <Link to={`/user/${_id}/${type}`}>
//         <Box onClick={handleGroupClick}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: "20px",
//               width: "400px",
//               borderRadius: "10px",
//               paddingRight: "19px",
//               paddingLeft: "14px",
//               paddingTop: "9px",
//               paddingBottom: "12px",
//               bgcolor: "#312F2F",
//               marginTop: "20px",
//               cursor: "pointer",
//             }}
//           >
//             <Avatar
//               src={photo}
//               alt="Фото Профиля"
//               sx={{
//                 width: "80px",
//                 height: "80px",
//               }}
//             />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//               }}
//             >
//               <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
//                 {name}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Link>
//     </>
//   );
// }
// export default Group;
