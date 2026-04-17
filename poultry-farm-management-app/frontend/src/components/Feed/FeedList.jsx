// src/components/Feed/FeedList.jsx
import React from "react";

const FeedList = ({ feeds, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ingredient</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {feeds.map(f => (
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.ingredient}</td>
            <td>{f.quantity}</td>
            <td>
              <button onClick={()=>onEdit(f)}>Edit</button>
              <button onClick={()=>onDelete(f.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedList;