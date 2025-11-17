import React from "react";
import { spacing } from "../../../styles";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ImagePreviewProps {
  url: string;
  maxSize: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  url,
  maxSize,
  fileName,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: spacing.xs,
      }}
    >
      <img
        src={url}
        style={{
          maxWidth: `calc(${maxSize} - 48px)`,
          maxHeight: `calc(${maxSize} - 86px)`,
          width: "auto",
          height: "auto",
          display: "block",
          objectFit: "contain",
          objectPosition: "center",
          alignSelf: "flex-end",
        }}
      />
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          flexDirection: "row",
          padding: `${spacing.xs} ${spacing.sm} ${spacing.xs} ${spacing.xs}`,
        }}
      >
        <div
          style={{
            padding: spacing.xs,
            backgroundColor: "#21823C",
            borderRadius: "4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhotoIcon
            style={{ width: "30px", height: "30px" }}
            stroke="#FFFFFF"
          />
        </div>
        <p
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 0,
          }}
        >
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
