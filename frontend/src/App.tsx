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

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   setNavigateRef(navigate);
  // }, [navigate]);
  return (
    <>
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
            <Route path={"/user/:id/:type"} element={<ChatWindow />} />
          </Route>
          <Route path={"/loginPage"} element={<LoginPage />}>
            <Route index element={<AuthForm />} />
            <Route path={"signUp"} element={<SignUpForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
