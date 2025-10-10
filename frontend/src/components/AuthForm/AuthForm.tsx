import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useLoginPage from "../../hooks/useLoginPage";
import StatusWrapper from "../StatusWrapper/StatusWrapper";
import CustomInput from "../CustomInput/CustomInput";
import ModalWrap from "../ModalWrap/ModalWrap";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, isError, register } = useLoginPage();
  return (
    <>
      <ModalWrap>
        <StatusWrapper isLoading={isLoading} isError={isError}>
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
                sx={{ color: "white", "&:hover": { color: "#dddbdbff" } }}
              >
                Login
              </Button>
            </Box>
          </Typography>
          <Stack sx={{ alignItems: "flex-start" }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ marginBottom: "24px" }}
            >
              Sign Up
            </Typography>

            <Stack sx={{ alignItems: "flex-start" }}>
              <CustomInput value={email} setValue={setEmail} label="email" />
            </Stack>

            <Stack sx={{ alignItems: "flex-start", marginTop: "16px" }}>
              <CustomInput
                value={password}
                setValue={setPassword}
                label="password"
              />
              <Typography
                variant="h6"
                component="h6"
                sx={{ marginTop: "10px", fontSize: "13px" }}
              >
                Forgot Password?
              </Typography>
              <Button
                sx={{
                  background: "#003465",
                  width: "100%",
                  borderRadius: "10px",
                  marginTop: 3,
                  padding: "10px",
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  const userData = { email: email, password: password };
                  register(userData);
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </StatusWrapper>
      </ModalWrap>
    </>
  );
}
export default AuthForm;
