import { Avatar, Box, Typography } from "@mui/material";
import type { userType } from "../../api/users";
import { currentUser } from "../../store/slices/usersSlice";

export type UserTPropsType = {
  user: userType;
  handleOnClick?: Function;
};

function User({ user, handleOnClick }: UserTPropsType) {
  const activeUser = currentUser();
  const { _id, firstName, surName, avatar } = user;
  console.log();
  const name = `${firstName} ${surName}`;
  const { handleClick } = handleOnClick
    ? handleOnClick()
    : { handleClick: () => {} };
  return (
    <Box
      onClick={() => {
        handleClick(_id);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
          width: "400px",
          borderRadius: "10px",
          paddingRight: "19px",
          paddingLeft: "14px",
          paddingTop: "9px",
          paddingBottom: "12px",
          bgcolor: (theme) =>
            activeUser === _id
              ? theme.palette.mode === "dark"
                ? "#7A5AF8"
                : "#14532d"
              : theme.palette.mode === "dark"
              ? "#3b3a3aff"
              : "#3b3a3aff",
          marginTop: "20px",
          cursor: "pointer",
          color: (theme) =>
            activeUser === _id
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          transition: "background-color 0.2s",
        }}
      >
        <Avatar
          src={avatar}
          alt="Фото Профиля"
          sx={{ width: "80px", height: "80px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#FFFFFF" }}>
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default User;
