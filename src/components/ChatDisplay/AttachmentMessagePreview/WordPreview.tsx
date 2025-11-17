import React from "react";
import { spacing } from "../../../styles";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

interface WordPreviewProps {
  // url: string;
  maxSize: string;
  fileName: string;
}

const WordPreview: React.FC<WordPreviewProps> = ({
  // url,
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
      <div
        style={{
          maxWidth: `calc(${maxSize} - 48px)`,
          maxHeight: `calc(${maxSize} - 86px)`,
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "5px",
          backgroundColor: "white",
        }}
        // wordfile
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
            backgroundColor: "#0C7CEC",
            borderRadius: "4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DocumentChartBarIcon
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
            fontSize: "14px",
          }}
        >
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default WordPreview;
