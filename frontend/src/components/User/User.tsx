import { Avatar, Box, Typography } from "@mui/material";
import type { userType } from "../../api/users";

export type UserTPropsType = {
  user: userType;
  handleOnClick?: Function;
};

function User({ user, handleOnClick }: UserTPropsType) {
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
          bgcolor: "#312F2F",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {/* <Badge
          badgeContent={}
          color="info"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "12px",
              height: "20px",
              minWidth: "20px",
              transform: "translate(-50px)",
            },
          }}
        >
          <Avatar
            src={avatar}
            alt="Фото Профиля"
            sx={{ width: "80px", height: "80px" }}
          />
          2131
        </Badge> */}

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
          {/* <Typography variant="h6" component="h6">
            {isTyping ? <span>Печатает....</span> : firstName}
          </Typography> */}
          <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            {name}
          </Typography>
          {/* <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            w1q
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}
export default User;
