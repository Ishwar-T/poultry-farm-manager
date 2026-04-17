// src/components/Sales/SalesForm.jsx
import React from "react";

const SalesForm = ({ form, setForm, onSubmit, editingId }) => {
  const handle = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <form onSubmit={e=>{e.preventDefault(); onSubmit();}} style={{ marginBottom: 12 }}>
      <input name="type" placeholder="Type (EGG/MANURE/CULL)" value={form.type || ""} onChange={handle} required />
      <input name="totalAmount" type="number" placeholder="Total Amount" value={form.totalAmount || ""} onChange={handle} required />
      <input name="paidAmount" type="number" placeholder="Paid" value={form.paidAmount || ""} onChange={handle} />
      <input name="date" type="date" value={form.date || ""} onChange={handle} />
      <input name="notes" placeholder="Notes" value={form.notes || ""} onChange={handle} />
      <button type="submit">{editingId ? "Update" : "Save"}</button>
    </form>
  );
};

export default SalesForm;