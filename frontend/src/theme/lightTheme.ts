import { createTheme } from "@mui/material/styles";
import b from "../assets/background.svg";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // синий
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff9800", // оранжевый
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5", // светлый фон страницы
      paper: "#fff", // белый фон карточек и диалогов
    },
    text: {
      primary: "#212121", // основной цвет текста
      secondary: "#757575", // дополнительный цвет
    },
  },
  custom: {
    backgroundImage: `url("${b}")`,
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14,
    button: {
      fontWeight: 700,
    },
  },
});
