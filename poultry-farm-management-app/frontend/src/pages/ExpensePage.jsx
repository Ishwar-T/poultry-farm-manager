// src/pages/ExpensePage.jsx
import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseList from "../components/Expense/ExpenseList";
import { getExpenses, createExpense, updateExpense, deleteExpense, getBatches } from "../services/api";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ batchId: "", category: "", amount: "", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [batches, setBatches] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data || []);
    } catch (err) { console.error("fetchExpenses", err); }
  };

  const fetchBatches = async () => {
    try {
      const res = await getBatches();
      setBatches(res.data || []);
    } catch (err) { console.error("fetchBatches", err); }
  };

  useEffect(() => {
    fetchExpenses();
    fetchBatches();
  }, []);

  const onSubmit = async () => {
    try {
      if (!formData.batchId) { alert("Select batch"); return; }
      if (editingId) {
        await updateExpense(editingId, formData);
      } else {
        await createExpense(formData);
      }
      setFormData({ batchId: "", category: "", amount: "", date: "" });
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error("save expense", err);
      alert("Error saving");
    }
  };

  const onEdit = (exp) => { setFormData({ ...exp }); setEditingId(exp.id); };
  const onDelete = async (id) => { if (confirm("Delete?")) { await deleteExpense(id); fetchExpenses(); } };

  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} editingId={editingId} batches={batches} />
      <ExpenseList expenses={expenses} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default ExpensePage;