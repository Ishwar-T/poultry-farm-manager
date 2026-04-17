// src/components/Sales/SalesList.jsx
import React from "react";

const SalesList = ({ sales, onEdit, onDelete }) => (
  <table style={{ width: "100%" }}>
    <thead><tr><th>Type</th><th>Total</th><th>Paid</th><th>Date</th><th>Notes</th><th>Actions</th></tr></thead>
    <tbody>
      {(sales || []).map(s => (
        <tr key={s.id}>
          <td>{s.type}</td>
          <td>{s.totalAmount}</td>
          <td>{s.paidAmount}</td>
          <td>{s.date}</td>
          <td>{s.notes}</td>
          <td><button onClick={() => onEdit(s)}>Edit</button><button onClick={() => onDelete(s.id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SalesList;