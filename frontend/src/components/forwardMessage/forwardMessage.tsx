import { Typography } from "@mui/material";

export type forwardMessageType = {
  forwardedFrom?: string;
};
function ForwardMessage({ forwardedFrom }: forwardMessageType) {
  return (
    <>
      <Typography>Переслано от {forwardedFrom}</Typography>
    </>
  );
}
export default ForwardMessage;
