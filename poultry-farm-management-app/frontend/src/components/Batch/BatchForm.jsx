// src/components/Batch/BatchForm.jsx
import React from "react";

const BatchForm = ({ batchForm, setBatchForm, onSubmit, editingId }) => {
  const handle = (e) => setBatchForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit();}} style={{ marginBottom: 12 }}>
      <input name="name" placeholder="Name" value={batchForm.name || ""} onChange={handle} required />
      <input name="totalBirds" placeholder="Total Birds" type="number" value={batchForm.totalBirds || ""} onChange={handle} required />
      <input name="mortality" placeholder="Mortality" type="number" value={batchForm.mortality || ""} onChange={handle} />
      <input name="startDate" type="date" value={batchForm.startDate || ""} onChange={handle} required />
      <input name="breed" placeholder="Breed" value={batchForm.breed || ""} onChange={handle} />
      <button type="submit">{editingId ? "Update" : "Save"}</button>
    </form>
  );
};

export default BatchForm;