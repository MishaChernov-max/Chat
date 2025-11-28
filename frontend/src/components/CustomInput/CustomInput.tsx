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
        "& .MuiInputBase-input": {
          color: "white", // белый текст
          fontWeight: "bold",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#7c7ccaff",
            borderRadius: "10px",
          },
          "&:hover fieldset": {
            borderColor: "#7c7ccaff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#7c7ccaff",
          },
        },
        "& .MuiInputLabel-root": {
          color: "white", // цвет метки
          fontWeight: "bold", // жирность
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#7c7ccaff", // цвет метки при фокусе
        },
      }}
    />
  );
}

export default CustomInput;
