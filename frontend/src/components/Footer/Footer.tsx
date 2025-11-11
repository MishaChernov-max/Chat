import Box from "@mui/material/Box";
import InputField from "../InputField/InputField";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
function Footer() {
  const [value, setValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  return (
    <>
      <Box
        sx={{ paddingLeft: "17px", paddingRight: "7px", position: "relative" }}
      >
        <InputField
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          value={value}
          setValue={setValue}
        />
        {showEmoji && (
          <Box style={{ position: "absolute", bottom: "120%" }}>
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setValue(value + emojiData.emoji);
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
export default Footer;
