// App.tsx
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmptyChat from "./components/EmptyChat/EmptyChat";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthForm from "./components/AuthForm/AuthForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { ThemeProviderCustom, useThemeMode } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/darkTheme";
import { lightTheme } from "./theme/lightTheme";
import { useMemo } from "react";

function AppContent() {
  const { isDark } = useThemeMode();
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmptyChat />} />
            <Route path={"/chat/:id"} element={<ChatWindow />} />
          </Route>
          <Route path={"/loginPage"} element={<LoginPage />}>
            <Route index element={<AuthForm />} />
            <Route path={"signUp"} element={<SignUpForm />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  );
}

export default App;
