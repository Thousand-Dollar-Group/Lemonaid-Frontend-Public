import React from "react";
import { useAuth } from "../context/AuthContext";
import { useChatbot } from "../context/ChatbotContext";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const LogoutButton: React.FC = () => {
  const { handleLogout } = useAuth();
  const { clearMessages } = useChatbot();

  const logout = async () => {
    handleLogout();
    clearMessages();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
      }}
    >
      <div
        onClick={logout}
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
        <p>Log out</p>
        <UserPlusIcon
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

export default LogoutButton;
