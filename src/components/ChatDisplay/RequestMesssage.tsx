import React from "react";
import { colors, spacing } from "../../styles";
import * as Models from "../../models/index";

interface RequestMessageProps {
  message: Models.Message;
}

const RequestMessage: React.FC<RequestMessageProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          backgroundColor: colors.background[60],
          padding: spacing.md,
          maxWidth: "42.5vw",
          borderRadius: "16px 0 16px 16px",
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
      </div>
    </div>
  );
};

export default RequestMessage;
