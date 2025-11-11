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
import { CircularProgress } from "@mui/material";
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
                background: "#19c5dbff",
                borderRadius: "10px",
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
                  background: "#003465",
                  width: "100%",
                  borderRadius: "10px",
                  marginTop: 3,
                  padding: "10px",
                  color: "#FFFFFF",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </ModalWrap>
    </>
  );
}
export default SignUpForm;
