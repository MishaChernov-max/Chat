import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import logo from "../../assets/logo.svg";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import home from "../../assets/home.svg";
import NightMood from "../../assets/Night-Mood.svg";
import search from "../../assets/search.svg";
import save from "../../assets/save.svg";
import share from "../../assets/share.svg";
import settings from "../../assets/setting.svg";
import IconButton from "@mui/material/IconButton";
import type { SxProps } from "@mui/material";
import { clearLocalStorage } from "../../libs/localStorageApi";

type MenuBarPropsType = {
  sx?: SxProps;
};
function MenuBar({ sx }: MenuBarPropsType) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        maxWidth: "1024px",
        backgroundColor: "#1F1D1D",
        marginRight: "4px",
        ...{ sx },
      }}
    >
      <Box
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={logo}
          alt="Логотип сайта"
          sx={{
            width: 60,
            height: 60,
            mb: 8,
          }}
        />
        <Box
          component="nav"
          sx={{
            maxWidth: "365px",
            fontWeight: "400",
          }}
        >
          <IconButton
            href="/"
            component="a"
            aria-label="Перейти на главную"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontWeight: "400",
              "&:hover": {
                color: "#48736f",
              },
            }}
          >
            <Box
              component="img"
              src={home}
              alt="Логотип"
              sx={{ width: 40, height: 40 }}
            />
            Home
          </IconButton>
          <IconButton
            href="/"
            component="a"
            aria-label="Перейти на главную"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontWeight: "400",
              "&:hover": {
                color: "#48736f",
              },
            }}
          >
            <Box
              component="img"
              src={search}
              alt="Логотип"
              sx={{ display: "flex", flexDirection: "column", color: "white" }}
            />
            Search
          </IconButton>
          <IconButton
            href="/"
            component="a"
            aria-label="Перейти на главную"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontWeight: "400",
              "&:hover": {
                color: "#48736f",
              },
            }}
          >
            <Box
              component="img"
              src={save}
              alt="Логотип"
              sx={{ display: "flex", flexDirection: "column", color: "white" }}
            />
            Save
          </IconButton>
          <IconButton
            onClick={() => {
              clearLocalStorage("accessToken");
              window.location.href = "/loginPage";
            }}
            href="/"
            component="a"
            aria-label="Перейти на главную"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontWeight: "400",
              "&:hover": {
                color: "#48736f",
              },
            }}
          >
            <Box
              component="img"
              src={share}
              alt="Логотип"
              sx={{ display: "flex", flexDirection: "column" }}
            />
            Log out
          </IconButton>
          <IconButton
            href="/"
            component="a"
            aria-label="Перейти на главную"
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontWeight: "400",
              "&:hover": {
                color: "#48736f",
              },
            }}
          >
            <Box
              component="img"
              src={settings}
              alt="Логотип"
              sx={{ display: "flex", flexDirection: "column" }}
            />
            Setting
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Avatar
          src={NightMood}
          alt="Логотип сайта"
          sx={{
            width: 60,
            height: 60,
            mb: 8,
          }}
        />
        <Avatar
          src={ProfilePhoto}
          alt="Логотип сайта"
          sx={{
            width: 60,
            height: 60,
            mb: 8,
          }}
        />
      </Box>
    </Box>
  );
}
export default MenuBar;
