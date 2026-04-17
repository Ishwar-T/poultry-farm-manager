// src/components/Feed/FeedForm.jsx
import React from "react";

const FeedForm = ({ form, setForm, onSubmit, editingId }) => {

  const handle = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
      <input name="name" placeholder="Formula Name" value={form.name || ""} onChange={handle} />
      <input name="ingredient" placeholder="Ingredient" value={form.ingredient || ""} onChange={handle} />
      <input name="quantity" placeholder="Quantity" value={form.quantity || ""} onChange={handle} />

      <button type="submit">{editingId ? "Update" : "Save"}</button>
    </form>
  );
};

export default FeedForm;