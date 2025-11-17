import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { colors, spacing } from "../../../styles";

interface AttachmentPreviewCellProps {
  file: File;
  onClick: () => void;
}

const AttachmentPreviewCell: React.FC<AttachmentPreviewCellProps> = ({
  file,
  onClick,
}) => {
  const [isHover, setHover] = useState<boolean>(false);
  const imageUrl = file.type.startsWith("image")
    ? URL.createObjectURL(file)
    : null;

  return (
    <div
      style={{
        outline: "1px solid black",
        height: "3vw",
        borderRadius: "16px",
        display: "inline-flex",
        padding: spacing.xs,
        cursor: "default",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          style={{
            width: "auto",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          marginLeft: spacing.sm,
          marginRight: spacing.sm,
        }}
      >
        <p>{file.name}</p>
        {isHover && (
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: colors.light,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            <XMarkIcon style={{ width: "24px", height: "24px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentPreviewCell;
