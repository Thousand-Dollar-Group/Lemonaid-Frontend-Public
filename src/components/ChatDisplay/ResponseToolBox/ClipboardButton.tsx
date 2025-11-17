import React, { useState } from "react";
import { ClipboardIcon as ClipboardOutline } from "@heroicons/react/24/outline";
import { ClipboardIcon as ClipboardSolid } from "@heroicons/react/24/solid";
import { colors } from "../../../styles";

const ClipboardButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "30px",
        height: "30px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {hovered ? (
        <ClipboardSolid
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      ) : (
        <ClipboardOutline
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      )}
    </div>
  );
};

export default ClipboardButton;
