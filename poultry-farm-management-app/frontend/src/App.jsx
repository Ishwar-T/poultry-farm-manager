// src/App.jsx

import React, { useState } from "react";

import Dashboard from "./pages/Dashboard";

import NavBar from "./components/NavBar";

import ExpensePage from "./pages/ExpensePage";

import BatchPage from "./pages/BatchPage";

import SalesPage from "./pages/SalesPage";

import DailyPage from "./pages/DailyPage";

import FeedPage from "./pages/FeedPage";

function App() {

  const [active, setActive] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode
          ? "#0f172a"
          : "#f1f5f9"
      }}
    >

      {/* 🔥 SIDEBAR */}
      <NavBar
        active={active}
        setActive={setActive}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* 🔥 MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "24px",
          overflowY: "auto"
        }}
      >

        {/* PAGE CONTENT */}
        <div
          style={{
            background: darkMode
              ? "#111827"
              : "#f8fafc",
            minHeight: "100%",
            borderRadius: "16px"
          }}
        >

          {active === "dashboard" && (
            <Dashboard />
          )}

          {active === "expenses" && (
            <ExpensePage />
          )}

          {active === "batches" && (
            <BatchPage />
          )}

          {active === "sales" && (
            <SalesPage />
          )}

          {active === "daily" && (
            <DailyPage />
          )}

          {active === "feed" && (
            <FeedPage />
          )}

        </div>

      </div>

    </div>
  );
}

export default App;