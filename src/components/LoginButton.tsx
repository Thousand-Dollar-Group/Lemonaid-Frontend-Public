import React from "react";
import { useAuth } from "../context/AuthContext";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

const LoginButton: React.FC = () => {
  const { handleLoginAuth } = useAuth();

  const handleLogin = async () => {
    try {
      await handleLoginAuth();
      console.log("Login successful, Context useEffect will handle sync.");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
      }}
    >
      <div
        onClick={handleLogin}
        style={{
          display: "flex",
          gap: "4px",
          backgroundColor: "#EECD70",
          padding: "16px 24px",
          borderRadius: "31px",
          alignItems: "center",
          cursor: "pointer",
        }}
        // onMouseEnter={(e) => {
        //   e.currentTarget.style.backgroundColor = "#3367d6";
        // }}
        // onMouseLeave={(e) => {
        //   e.currentTarget.style.backgroundColor = "#EECD70";
        // }}
      >
        <p>Sign up</p>
        <UserPlusIcon
          style={{
            width: "30px",
            height: "30px",
            display: "block",
          }}
        />
      </div>
      <div
        onClick={handleLogin}
        style={{
          display: "flex",
          gap: "4px",
          backgroundColor: "#EECD70",
          padding: "16px 24px",
          borderRadius: "31px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <p>Log in</p>
        <ArrowLeftEndOnRectangleIcon
          style={{
            width: "30px",
            height: "30px",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default LoginButton;
