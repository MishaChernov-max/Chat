import TextField, { type TextFieldProps } from "@mui/material/TextField";

type CustomInputType = {
  label: string;
  password?: boolean;
  error?: boolean;
  helperText?: string;
} & Omit<TextFieldProps, "error" | "helperText">;

function CustomInput({ label, password, ...props }: CustomInputType) {
  return (
    <>
      <TextField
        {...props}
        type={password ? "password" : "text"}
        sx={{ minWidth: "250px" }}
        label={label}
        variant="outlined"
      />
    </>
  );
}
export default CustomInput;
