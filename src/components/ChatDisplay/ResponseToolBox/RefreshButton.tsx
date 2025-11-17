import React, { useState } from "react";
import { ArrowPathIcon as ArrowPathOutline } from "@heroicons/react/24/outline";
import { colors } from "../../../styles";

const RefreshButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "30px",
        height: "30px",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ArrowPathOutline
        style={{
          color: colors.text[80],
          width: "24px",
          height: "24px",
          transform: hovered ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
};

export default RefreshButton;
