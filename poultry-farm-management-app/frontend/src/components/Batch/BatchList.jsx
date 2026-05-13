// src/components/Batch/BatchList.jsx

import React, { useState } from "react";

const BatchList = ({
  batches,
  onEdit,
  onDelete
}) => {

  // 🔥 SEARCH STATE
  const [search, setSearch] = useState("");

  // 🔥 FILTERED DATA
  const filteredBatches = (batches || []).filter(
    (b) =>

      b.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      b.breed
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div
      style={{
        marginTop: "20px"
      }}
    >

      {/* 🔥 SEARCH BAR */}
      <div
        style={{
          marginBottom: "15px"
        }}
      >

        <input
          type="text"
          placeholder="Search batch by name or breed..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            fontSize: "15px",
            outline: "none"
          }}
        />

      </div>

      {/* 🔥 TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)"
        }}
      >

        <thead>

          <tr
            style={{
              background: "#1e293b",
              color: "white"
            }}
          >

            <th style={thStyle}>
              Batch Name
            </th>

            <th style={thStyle}>
              Birds
            </th>

            <th style={thStyle}>
              Mortality
            </th>

            <th style={thStyle}>
              Start Date
            </th>

            <th style={thStyle}>
              Breed
            </th>

            <th style={thStyle}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredBatches.length > 0 ? (

            filteredBatches.map((b, index) => (

              <tr
                key={b.id}
                style={{
                  background:
                    index % 2 === 0
                      ? "#f8fafc"
                      : "white",

                  transition: "0.2s"
                }}
              >

                <td style={tdStyle}>
                  {b.name}
                </td>

                <td style={tdStyle}>
                  {b.totalBirds}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color:
                      b.mortality > 0
                        ? "#dc2626"
                        : "#16a34a",
                    fontWeight: "bold"
                  }}
                >
                  {b.mortality}
                </td>

                <td style={tdStyle}>
                  {b.startDate}
                </td>

                <td style={tdStyle}>
                  {b.breed}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() => onEdit(b)}
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(b.id)
                    }
                    style={deleteBtn}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#64748b"
                }}
              >
                No batches found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

// 🔥 STYLES

const thStyle = {
  padding: "14px",
  textAlign: "left",
  fontSize: "15px"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0"
};

const editBtn = {
  padding: "8px 14px",
  marginRight: "8px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer"
};

export default BatchList;