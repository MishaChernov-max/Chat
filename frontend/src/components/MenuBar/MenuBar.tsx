import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import logo from "../../assets/logo.svg";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";
import save from "../../assets/save.svg";
import share from "../../assets/share.svg";
import settings from "../../assets/setting.svg";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import MaterialUISwitch from "../MaterialUISwitch/MaterialUISwitch";
import { useThemeMode } from "../../context/ThemeContext";
import { clearLocalStorage } from "../../libs/localStorageApi";
import type { SxProps } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type MenuBarPropsType = {
  sx?: SxProps;
};

function MenuBar({ sx }: MenuBarPropsType) {
  const [open, setOpen] = useState<boolean>(false);

  const profilePhoto = useSelector(
    (state: RootState) => state.auth.user?.avatar
  );

  const { isDark, setIsDark } = useThemeMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        maxWidth: "100px",
        backgroundColor: "#1F1D1D",
        marginRight: "4px",
        ...sx,
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
            aria-label="Поиск"
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
              alt="Поиск"
              sx={{ width: 40, height: 40 }}
            />
            Search
          </IconButton>
          <IconButton
            href="/"
            component="a"
            aria-label="Сохранить"
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
              alt="Сохранить"
              sx={{ width: 40, height: 40 }}
            />
            Save
          </IconButton>
          <IconButton
            onClick={() => {
              clearLocalStorage("accessToken");
              window.location.href = "/loginPage";
            }}
            aria-label="Выйти"
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
              alt="Выйти"
              sx={{ width: 40, height: 40 }}
            />
            Log out
          </IconButton>
          <IconButton
            href="/"
            component="a"
            aria-label="Настройки"
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
              alt="Настройки"
              sx={{ width: 40, height: 40 }}
            />
            Setting
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ transform: "rotate(90deg)", mb: 6 }}>
          <MaterialUISwitch
            checked={isDark}
            onChange={(e, checked) => setIsDark(checked)}
          />
        </Box>
        <EditProfileModal open={open} onClose={() => setOpen(false)} />
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Avatar
            src={profilePhoto}
            alt="Логотип сайта"
            sx={{
              width: 60,
              height: 60,
              mb: 8,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MenuBar;
