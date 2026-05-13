// src/components/Daily/DailyForm.jsx

import React from "react";

const DailyForm = ({
  form,
  setForm,
  onSubmit,
  editingId,
  batches = []
}) => {

  const handle = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (

    <form
      onSubmit={(e) => {

        e.preventDefault();

        onSubmit();
      }}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}
    >

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >

        {/* 🔥 BATCH SELECT */}
        <select
          name="batchId"
          value={form.batchId || ""}
          onChange={handle}
          required
          style={inputStyle}
        >

          <option value="">
            Select Batch
          </option>

          {(batches || []).map((b) => (

            <option
              key={b.id}
              value={b.id}
            >
              {b.name || `Batch ${b.id}`}
            </option>

          ))}

        </select>

        {/* DATE */}
        <input
          name="recordDate"
          type="date"
          value={form.recordDate || ""}
          onChange={handle}
          required
          style={inputStyle}
        />

        {/* TOTAL BIRDS */}
        <input
          name="totalBirds"
          type="number"
          placeholder="Total Birds"
          value={form.totalBirds || ""}
          onChange={handle}
          style={inputStyle}
        />

        {/* FEED */}
        <input
          name="feedConsumedKg"
          type="number"
          placeholder="Feed (kg)"
          value={form.feedConsumedKg || ""}
          onChange={handle}
          style={inputStyle}
        />

        {/* MORTALITY */}
        <input
          name="mortalityCount"
          type="number"
          placeholder="Mortality"
          value={form.mortalityCount || ""}
          onChange={handle}
          style={inputStyle}
        />

        {/* EGGS */}
        <input
          name="eggsProduced"
          type="number"
          placeholder="Eggs Produced"
          value={form.eggsProduced || ""}
          onChange={handle}
          style={inputStyle}
        />

      </div>

      {/* BUTTON */}
      <div style={{ marginTop: "15px" }}>

        <button
          type="submit"
          style={buttonStyle}
        >
          {editingId
            ? "Update Record"
            : "Save Record"}
        </button>

      </div>

    </form>
  );
};

// 🔥 STYLES

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minWidth: "180px"
};

const buttonStyle = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

export default DailyForm;