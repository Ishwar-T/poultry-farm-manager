// src/pages/BatchPage.jsx
import React, { useEffect, useState } from "react";
import BatchForm from "../components/Batch/BatchForm";
import BatchList from "../components/Batch/BatchList";
import { getBatches,getDailyRecords,createBatch, updateBatch, deleteBatch } from "../services/api";

const BatchPage = () => {
  const [batches, setBatches] = useState([]);
  const [dailyRecords, setDailyRecords] = useState([]);
  const [batchForm, setBatchForm] = useState({ name: "", totalBirds: "", mortality: "", startDate: new Date().toISOString().split("T")[0], breed: "" });
  const [batchEditId, setBatchEditId] = useState(null);

  const fetchBatches = async () => {
    try { const res = await getBatches(); setBatches(res.data || []); } catch (err) { console.error(err); }
  };

  useEffect(() => {

    fetchBatches();

    fetchDailyRecords();

  }, []);

  const onSubmit = async () => {
    try {
      if (batchEditId) { await updateBatch(batchEditId, batchForm); setBatchEditId(null); }
      else { await createBatch(batchForm); }
      setBatchForm({ name: "", totalBirds: "", mortality: "", startDate: new Date().toISOString().split("T")[0], breed: "" });
      fetchBatches();
    } catch (err) { console.error(err); alert("Error saving batch"); }
  };

  const onEdit = (b) => { setBatchForm({ ...b }); setBatchEditId(b.id); };
  const onDelete = async (id) => { if (confirm("Delete batch?")) { await deleteBatch(id); fetchBatches(); } };

  const fetchDailyRecords = async () => {

    try {

      const res = await getDailyRecords();

      setDailyRecords(res.data || []);

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <div>
      <h2>Batches</h2>
      <BatchForm batchForm={batchForm} setBatchForm={setBatchForm} onSubmit={onSubmit} editingId={batchEditId} />
      <BatchList
          batches={batches}
          dailyRecords={dailyRecords}
          onEdit={onEdit}
          onDelete={onDelete}
        />
    </div>
  );
};

export default BatchPage;