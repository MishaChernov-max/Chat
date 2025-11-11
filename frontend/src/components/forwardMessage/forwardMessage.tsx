import { Typography } from "@mui/material";

export type forwardMessageType = {
  forwardedFrom?: string;
};
function ForwardMessage({ forwardedFrom }: forwardMessageType) {
  return (
    <>
      <Typography sx={{ color: "#e0d4f5ef" }}>
        Переслано от {forwardedFrom}
      </Typography>
    </>
  );
}
export default ForwardMessage;
