// src/components/NavBar.jsx

import React from "react";

  const NavBar = ({
    active,
    setActive,
    darkMode,
    setDarkMode
  }) => {

  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "📊"
    },
    {
      key: "batches",
      label: "Batches",
      icon: "🐥"
    },
    {
      key: "expenses",
      label: "Expenses",
      icon: "💸"
    },
    {
      key: "sales",
      label: "Sales",
      icon: "💰"
    },
    {
      key: "daily",
      label: "Daily Records",
      icon: "📅"
    },
    {
      key: "feed",
      label: "Feed Formula",
      icon: "🌽"
    }
  ];

  return (

    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: darkMode
          ? "#020617"
          : "#0f172a",
        padding: "20px",
        color: "white",
        boxSizing: "border-box",
        borderRadius: "0 16px 16px 0",
        position: "sticky",
        top: 0
      }}
    >

      {/* LOGO */}
      <div
        style={{
          marginBottom: "30px",
          textAlign: "center"
        }}
      >

        <h2
          style={{
            margin: 0,
            color: "#38bdf8"
          }}
        >
          🐔 Poultry ERP
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >
          Farm Management System
        </p>

      </div>

      {/* 🔥 DARK MODE TOGGLE */}

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "none",
          borderRadius: "10px",
          background: darkMode
            ? "#facc15"
            : "#334155",
          color: darkMode
            ? "black"
            : "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >

        {darkMode
          ? "☀️ Light Mode"
          : "🌙 Dark Mode"}

      </button>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >

        {tabs.map((tab) => (

          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",

              padding: "14px",

              border: "none",

              borderRadius: "10px",

              cursor: "pointer",

              fontSize: "15px",

              fontWeight: "600",

              transition: "0.2s",

              background:
                active === tab.key
                  ? "#2563eb"
                  : "#1e293b",

              color: "white",

              textAlign: "left"
            }}
          >

            <span style={{ fontSize: "18px" }}>
              {tab.icon}
            </span>

            {tab.label}

          </button>

        ))}

      </div>

    </div>
  );
};

export default NavBar;