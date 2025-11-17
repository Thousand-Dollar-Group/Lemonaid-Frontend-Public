import React from "react";
import type { ReactNode } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { colors, spacing } from "../../../styles";

interface EmailButtonProps {
  children: ReactNode;
  title: string;
  onClick: () => void;
}

const EmailButton: React.FC<EmailButtonProps> = ({
  children,
  title,
  onClick,
}) => {
  return (
    <div
      style={{
        padding: `${spacing.xs} ${spacing.md}`,
        borderRadius: "24px",
        color: colors.light,
        backgroundColor: colors.primary,
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            padding: spacing.xs,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>

        <p>{title}</p>
      </div>

      <PaperAirplaneIcon style={{ width: "24px", height: "24px" }} />
    </div>
  );
};

export default EmailButton;
