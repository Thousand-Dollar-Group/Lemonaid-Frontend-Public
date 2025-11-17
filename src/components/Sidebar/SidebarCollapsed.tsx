import React from "react";
import { spacing } from "../../styles/spacing";
import { colors } from "../../styles";
import {
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const SidebarCollapsed: React.FC = () => {
  return (
    <div //sidebar container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "103px 24px 24px 24px",
        backgroundColor: colors.light,
      }}
    >
      {/* New Chat + chat list icon */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing.md, //16px

          padding: spacing.xs, //4px
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: spacing.xs, //4px
          }}
        >
          <PencilSquareIcon
            style={{
              width: "30px",
              height: "30px",
              color: "black",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: spacing.xs,
          }}
        >
          <ChatBubbleLeftRightIcon
            style={{
              width: "30px",
              height: "30px",
              color: "black",
            }}
          />
        </div>
      </div>

      {/* Footer / Account */}
      <div>
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "#EECD7080",
          }}
        />
      </div>
    </div>
  );
};

export default SidebarCollapsed;
