import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import type { AppDispatch, RootState } from "../../store";
import CustomInput from "../CustomInput/CustomInput";
import { updateGetUserInformationThunk } from "../../store/slices/authSlice";

export type EditProfileModalType = {
  open: boolean;
  onClose: () => void;
};

function EditProfileModal({ open, onClose }: EditProfileModalType) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user", user);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      surName: user?.surName || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || "",
        firstName: user.firstName || "",
        surName: user.surName || "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (isError) {
      setError("root", {
        type: "manual",
        message: isError,
      });

      const timer = setTimeout(() => {
        clearErrors("root");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError, setError, clearErrors]);

  const onSubmit = async (data: {
    email?: string;
    firstName: string;
    surName: string;
  }) => {
    console.log(data, "data");
    await dispatch(
      updateGetUserInformationThunk({
        _id: user?._id || "",
        firstName: data.firstName,
        surName: data.surName,
      })
    ).unwrap();
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#272626ff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            color: "black",
          }}
        >
          {/* Глобальная ошибка формы */}
          {errors.root && (
            <Box
              sx={{
                color: "red",
                mb: 2,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {errors.root.message}
            </Box>
          )}

          <Stack direction="column" gap={4} mb={1.5}>
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
              name="firstName"
              control={control}
              rules={{
                required: "firstName обязателен",
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="surName"
              control={control}
              rules={{
                required: "surName обязателен",
              }}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Sur Name"
                  error={!!errors.surName}
                  helperText={errors.surName?.message}
                />
              )}
            />
          </Stack>

          <Button
            onClick={onClose}
            sx={{
              color: "white",
              mt: 1,
              textTransform: "none",
              background: "black",
              borderRadius: "10px",
              "&:hover": { background: "#1a1616ff" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: "white",
              mt: 1,
              ml: 1.5,
              background: "black",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": { background: "#1a1616ff" },
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : <span>Send</span>}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}

export default EditProfileModal;
