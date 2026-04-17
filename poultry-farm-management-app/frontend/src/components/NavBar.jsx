import React from "react";

const NavBar = ({ active, setActive }) => {
  return (
    <div style={{
      display: "flex",
      gap: "10px",
      padding: "10px",
      background: "#1e293b",
      borderRadius: "8px"
    }}>
      {["dashboard","expenses","batches","sales","daily","feed"].map(tab => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          style={{
            background: active === tab ? "#4f46e5" : "#334155"
          }}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default NavBar;