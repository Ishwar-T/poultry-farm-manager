// src/components/Daily/DailyList.jsx
import React from "react";

const DailyList = ({ records, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Remaining Birds</th>
          <th>Feed</th>
          <th>Mortality</th>
          <th>Eggs</th>
          <th>Production %</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map(r => (
          <tr key={r.id}>
            <td>{r.recordDate}</td>
            <td>{r.totalBirds}</td>
            <td>{r.feedConsumedKg}</td>
            <td>{r.mortalityCount}</td>
            <td>{r.eggsProduced}</td>
            <td>{r.productionPercent}%</td>
            <td>
              <button onClick={()=>onEdit(r)}>Edit</button>
              <button onClick={()=>onDelete(r.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DailyList;