import { Outlet } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  return (
    <>
      <div className="loginPage">
        <Outlet />
      </div>
    </>
  );
}
export default LoginPage;
