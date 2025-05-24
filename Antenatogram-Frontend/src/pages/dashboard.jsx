import { useState } from "react";
import Navbar from "../components/bars/navbar";
import MarkedParameters from "../components/cards/MarkedParameters";
import SelfMonitoringParametersGraph from "../components/cards/selfMonitoringGraphs";
import FoetalMeasurementsGraph from "../components/cards/foetalGraphs";
import RightSidebar from "../components/bars/rightSideBar";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar starts closed on mobile

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="dashboard" className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <span style={{ fontSize: "2rem", lineHeight: "1" }}>☰</span>
      </button>
      <div className="flex flex-col md:flex-row w-full px-4 transition-all duration-300">
        <div
          id="middle"
          className={`flex flex-wrap justify-start w-full md:w-4/5 p-4 space-y-8`}
        >
          <SelfMonitoringParametersGraph />
          <MarkedParameters />
          <FoetalMeasurementsGraph />
        </div>
        <div
          id="right"
          className={`hidden md:block fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-40 transition-transform duration-300}`}
        >
          <RightSidebar />
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-4/5 bg-white shadow-lg z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
