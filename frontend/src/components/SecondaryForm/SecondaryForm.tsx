import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ModalWrap from "../ModalWrap/ModalWrap";
import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";

function SecondaryForm() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  return (
    <>
      <ModalWrap>
        <Stack sx={{ alignItems: "flex-start" }}>
          <Stack sx={{ alignItems: "flex-start" }}>
            <CustomInput value={name} setValue={setName} />
          </Stack>

          <Stack sx={{ alignItems: "flex-start", marginTop: "16px" }}>
            <CustomInput value={surname} setValue={setSurname} />
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
                setName("");
                setSurname("");
              }}
            >
              Ок
            </Button>
          </Stack>
        </Stack>
      </ModalWrap>
    </>
  );
}

export default SecondaryForm;
