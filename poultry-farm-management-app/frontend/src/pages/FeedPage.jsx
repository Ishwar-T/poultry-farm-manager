// src/pages/FeedPage.jsx

import React, { useEffect, useState } from "react";

import FeedForm from "../components/Feed/FeedForm";
import FeedList from "../components/Feed/FeedList";

import {
  getFeedFormulas,
  createFeedFormula,
  updateFeedFormula,
  deleteFeedFormula,
} from "../services/api";

const FeedPage = () => {

  const emptyForm = {
    formulaName: "",

    maizePercent: "",
    maizePrice: "",

    soyaPercent: "",
    soyaPrice: "",

    dorbPercent: "",
    dorbPrice: "",

    marblePercent: "",
    marblePrice: "",

    premixPercent: "",
    premixPrice: "",
  };

  const [feeds, setFeeds] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {

      const res = await getFeedFormulas();

      console.log(res.data);

      setFeeds(Array.isArray(res.data) ? res.data : [res.data]);

    } catch (error) {

      console.error("Error fetching feed formulas", error);

      setFeeds([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {

    try {

      const payload = {
        formulaName: form.formulaName,

        maizePercent: Number(form.maizePercent) || 0,
        maizePrice: Number(form.maizePrice) || 0,

        soyaPercent: Number(form.soyaPercent) || 0,
        soyaPrice: Number(form.soyaPrice) || 0,

        dorbPercent: Number(form.dorbPercent) || 0,
        dorbPrice: Number(form.dorbPrice) || 0,

        marblePercent: Number(form.marblePercent) || 0,
        marblePrice: Number(form.marblePrice) || 0,

        premixPercent: Number(form.premixPercent) || 0,
        premixPrice: Number(form.premixPrice) || 0,
      };
      console.log(payload);

      if (editingId) {
        await updateFeedFormula(editingId, payload);
      } else {
        await createFeedFormula(payload);
      }

      setForm(emptyForm);
      setEditingId(null);

      fetchData();

    } catch (error) {
      console.error("Error saving feed formula", error);
    }
  };

  const onEdit = (feed) => {
    setForm(feed);
    setEditingId(feed.id);
  };

  const onDelete = async (id) => {

    try {
      await deleteFeedFormula(id);
      fetchData();

    } catch (error) {
      console.error("Error deleting feed formula", error);
    }
  };

  return (
    <div>

      <h2>Feed Formula Management</h2>

      <FeedForm
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        editingId={editingId}
      />

      <FeedList
        feeds={feeds}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
};

export default FeedPage;