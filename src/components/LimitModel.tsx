import React from "react";
import { useAuth } from "../context/AuthContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LimitModel: React.FC = () => {
  const { setLimitReached, handleLoginAuth } = useAuth(); //You can use this if you want to reset the limit on close

  const handleLogin = async () => {
    try {
      await handleLoginAuth();
      console.log("Login successful, Context useEffect will handle sync.");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onClose = () => {
    setLimitReached(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        width: "40vw",
        height: "22.5vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        padding: "32px",
        gap: "4px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div onClick={onClose} style={{ padding: "4px", cursor: "pointer" }}>
          <div style={{ width: "30px", height: "30px" }}>
            <XMarkIcon />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#EECD70",
          }}
        >
          Login to Continue
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <h3>You’ve reached your free daily limit.</h3>
          <h3>Login to continue.</h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "31px",
        }}
      >
        <div
          onClick={onClose}
          style={{
            backgroundColor: "#D9D9D9",
            padding: "1.67vw 5.83vw",
            color: "#000000",
            borderRadius: "32px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <h3>Cancel</h3>
        </div>
        <div
          onClick={handleLogin}
          style={{
            backgroundColor: "#EECD70",
            padding: "1.67vw 5.83vw",
            color: "#000000",
            borderRadius: "32px",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          <h3>Log in</h3>
        </div>
      </div>
    </div>
  );
};

export default LimitModel;
