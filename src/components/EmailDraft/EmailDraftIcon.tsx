import React, { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

interface Props {
  setEmailDraft: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailDraftIcon: React.FC<Props> = ({ setEmailDraft }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setEmailDraft(true)}
      style={{
        width: "1.5vw",
        height: "1.5vw",
        cursor: "pointer",
      }}
    >
      <ArrowTopRightOnSquareIcon
        style={{
          color: "black",
          transform: hovered
            ? "translate(5px, -5px)" // Rotates and moves up-right
            : "translate(0, 0)", // Resets to original position
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
};

export default EmailDraftIcon;
