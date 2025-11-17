import React from "react";
import { spacing } from "../../../styles";

interface PdfPreviewProps {
  url: string;
  maxSize: string;
  fileName: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ url, maxSize, fileName }) => {
  const urlWithNoUI = `${url}#toolbar=0&navpanes=0&`;

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
          width: `calc(${maxSize} - 48px)`,
          height: `calc(${maxSize} - 86px)`,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <object
          data={urlWithNoUI}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
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
            width: "38px",
            height: "38px",
            padding: spacing.xs,
            backgroundColor: "#B51001",
            borderRadius: "4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="31" height="20" xmlns="http://www.w3.org/2000/svg">
            <text
              x="0"
              y="16"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="-0.48"
              fill="#FFFFFF"
            >
              PDF
            </text>
          </svg>
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

export default PdfPreview;
