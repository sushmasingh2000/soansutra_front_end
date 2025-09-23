import { useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        {/* Header with toggle */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-4 mt-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
