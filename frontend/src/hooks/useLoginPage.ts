import { useDispatch, useSelector } from "react-redux";
import type { registerUserType } from "../api/users";
import type { AppDispatch, RootState } from "../store";
import { registerUserr } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/loginPage/userDataForm");
    }
  }, [isAuthenticated, navigate]);
  const register = (userData: registerUserType) => {
    dispatch(registerUserr(userData));
  };
  return { isLoading, isError, register, isAuthenticated };
};
export default useLoginPage;
