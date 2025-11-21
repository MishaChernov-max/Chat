import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import ModalWrap from "../ModalWrap/ModalWrap";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import useLoginPage from "../../hooks/useLoginPage";
import useActions from "../../hooks/useActions";
import { CircularProgress, Divider } from "@mui/material";
import googleIcon from "../../assets/google.svg";
export type LoginFormData = {
  email: string;
  password: string;
};
function SignUpForm() {
  const { clearError } = useActions();
  const { isLoading, isError, login } = useLoginPage();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
    reset();
  };

  useEffect(() => {
    if (isError) {
      setFormError("root", {
        type: "manual",
        message: isError,
      });

      const timer = setTimeout(() => {
        clearError();
        clearErrors("root");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError, setFormError, clearError, clearErrors]);

  return (
    <>
      <ModalWrap>
        <Typography variant="h4" component="h4" sx={{ marginBottom: "40px" }}>
          <Box>
            <Button
              component={Link}
              to="/loginPage"
              sx={{ color: "white", "&:hover": { color: "#dddbdbff" } }}
            >
              Sing Up
            </Button>
            <Button
              component={Link}
              to="/loginPage/signUp"
              sx={{
                background: "#322F2FE0",
                borderRadius: "15px",
                color: "white",
                "&:hover": { color: "#dddbdbff" },
              }}
            >
              Login
            </Button>
          </Box>
        </Typography>
        {errors.root && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.root.message}
          </Typography>
        )}
        <Stack sx={{ alignItems: "flex-start" }}>
          <Typography variant="h4" component="h4" sx={{ marginBottom: "24px" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ alignItems: "flex-start", marginTop: "16px", gap: 2 }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email обязателен",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email",
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен быть не менее 6 символов",
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Password"
                    password={true}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Typography
                variant="h6"
                component="h6"
                sx={{ marginTop: "10px", fontSize: "13px" }}
              >
                Forgot Password?
              </Typography>
              <Button
                type="submit"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  minWidth: "505px",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "black",
                  color: "#FFFFFF",
                  background: "#7A5AF8",
                  "&:hover": {
                    background: "#5f43cfff",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <span>Login</span>
                )}
              </Button>
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Divider
                  sx={{
                    borderColor: "#8692A6",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    my: 2,
                    width: "230px",
                  }}
                />
                Or
                <Divider
                  sx={{
                    borderColor: "#8692A6",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    my: 2,
                    width: "230px",
                  }}
                />
              </Stack>
              <Button
                sx={{
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  minWidth: "505px",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "black",
                  color: "#FFFFFF",
                  background: "#100F14",
                  "&:hover": {
                    background: "#7A5AF8",
                  },
                }}
              >
                <img src={googleIcon} alt="Google-icon" />
                Login with Google
              </Button>
            </Stack>
          </form>
        </Stack>
      </ModalWrap>
    </>
  );
}
export default SignUpForm;
