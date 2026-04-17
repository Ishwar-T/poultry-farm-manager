// src/pages/FeedPage.jsx
import React, { useEffect, useState } from "react";
import FeedForm from "../components/Feed/FeedForm";
import FeedList from "../components/Feed/FeedList";
import {
  getFeedFormulas,
  createFeedFormula,
  updateFeedFormula,
  deleteFeedFormula
} from "../services/api";

const FeedPage = () => {

  const [feeds, setFeeds] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await getFeedFormulas();
    setFeeds(Array.isArray(res.data) ? res.data : []);  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    if (editingId) {
      await updateFeedFormula(editingId, form);
    } else {
      await createFeedFormula(form);
    }
    setForm({});
    setEditingId(null);
    fetchData();
  };

  const onEdit = (f) => {
    setForm(f);
    setEditingId(f.id);
  };

  const onDelete = async (id) => {
    await deleteFeedFormula(id);
    fetchData();
  };

  return (
    <div>
      <h2>Feed Formula</h2>
      <FeedForm form={form} setForm={setForm} onSubmit={onSubmit} editingId={editingId} />
      <FeedList feeds={feeds} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default FeedPage;