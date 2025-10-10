import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useLoginPage from "../../hooks/useLoginPage";
import StatusWrapper from "../StatusWrapper/StatusWrapper";
import CustomInput from "../CustomInput/CustomInput";
import ModalWrap from "../ModalWrap/ModalWrap";
const UserDataForm = () => {
  const [name, setName] = useState<string>("");
  const [surName, setsurName] = useState<string>("");
  const { isLoading, isError, register } = useLoginPage();
  return (
    <>
      <ModalWrap>
        <StatusWrapper isLoading={isLoading} isError={isError}>
          <Typography variant="h4" component="h4" sx={{ marginBottom: "40px" }}>
            Регистрация
          </Typography>
          <Stack sx={{ alignItems: "flex-start" }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ marginBottom: "24px" }}
            >
              ФИО
            </Typography>

            <Stack sx={{ alignItems: "flex-start" }}>
              <CustomInput value={name} setValue={setName} label="name" />
            </Stack>

            <Stack sx={{ alignItems: "flex-start", marginTop: "16px" }}>
              <CustomInput
                value={surName}
                setValue={setsurName}
                label="surname"
              />
              <Button
                sx={{
                  background: "#003465",
                  width: "100%",
                  borderRadius: "10px",
                  marginTop: 5,
                  padding: "10px",
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  setName("");
                  setsurName("");
                  const userData = { email: name, password: surName };
                  register(userData);
                }}
              >
                Ok
              </Button>
            </Stack>
          </Stack>
        </StatusWrapper>
      </ModalWrap>
    </>
  );
};
export default UserDataForm;
