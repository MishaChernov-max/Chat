import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useRef } from "react";

export type FileAttachmentType = {
  onFileSelect: (file: File) => void;
};

function FileAttachment({ onFileSelect }: FileAttachmentType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    event.target.value = "";
  };
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IconButton onClick={handleAttachClick}>
        <AttachFileIcon sx={{ fill: "white", width: "40px", height: "40px" }} />
      </IconButton>
    </>
  );
}
export default FileAttachment;
