import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import videoCall from "../../assets/video-call.svg";
import phoneCall from "../../assets/phone-call.svg";
function CallActions() {
  return (
    <>
      <Stack direction="row">
        <Button>
          <Avatar src={videoCall} alt="Video" />
        </Button>
        <Button>
          <Avatar src={phoneCall} alt="Phone" />
        </Button>
      </Stack>
    </>
  );
}
export default CallActions;
