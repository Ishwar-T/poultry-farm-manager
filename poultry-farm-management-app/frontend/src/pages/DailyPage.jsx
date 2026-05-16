// src/pages/DailyPage.jsx

import React, { useEffect, useState } from "react";

import DailyForm from "../components/DailyRecord/DailyForm";
import DailyList from "../components/DailyRecord/DailyList";

import {
  getDailyRecords,
  createDailyRecord,
  updateDailyRecord,
  deleteDailyRecord,
  getBatches
} from "../services/api";

const DailyPage = () => {

  const [records, setRecords] = useState([]);

  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    batchId: "",
    recordDate: "",
    totalBirds: "",
    feedConsumedKg: "",
    mortalityCount: "",
    eggsProduced: ""
  });

  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH DAILY RECORDS
  const fetchData = async () => {

    try {

      const res = await getDailyRecords();

      setRecords(res.data || []);

    } catch (err) {

      console.error(err);
    }
  };

  // 🔥 FETCH BATCHES
  const fetchBatches = async () => {

    try {

      const res = await getBatches();

      setBatches(res.data || []);

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchData();

    fetchBatches();

  }, []);

  // 🔥 SUBMIT
  const onSubmit = async () => {

    try {

      // VALIDATION
      if (!form.batchId) {

        alert("Select batch");

        return;
      }

      if (editingId) {

        await updateDailyRecord(
          editingId,
          form
        );

      } else {

        await createDailyRecord(form);
      }

      // RESET
      setForm({
        batchId: "",
        recordDate: "",
        totalBirds: "",
        feedConsumedKg: "",
        mortalityCount: "",
        eggsProduced: ""
      });

      setEditingId(null);

      fetchData();

    } catch (err) {

      console.error(err);

      alert("Error saving record");
    }
  };

  // 🔥 EDIT
  const onEdit = (r) => {

    setForm({
      ...r,

      recordDate: r.recordDate
        ? r.recordDate.split("T")[0]
        : ""
    });

    setEditingId(r.id);
  };

  // 🔥 DELETE
  const onDelete = async (id) => {

    if (confirm("Delete record?")) {

      await deleteDailyRecord(id);

      fetchData();
    }
  };

  return (

    <div>

      <h2>Daily Records</h2>

      <DailyForm
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        editingId={editingId}
        batches={batches}
        records={records}
      />

      <DailyList
        records={records}
        batches={batches}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
};

export default DailyPage;