// src/components/Daily/DailyForm.jsx
import React from "react";

const DailyForm = ({ form, setForm, onSubmit, editingId }) => {
  const handle = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
      <input name="recordDate" type="date" value={form.recordDate || ""} onChange={handle} required />
      <input name="totalBirds" placeholder="Total Birds" value={form.totalBirds || ""} onChange={handle} />
      <input name="feedConsumedKg" placeholder="Feed (kg)" value={form.feedConsumedKg || ""} onChange={handle} />
      <input name="mortalityCount" placeholder="Mortality" value={form.mortalityCount || ""} onChange={handle} />
      <input name="eggsProduced" placeholder="Eggs" value={form.eggsProduced || ""} onChange={handle} />

      <button type="submit">{editingId ? "Update" : "Save"}</button>
    </form>
  );
};

export default DailyForm;