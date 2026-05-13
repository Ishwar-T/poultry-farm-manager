// src/pages/SalesPage.jsx

import React, { useEffect, useState } from "react";

import SalesForm from "../components/Sales/SalesForm";
import SalesList from "../components/Sales/SalesList";

import {
  getSales,
  createSale,
  updateSale,
  deleteSale,
  getBatches
} from "../services/api";

const SalesPage = () => {

  const [sales, setSales] = useState([]);

  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    batchId: "",
    type: "",
    totalAmount: "",
    paidAmount: "",
    date: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH SALES
  const fetchSales = async () => {

    try {

      const res = await getSales();

      setSales(res.data || []);

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

    fetchSales();

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

        await updateSale(editingId, form);

      } else {

        await createSale(form);
      }

      // RESET
      setForm({
        batchId: "",
        type: "",
        totalAmount: "",
        paidAmount: "",
        date: "",
        notes: ""
      });

      setEditingId(null);

      fetchSales();

    } catch (err) {

      console.error(err);

      alert("Error saving sale");
    }
  };

  // 🔥 EDIT
  const onEdit = (s) => {

    setForm({

      batchId: s.batchId || "",

      type: s.type || "",

      totalAmount: s.totalAmount || "",

      paidAmount: s.paidAmount || "",

      date: s.date
        ? s.date.split("T")[0]
        : "",

      notes: s.notes || ""
    });

    setEditingId(s.id);
  };

  // 🔥 DELETE
  const onDelete = async (id) => {

    if (confirm("Delete sale?")) {

      await deleteSale(id);

      fetchSales();
    }
  };

  return (

    <div>

      <h2>Sales</h2>

      <SalesForm
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        editingId={editingId}
        batches={batches}
      />

      <SalesList
        sales={sales}
        batches={batches}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
};

export default SalesPage;