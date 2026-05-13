import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});


// ================= BATCH =================

export const getBatches = () => API.get("/batches");

export const createBatch = (data) => API.post("/batches", data);

export const updateBatch = (id, data) =>
  API.put(`/batches/${id}`, data);

export const deleteBatch = (id) =>
  API.delete(`/batches/${id}`);


// ================= EXPENSE =================

export const getExpenses = () => API.get("/expenses");

export const createExpense = (data) =>
  API.post("/expenses", data);

export const updateExpense = (id, data) =>
  API.put(`/expenses/${id}`, data);

export const deleteExpense = (id) =>
  API.delete(`/expenses/${id}`);


// ================= SALES =================

export const getSales = () => API.get("/sales");

export const createSale = (data) =>
  API.post("/sales", data);

export const updateSale = (id, data) =>
  API.put(`/sales/${id}`, data);

export const deleteSale = (id) =>
  API.delete(`/sales/${id}`);


// ================= DAILY =================

export const getDailyRecords = () =>
  API.get("/daily-records");

export const createDailyRecord = (data) =>
  API.post("/daily-records", data);

export const updateDailyRecord = (id, data) =>
  API.put(`/daily-records/${id}`, data);

export const deleteDailyRecord = (id) =>
  API.delete(`/daily-records/${id}`);


// ================= FEED =================

export const getFeedFormulas = () =>
  API.get("/feed-formulas");

export const createFeedFormula = (data) =>
  API.post("/feed-formulas", data);

export const updateFeedFormula = (id, data) =>
  API.put(`/feed-formulas/${id}`, data);

export const deleteFeedFormula = (id) =>
  API.delete(`/feed-formulas/${id}`);