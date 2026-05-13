// src/components/Sales/SalesList.jsx

import React from "react";

const SalesList = ({ sales, onEdit, onDelete }) => (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 20,
      background: "white"
    }}
  >
    <thead>
      <tr style={{ background: "#f2f2f2" }}>
        <th style={thStyle}>Type</th>
        <th style={thStyle}>Total</th>
        <th style={thStyle}>Paid</th>
        <th style={thStyle}>Remaining</th>
        <th style={thStyle}>Status</th>
        <th style={thStyle}>Date</th>
        <th style={thStyle}>Notes</th>
        <th style={thStyle}>Actions</th>
      </tr>
    </thead>

    <tbody>
      {(sales || []).map((s) => (
        <tr key={s.id}>
          <td style={tdStyle}>{s.type}</td>

          <td style={tdStyle}>₹ {s.totalAmount}</td>

          <td style={tdStyle}>₹ {s.paidAmount}</td>

          <td style={tdStyle}>₹ {s.remainingAmount}</td>

          <td
            style={{
              ...tdStyle,
              color: s.paymentStatus === "PAID" ? "green" : "red",
              fontWeight: "bold"
            }}
          >
            {s.paymentStatus}
          </td>

          <td style={tdStyle}>
            {s.date ? new Date(s.date).toLocaleDateString() : ""}
          </td>

          <td style={tdStyle}>{s.notes}</td>

          <td style={tdStyle}>
            <button
              onClick={() => onEdit(s)}
              style={editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(s.id)}
              style={deleteBtn}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

const editBtn = {
  marginRight: 8,
  padding: "6px 12px",
  border: "none",
  borderRadius: 6,
  background: "#4f46e5",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "6px 12px",
  border: "none",
  borderRadius: 6,
  background: "#dc2626",
  color: "white",
  cursor: "pointer"
};

export default SalesList;