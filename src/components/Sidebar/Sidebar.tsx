import React from "react";
import SidebarExpanded from "./SidebarExpanded.tsx";
import SidebarCollapsed from "./SidebarCollapsed.tsx";

const Sidebar: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  return (
    <div className="h-full flex flex-col">
      {isExpanded ? <SidebarExpanded /> : <SidebarCollapsed />}
    </div>
  );
};

export default Sidebar;
