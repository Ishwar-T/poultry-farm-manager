import React, { useMemo } from "react";

const ExpenseForm = ({ formData, setFormData, onSubmit, editingId, batches = [] }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  const selectedBatch = useMemo(() => {
    return (batches || []).find(
      (b) => Number(b.id) === Number(formData.batchId)
    );
  }, [batches, formData.batchId]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      style={{ marginBottom: 12 }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <select
          name="batchId"
          value={formData.batchId || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select batch</option>
          {(batches || []).map(b => (
            <option key={b.id} value={b.id}>
              {b.name || b.id}
            </option>
          ))}
        </select>

        <input
          name="category"
          placeholder="Category"
          value={formData.category || ""}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount || ""}
          onChange={handleChange}
          required
        />

        <input
          name="date"
          type="date"
          value={formData.date || ""}
          onChange={handleChange}
          required
          min={selectedBatch?.startDate || ""}
          max={today}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          name="note"
          placeholder="Note"
          value={formData.note || ""}
          onChange={handleChange}
          style={{ width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          {editingId ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;