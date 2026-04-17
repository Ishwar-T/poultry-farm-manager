// src/components/Expense/ExpenseList.jsx
import React from "react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Date</th><th>Category</th><th>Amount</th><th>Note</th><th>Batch</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { (expenses || []).map(exp => (
          <tr key={exp.id}>
            <td>{exp.date}</td>
            <td>{exp.category}</td>
            <td>{exp.amount}</td>
            <td>{exp.note}</td>
            <td>{exp.batchId}</td>
            <td>
              <button onClick={() => onEdit(exp)}>Edit</button>
              <button onClick={() => onDelete(exp.id)} style={{ marginLeft: 6 }}>Delete</button>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default ExpenseList;