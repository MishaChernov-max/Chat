import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ChatFilterTabs() {
  return (
    <>
      <Box
        sx={{
          marginTop: "21px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
          Message
        </Typography>
        <Box
          sx={{
            background: "#000000E0",
            borderRadius: "100px",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "27px",
            paddingRight: "27px",
          }}
        >
          <Button
            href="#text-buttons"
            sx={{
              color: "#FFFFFF",
              background: "transparent",
              borderRadius: "100px",
              "&:hover": {
                background: "#322F2FE0",
              },
            }}
          >
            All Chats
          </Button>
          <Button
            href="#text-buttons"
            sx={{
              color: "#FFFFFF",
              background: "transparent",
              borderRadius: "100px",
              "&:hover": {
                background: "#322F2FE0",
              },
            }}
          >
            Groups
          </Button>
          <Button
            href="#text-buttons"
            sx={{
              color: "#FFFFFF",
              background: "transparent",
              borderRadius: "100px",
              "&:hover": {
                background: "#322F2FE0",
              },
            }}
          >
            Contacts
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default ChatFilterTabs;
