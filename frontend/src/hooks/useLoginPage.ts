import { useDispatch, useSelector } from "react-redux";
import type { registerUserType } from "../api/users";
import type { AppDispatch, RootState } from "../store";
import { loginUserThunk, registerUserr } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError } = useSelector((state: RootState) => state.auth);
  const register = async (userData: registerUserType) => {
    await dispatch(registerUserr(userData)).unwrap();
    navigate("/");
  };
  const login = async (userData: registerUserType) => {
    await dispatch(loginUserThunk(userData)).unwrap();
    navigate("/");
  };
  return { isLoading, isError, register, login };
};
export default useLoginPage;
