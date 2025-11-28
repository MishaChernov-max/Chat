import { createTheme } from "@mui/material";
import b from "../assets/nebula.jpg";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9", contrastText: "#212121" },
    secondary: { main: "#f48fb1", contrastText: "#212121" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: "#b0b0b0",
    },
  },
  custom: {
    backgroundImage: `url("${b}")`,
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14,
    button: { fontWeight: 700 },
  },
});
