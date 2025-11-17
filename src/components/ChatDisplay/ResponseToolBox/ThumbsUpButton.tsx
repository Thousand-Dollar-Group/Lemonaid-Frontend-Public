import React, { useState } from "react";
import { HandThumbUpIcon as ThumbUpOutline } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as ThumbUpSolid } from "@heroicons/react/24/solid";
import { colors } from "../../../styles";

const ThumbsUpButton: React.FC = () => {
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
        <ThumbUpSolid
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      ) : (
        <ThumbUpOutline
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      )}
    </div>
  );
};

export default ThumbsUpButton;
