import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { colors, spacing } from "../../styles";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        padding: spacing.xs,
        borderRadius: "50%",
        backgroundColor: colors.primary,
        color: colors.light,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: "30px",
          width: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowUpIcon
          style={{ height: "24px", width: "24px" }}
        />
      </div>
    </div>
  );
};

export default SubmitButton;
