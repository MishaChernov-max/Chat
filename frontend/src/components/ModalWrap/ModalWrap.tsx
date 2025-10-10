import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export type ModalWrapType = {
  children: ReactNode;
};
function ModalWrap({ children }: ModalWrapType) {
  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          background: "#059BE5",
          maxWidth: "410px",
          color: "white",
          padding: "40px 80px",
          borderRadius: "30px",
          minHeight: "500px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
export default ModalWrap;
