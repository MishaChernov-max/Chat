import TextField from "@mui/material/TextField";
import type { Dispatch, SetStateAction } from "react";

type CustomInputType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
};

function CustomInput({ value, setValue, label }: CustomInputType) {
  return (
    <>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        sx={{ minWidth: "250px" }}
        id="outlined-basic"
        label={label}
        variant="outlined"
      />
    </>
  );
}
export default CustomInput;
