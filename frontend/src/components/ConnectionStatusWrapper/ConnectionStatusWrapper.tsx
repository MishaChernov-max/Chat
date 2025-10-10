import Typography from "@mui/material/Typography";

type ConnectionStatusWrapperType = {
  isConnected: boolean;
};
function ConnectionStatusWrapper({ isConnected }: ConnectionStatusWrapperType) {
  if (isConnected) {
    return (
      <Typography variant="h5" component="h5" sx={{ color: "#21FF5F" }}>
        Online
      </Typography>
    );
  }
  return (
    <Typography variant="h5" component="h5" sx={{ color: "#e01717ff" }}>
      Offline
    </Typography>
  );
}
export default ConnectionStatusWrapper;
