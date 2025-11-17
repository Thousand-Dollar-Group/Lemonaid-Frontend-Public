import React from "react";
import ResponseToolBox from "./ResponseToolBox/ResponseToolBox";
import ResponseEmailPreview from "./ResponseEmailPreview";
import { spacing } from "../../styles";
import * as Models from "../../models";

interface ResponseMessageProps {
  message: Models.Message;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
      }}
    >
      <p
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {message.content}
      </p>
      {message.email && <ResponseEmailPreview message={message} />}
      <ResponseToolBox />
    </div>
  );
};

export default ResponseMessage;
