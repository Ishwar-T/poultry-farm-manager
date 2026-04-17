// src/components/Card.jsx
import React from "react";

const Card = ({ title, value, children }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 12,
      borderRadius: 8,
      minWidth: 160,
      boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
    }}>
      <h4 style={{ margin: "0 0 8px 0" }}>{title}</h4>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>{value}</div>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
};

export default Card;