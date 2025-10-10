import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { RootState } from "./store";
import { useSelector } from "react-redux";
import EmptyChat from "./components/EmptyChat/EmptyChat";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthForm from "./components/AuthForm/AuthForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import UserDataForm from "./components/UserDataForm/UserDataForm";

function App() {
  const { isConnected } = useSelector(
    (state: RootState) => state.websocketConnection
  );
  console.log("Текущее состояние подключения к серверу", isConnected);
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<HomePage />}>
            <Route index element={<EmptyChat />} />
            <Route path={"/user/:id"} element={<ChatWindow />} />
          </Route>
          <Route path={"/loginPage"} element={<LoginPage />}>
            <Route index element={<AuthForm />} />
            <Route path={"userDataForm"} element={<UserDataForm />} />
            <Route path={"signUp"} element={<SignUpForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
