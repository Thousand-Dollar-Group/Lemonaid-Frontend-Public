import React from "react";
import PromptBox from "../components/PromptBox/PromptBox";
import bgImage from "../assets/home_background_250823.png";
import LemonLogo from "../components/LemonLogo";
import { colors, spacing } from "../styles";

const HomeLayout: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: spacing.md,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: spacing.xl,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              color: colors.primary,
              filter: "drop-shadow(0 0 24px rgba(0, 0, 0, 0.5))",
            }}
          >
            What fasteners do you need?
          </h2>
        </div>

        <div
          style={{
            filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))",
          }}
        >
          <PromptBox key={location.pathname} />
        </div>
      </div>

      <LemonLogo />
    </div>
  );
};

export default HomeLayout;
