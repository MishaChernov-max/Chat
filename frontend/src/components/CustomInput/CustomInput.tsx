import TextField, { type TextFieldProps } from "@mui/material/TextField";

type CustomInputType = {
  label: string;
  password?: boolean;
  error?: boolean;
  helperText?: string;
} & Omit<TextFieldProps, "error" | "helperText">;

function CustomInput({ label, password, ...props }: CustomInputType) {
  return (
    <TextField
      {...props}
      type={password ? "password" : "text"}
      variant="outlined"
      label={label}
      sx={{
        minWidth: "505px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#8692A6",
          },
          "&:hover fieldset": {
            borderColor: "#5473A0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#8692A6",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: "#8692A6",
          backgroundColor: "transparent",
          "&::placeholder": {
            color: "#4CAF50", // зеленый цвет placeholder
            opacity: 1,
          },
        },
      }}
    />
  );
}

export default CustomInput;
