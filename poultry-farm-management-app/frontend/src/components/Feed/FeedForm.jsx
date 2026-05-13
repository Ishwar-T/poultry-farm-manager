// src/components/Feed/FeedForm.jsx

import React from "react";

const FeedForm = ({ form, setForm, onSubmit, editingId }) => {

  const handle = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 TOTAL PERCENT CALCULATION
  const totalPercent =
    Number(form.maizePercent || 0) +
    Number(form.soyaPercent || 0) +
    Number(form.dorbPercent || 0) +
    Number(form.marblePercent || 0) +
    Number(form.premixPercent || 0);

  // 🔥 VALIDATION
  const isValid = totalPercent === 100;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // 🔥 BLOCK SAVE IF INVALID
        if (!isValid) {
          alert("Total percentage must be exactly 100%");
          return;
        }

        onSubmit();
      }}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >

      <h3>
        {editingId ? "Update Feed Formula" : "Create Feed Formula"}
      </h3>

      {/* FORMULA NAME */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Formula Name</h4>

        <input
          type="text"
          name="formulaName"
          placeholder="Formula Name"
          value={form.formulaName || ""}
          onChange={handle}
          style={{ padding: "8px", width: "250px" }}
        />
      </div>

      {/* MAIZE */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Maize</h4>

        <input
          type="number"
          step="0.01"
          name="maizePercent"
          placeholder="Maize %"
          value={form.maizePercent || ""}
          onChange={handle}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          step="0.01"
          name="maizePrice"
          placeholder="Maize Price"
          value={form.maizePrice || ""}
          onChange={handle}
          style={{ padding: "8px" }}
        />
      </div>

      {/* SOYA */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Soya</h4>

        <input
          type="number"
          step="0.01"
          name="soyaPercent"
          placeholder="Soya %"
          value={form.soyaPercent || ""}
          onChange={handle}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          step="0.01"
          name="soyaPrice"
          placeholder="Soya Price"
          value={form.soyaPrice || ""}
          onChange={handle}
          style={{ padding: "8px" }}
        />
      </div>

      {/* DORB */}
      <div style={{ marginBottom: "15px" }}>
        <h4>DORB</h4>

        <input
          type="number"
          step="0.01"
          name="dorbPercent"
          placeholder="DORB %"
          value={form.dorbPercent || ""}
          onChange={handle}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          step="0.01"
          name="dorbPrice"
          placeholder="DORB Price"
          value={form.dorbPrice || ""}
          onChange={handle}
          style={{ padding: "8px" }}
        />
      </div>

      {/* MARBLE */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Marble</h4>

        <input
          type="number"
          step="0.01"
          name="marblePercent"
          placeholder="Marble %"
          value={form.marblePercent || ""}
          onChange={handle}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          step="0.01"
          name="marblePrice"
          placeholder="Marble Price"
          value={form.marblePrice || ""}
          onChange={handle}
          style={{ padding: "8px" }}
        />
      </div>

      {/* PREMIX */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Premix</h4>

        <input
          type="number"
          step="0.01"
          name="premixPercent"
          placeholder="Premix %"
          value={form.premixPercent || ""}
          onChange={handle}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          step="0.01"
          name="premixPrice"
          placeholder="Premix Price"
          value={form.premixPrice || ""}
          onChange={handle}
          style={{ padding: "8px" }}
        />
      </div>

      {/* 🔥 LIVE TOTAL DISPLAY */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "8px",
          background: isValid ? "#dcfce7" : "#fee2e2",
          color: isValid ? "green" : "red",
          fontWeight: "bold",
          width: "250px"
        }}
      >
        Total Percentage: {totalPercent}%
      </div>

      {/* 🔥 SAVE BUTTON */}
      <button
        type="submit"
        disabled={!isValid}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          background: isValid ? "#2563eb" : "#9ca3af",
          color: "white",
          cursor: isValid ? "pointer" : "not-allowed"
        }}
      >
        {editingId ? "Update" : "Save"}
      </button>

    </form>
  );
};

export default FeedForm;