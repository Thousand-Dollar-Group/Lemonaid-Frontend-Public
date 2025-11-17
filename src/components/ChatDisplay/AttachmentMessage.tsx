import React from "react";
import { colors, spacing } from "../../styles";
import type * as Models from "../../models";
import PdfPreview from "./AttachmentMessagePreview/PdfPreview";
import ExcelPreview from "./AttachmentMessagePreview/ExcelPreview";
import ImagePreview from "./AttachmentMessagePreview/ImagePreview";
// import WordPreview from "./AttachmentMessagePreview/WordPreview";

interface AttachmentMessageProps {
  fileInfo?: Models.Message["fileInfo"];
}

const MAX_PREVIEW_SIZE = "42.5vw";

const AttachmentMessage: React.FC<AttachmentMessageProps> = ({ fileInfo }) => {
  const getFileExtension = (filename?: string) => {
    return filename?.split(".").pop()?.toLowerCase();
  };

  const getPreviewComponent = () => {
    if (!fileInfo?.url) {
      return <p>{fileInfo?.name.substring(0, 8)}</p>;
    }

    const extension = getFileExtension(fileInfo.name);
    const fileType = fileInfo.type;
    const fileUrl = fileInfo.url;
    const fileName = fileInfo.name;

    if (
      fileType?.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp"].includes(extension ?? "")
    ) {
      return (
        <ImagePreview
          url={fileUrl}
          maxSize={MAX_PREVIEW_SIZE}
          fileName={fileName}
        />
      );
    } else if (fileType === "application/pdf" || extension === "pdf") {
      return (
        <PdfPreview
          url={fileUrl}
          maxSize={MAX_PREVIEW_SIZE}
          fileName={fileName}
        />
      );
    } else if (
      ["xlsx", "xls", "csv"].includes(extension ?? "") ||
      fileType?.includes("spreadsheet") ||
      fileType?.includes("excel")
    ) {
      return (
        <ExcelPreview
          url={fileUrl}
          maxSize={MAX_PREVIEW_SIZE}
          fileName={fileName}
        />
      );
      // } else if (
      //   ["docx", "doc"].includes(extension ?? "") ||
      //   fileType?.includes("document") ||
      //   fileType?.includes("word")
      // ) {
      //   return (
      //     <WordPreview
      //       url={fileUrl}
      //       maxSize={MAX_PREVIEW_SIZE}
      //       fileName={fileName}
      //     />
      //   );
    } else {
      return <p>{fileName}</p>;
    }
  };

  const handleClick = () => {
    if (fileInfo?.url) {
      window.open(fileInfo.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: MAX_PREVIEW_SIZE,
          maxHeight: MAX_PREVIEW_SIZE,
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.background[60],
          padding: `${spacing.lg} ${spacing.lg} ${spacing.sm} ${spacing.lg}`,
          borderRadius: "16px 0 16px 16px",
        }}
        onClick={handleClick}
      >
        {getPreviewComponent()}
      </div>
    </div>
  );
};

export default AttachmentMessage;
