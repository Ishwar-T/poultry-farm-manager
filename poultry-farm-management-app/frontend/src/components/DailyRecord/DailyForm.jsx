import React, { useEffect, useMemo } from "react";

const DailyForm = ({
  form,
  setForm,
  onSubmit,
  editingId,
  batches = [],
  records = []
}) => {

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // 🔥 HANDLE INPUT
  const handle = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 🔥 SELECTED BATCH
  const selectedBatch = useMemo(() => {

    return (batches || []).find(
      (b) => Number(b.id) === Number(form.batchId)
    );

  }, [batches, form.batchId]);

  // 🔥 PREVIOUS MORTALITY
  const previousMortality = useMemo(() => {

    return (records || [])

      .filter((r) => {

        const sameBatch =
          Number(r.batchId) === Number(form.batchId);

        const notCurrentEdit =
          !editingId || Number(r.id) !== Number(editingId);

        return sameBatch && notCurrentEdit;

      })

      .reduce(

        (sum, r) =>
          sum + Number(r.mortalityCount || 0),

        0
      );

  }, [records, form.batchId, editingId]);

  // 🔥 AUTO REMAINING
  const remainingBirds = Math.max(

    0,

    Number(selectedBatch?.totalBirds || 0)

    - previousMortality

    - Number(form.mortalityCount || 0)
  );

  // 🔥 AUTO UPDATE FORM
  useEffect(() => {

    setForm((prev) => ({
      ...prev,
      totalBirds: remainingBirds
    }));

  }, [remainingBirds]);

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

        {/* BATCH */}
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
              {b.name}
            </option>

          ))}

        </select>

        {/* DATE */}
        <input
          name="recordDate"
          type="date"
          value={form.recordDate || ""}
          onChange={handle}
          min={selectedBatch?.startDate || ""}
          max={today}
          required
          style={inputStyle}
        />

        {/* REMAINING BIRDS */}
        <input
          value={form.totalBirds || ""}
          readOnly
          placeholder="Remaining Birds"
          style={{
            ...inputStyle,
            background: "#f3f4f6"
          }}
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

      <button
        type="submit"
        style={buttonStyle}
      >
        {editingId
          ? "Update Record"
          : "Save Record"}
      </button>

    </form>
  );
};

// 🔥 STYLES

const inputStyle = {

  padding: "10px",

  border: "1px solid #ccc",

  borderRadius: "6px",

  minWidth: "180px"
};

const buttonStyle = {

  padding: "10px 20px",

  background: "#2563eb",

  color: "white",

  border: "none",

  borderRadius: "6px",

  marginTop: "15px",

  cursor: "pointer"
};

export default DailyForm;