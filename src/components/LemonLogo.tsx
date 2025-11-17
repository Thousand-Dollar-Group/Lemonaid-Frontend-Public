import React from "react";
import logo from "../assets/lemon_icon_250823.png";

const LemonLogo: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>from</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Lemonaid Logo"
          style={{
            width: "40px",
            height: "auto",
          }}
        />
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: "800",
            fontSize: "1.4vw",
            letterSpacing: "0.06em",
            color: "#333633",
          }}
        >
          company
        </div>
      </div>
    </div>
  );
};

export default LemonLogo;
