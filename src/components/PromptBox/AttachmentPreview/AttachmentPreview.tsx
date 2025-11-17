import React from "react";
import AttachmentPreviewCell from "./AttachmentPreviewCell";
import { spacing } from "../../../styles";

interface AttachmentPreviewProps {
  files: File[];
  onRemoveFile: (fileName: string) => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  files,
  onRemoveFile,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: spacing.sm,
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: spacing.xs,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {files.map((file: File) => (
        <AttachmentPreviewCell
          key={file.name}
          file={file}
          onClick={() => {
            onRemoveFile(file.name);
          }}
        />
      ))}
    </div>
  );
};

export default AttachmentPreview;
