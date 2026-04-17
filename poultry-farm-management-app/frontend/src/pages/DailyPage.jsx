// src/pages/DailyPage.jsx
import React, { useEffect, useState } from "react";
import DailyForm from "../components/DailyRecord/DailyForm";
import DailyList from "../components/DailyRecord/DailyList";
import {
  getDailyRecords,
  createDailyRecord,
  updateDailyRecord,
  deleteDailyRecord
} from "../services/api";

const DailyPage = () => {

  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await getDailyRecords();
    setRecords(res.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    if (editingId) {
      await updateDailyRecord(editingId, form);
    } else {
      await createDailyRecord(form);
    }
    setForm({});
    setEditingId(null);
    fetchData();
  };

  const onEdit = (r) => {
    setForm(r);
    setEditingId(r.id);
  };

  const onDelete = async (id) => {
    await deleteDailyRecord(id);
    fetchData();
  };

  return (
    <div>
      <h2>Daily Records</h2>
      <DailyForm form={form} setForm={setForm} onSubmit={onSubmit} editingId={editingId} />
      <DailyList records={records} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default DailyPage;