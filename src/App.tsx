import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { useAuth } from "./context/AuthContext";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ display: "flex", position: "relative", height: "100vh" }}>
      {isAuthenticated && (
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          style={{
            position: "absolute",
            width: isExpanded ? "calc(12.5vw + 48px)" : "calc(46px + 48px)",
            transition: "width 0.2s ease",
            height: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Sidebar isExpanded={isExpanded} />
        </div>
      )}

      {/* 右邊主區域 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            transition: "margin-left 0.2s ease",
            marginLeft: isExpanded
              ? "calc(12.5vw + 48px)"
              : "calc(46px + 48px)",
          }}
        >
          <Header />
        </div>

        {/* Outlet */}
        <div
          style={{
            flex: 1,
            display: "flex",
            //position: "absolute",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default App;
