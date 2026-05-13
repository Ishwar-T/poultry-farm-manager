// src/components/Sales/SalesForm.jsx

import React from "react";

const SalesForm = ({
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
        marginBottom: 20,
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
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

        {/* TYPE */}
        <input
          name="type"
          placeholder="Type (EGG/MANURE/CULL)"
          value={form.type || ""}
          onChange={handle}
          required
          style={inputStyle}
        />

        {/* TOTAL */}
        <input
          name="totalAmount"
          type="number"
          placeholder="Total Amount"
          value={form.totalAmount || ""}
          onChange={handle}
          required
          style={inputStyle}
        />

        {/* PAID */}
        <input
          name="paidAmount"
          type="number"
          placeholder="Paid Amount"
          value={form.paidAmount || ""}
          onChange={handle}
          style={inputStyle}
        />

        {/* DATE */}
        <input
          name="date"
          type="date"
          value={form.date || ""}
          onChange={handle}
          style={inputStyle}
        />

      </div>

      {/* NOTES */}
      <div style={{ marginTop: "12px" }}>

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes || ""}
          onChange={handle}
          style={{
            ...inputStyle,
            width: "60%"
          }}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          {editingId ? "Update Sale" : "Save Sale"}
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
  marginLeft: "10px",
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

export default SalesForm;