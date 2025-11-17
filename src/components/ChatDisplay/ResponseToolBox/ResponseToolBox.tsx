import React from "react";
import ClipboardButton from "./ClipboardButton";
// import ThumbsUpButton from "./ThumbsUpButton";
// import ThumbsDownButton from "./ThumbsDownButton";
// import RefreshButton from "./RefreshButton";
import { spacing } from "../../../styles";

const ResponseToolBox: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: spacing.sm }}>
      <ClipboardButton />
      {/* <ThumbsUpButton /> */}
      {/* <ThumbsDownButton /> */}
      {/* <RefreshButton /> */}
    </div>
  );
};

export default ResponseToolBox;
