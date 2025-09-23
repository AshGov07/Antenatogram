import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/bars/navbar";
import MarkedParameters from "../components/cards/MarkedParameters";
import SelfMonitoringParametersGraph from "../components/cards/selfMonitoringGraphs";
import FoetalMeasurementsGraph from "../components/cards/foetalGraphs";
import RightSidebar from "../components/bars/rightSideBar";

const availableGraphs = [
  { id: "selfMonitoring", label: "Vitals" },
  { id: "markedParameters", label: "Biochemical Parameters" },
  { id: "foetalMeasurements", label: "Foetal Measurements" },
];

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Load selected graphs from localStorage, fallback to all selected
  const getInitialGraphs = () => {
    const saved = localStorage.getItem("selectedGraphs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return availableGraphs.map(g => g.id);
  };
  const [selectedGraphs, setSelectedGraphs] = useState(getInitialGraphs);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem("selectedGraphs", JSON.stringify(selectedGraphs));
  }, [selectedGraphs]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDropdownToggle = () => setDropdownOpen((open) => !open);

  const handleGraphSelect = (id) => {
    setSelectedGraphs((prev) =>
      prev.includes(id)
        ? prev.filter((gid) => gid !== id)
        : [...prev, id]
    );
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
      {/* Long horizontal graph selection bar */}
      <div
        className="w-full flex justify-start items-center"
        style={{
          marginTop: "32px",
          marginBottom: "32px",
          paddingLeft: "32px",
        }}
      >
        <div
          className="flex flex-col justify-center shadow bg-white"
          style={{
            width: "calc(80vw - 48px)", // spans most of the dashboard width, minus sidebar
            maxWidth: "1200px",
            borderRadius: "24px",
            padding: "24px 32px",
          }}
          ref={dropdownRef}
        >
          <label className="font-semibold mb-2" htmlFor="graph-dropdown">
            Select Graphs:
          </label>
          <div className="relative w-full">
            <button
              id="graph-dropdown"
              className="w-full text-left p-3 rounded border border-gray-300 bg-white shadow"
              onClick={handleDropdownToggle}
              style={{
                minHeight: "44px",
                fontSize: "1.1rem",
                borderRadius: "12px",
              }}
            >
              {selectedGraphs.length === 0
                ? <span className="text-gray-400">Select graphs to prioritize</span>
                : availableGraphs
                    .filter(g => selectedGraphs.includes(g.id))
                    .map(g => g.label)
                    .join(", ")
              }
              <span className="float-right">&#9662;</span>
            </button>
            {dropdownOpen && (
              <div
                className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow z-10"
                style={{ maxHeight: "180px", overflowY: "auto" }}
              >
                {availableGraphs.map(graph => (
                  <div
                    key={graph.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleGraphSelect(graph.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGraphs.includes(graph.id)}
                      readOnly
                      className="mr-2"
                    />
                    <span>{graph.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <small className="text-gray-500 mt-2">
            Select graphs to prioritize
          </small>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full px-4 transition-all duration-300">
        <div
          id="middle"
          className={`flex flex-wrap justify-start w-full md:w-4/5 p-4 space-y-8`}
        >
          {selectedGraphs.includes("selfMonitoring") && <SelfMonitoringParametersGraph />}
          {selectedGraphs.includes("markedParameters") && <MarkedParameters />}
          {selectedGraphs.includes("foetalMeasurements") && <FoetalMeasurementsGraph />}
        </div>
        <div
          id="right"
          className={`hidden md:block fixed top-0 right-0 h-full w-1/5 bg-white shadow-lg z-40 transition-transform duration-300`}
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
