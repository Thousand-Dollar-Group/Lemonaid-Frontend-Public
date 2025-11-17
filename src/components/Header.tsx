import React from "react";
import LemonaidLogo from "./LemonaidLogo";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  // const user = null;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        height: "5vw",
        padding: "0 24px",
        justifyContent: "space-between",
      }}
    >
      <a href="/">
        <LemonaidLogo />
      </a>

      {!isAuthenticated && <LoginButton />}

      {isAuthenticated && <LogoutButton />}
    </header>
  );
};

export default Header;
