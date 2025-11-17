import React from "react";
import { colors, spacing } from "../../styles";
import * as Models from "../../models";
import { useChatbot } from "../../context/ChatbotContext";

interface ResponseEmailPreviewProps {
  message: Models.Message;
}

const ResponseEmailPreview: React.FC<ResponseEmailPreviewProps> = ({
  message,
}) => {
  // working on this email preview

  const { enableEmailDraft } = useChatbot();

  const handleClick = () => {
    enableEmailDraft(message);
  };

  return (
    <div
      style={{
        backgroundColor: `${colors.focus}80`,
        padding: spacing.xl,
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: spacing.md }}>
        <p style={{ color: colors.text[40] }}>Email</p>
        <p style={{ color: colors.text[100] }}>{message.email?.subject}</p>
      </div>

      <div
        style={{
          display: "inline-flex",
          backgroundColor: colors.light,
          padding: `${spacing.sm} ${spacing.md}`,
          borderRadius: "18px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Preview
      </div>
    </div>
  );
};

export default ResponseEmailPreview;
