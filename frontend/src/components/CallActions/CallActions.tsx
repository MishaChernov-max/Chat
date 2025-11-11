import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import videoCall from "../../assets/video-call.svg";
import phoneCall from "../../assets/phone-call.svg";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Daily from "@daily-co/daily-js";

function CallActions() {
  const { user } = useSelector((state: RootState) => state.auth);
  const handleCall = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/daily/createRoom",
        {
          method: "POST",
        }
      );
      const room = await response.json();
      const callFrame = Daily.createCallObject();
      await callFrame.join({
        url: room.url,
        userData: {
          id: user?._id,
          name: user?.firstName,
        },
      });
    } catch (error) {
      console.error("Call failed:", error);
    }
  };
  return (
    <>
      <Stack direction="row">
        <Button>
          <Avatar src={videoCall} alt="Video" />
        </Button>
        <Button onClick={handleCall}>
          <Avatar src={phoneCall} alt="Phone" />
        </Button>
      </Stack>
    </>
  );
}
export default CallActions;
