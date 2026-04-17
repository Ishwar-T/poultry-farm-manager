// src/components/Batch/BatchList.jsx
import React from "react";

const BatchList = ({ batches, onEdit, onDelete }) => (
  <table style={{ width: "100%" }}>
    <thead><tr><th>Name</th><th>Birds</th><th>Mortality</th><th>Start</th><th>Breed</th><th>Actions</th></tr></thead>
    <tbody>
      {(batches || []).map(b => (
        <tr key={b.id}>
          <td>{b.name}</td>
          <td>{b.totalBirds}</td>
          <td>{b.mortality}</td>
          <td>{b.startDate}</td>
          <td>{b.breed}</td>
          <td><button onClick={() => onEdit(b)}>Edit</button> <button onClick={() => onDelete(b.id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BatchList;