// src/pages/SalesPage.jsx
import React, { useEffect, useState } from "react";
import SalesForm from "../components/Sales/SalesForm";
import SalesList from "../components/Sales/SalesList";
import { getSales, createSale, updateSale, deleteSale } from "../services/api";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ type: "", totalAmount: "", paidAmount: "", date: "", notes: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchSales = async () => {
    try { const res = await getSales(); setSales(res.data || []); } catch (err) { console.error(err); }
  };

  useEffect(()=>{ fetchSales(); }, []);

  const onSubmit = async () => {
    try {
      if (editingId) await updateSale(editingId, form);
      else await createSale(form);
      setForm({ type: "", totalAmount: "", paidAmount: "", date: "", notes: "" });
      setEditingId(null);
      fetchSales();
    } catch (err) { console.error(err); alert("Error saving sale"); }
  };

  const onEdit = (s) => { setForm({ ...s }); setEditingId(s.id); };
  const onDelete = async (id) => { if (confirm("Delete sale?")) { await deleteSale(id); fetchSales(); } };

  return (
    <div>
      <h2>Sales</h2>
      <SalesForm form={form} setForm={setForm} onSubmit={onSubmit} editingId={editingId} />
      <SalesList sales={sales} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default SalesPage;