import React, { useState } from "react";
import { HandThumbDownIcon as ThumbDownOutline } from "@heroicons/react/24/outline";
import { HandThumbDownIcon as ThumbDownSolid } from "@heroicons/react/24/solid";
import { colors } from "../../../styles";

const ThumbsDownButton: React.FC = () => {
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
        <ThumbDownSolid
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      ) : (
        <ThumbDownOutline
          style={{ color: colors.text[80], width: "24px", height: "24px" }}
        />
      )}
    </div>
  );
};

export default ThumbsDownButton;
