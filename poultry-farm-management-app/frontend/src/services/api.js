// src/services/api.js
import axios from "axios";
const BASE = "http://localhost:8080/api";

export const getExpenses = () => axios.get(`${BASE}/expenses`);
export const createExpense = (data) => axios.post(`${BASE}/expenses`, data);
export const updateExpense = (id, data) => axios.put(`${BASE}/expenses/${id}`, data);
export const deleteExpense = (id) => axios.delete(`${BASE}/expenses/${id}`);

export const getBatches = () => axios.get(`${BASE}/batches`);
export const createBatch = (data) => axios.post(`${BASE}/batches`, data);
export const updateBatch = (id, data) => axios.put(`${BASE}/batches/${id}`, data);
export const deleteBatch = (id) => axios.delete(`${BASE}/batches/${id}`);

export const getSales = () => axios.get(`${BASE}/sales`);
export const createSale = (data) => axios.post(`${BASE}/sales`, data);
export const updateSale = (id, data) => axios.put(`${BASE}/sales/${id}`, data);
export const deleteSale = (id) => axios.delete(`${BASE}/sales/${id}`);

export const getDailyRecords = () => axios.get(`${BASE}/daily-records`);
export const createDailyRecord = (data) => axios.post(`${BASE}/daily-records`, data);
export const updateDailyRecord = (id, data) => axios.put(`${BASE}/daily-records/${id}`, data);
export const deleteDailyRecord = (id) => axios.delete(`${BASE}/daily-records/${id}`);

export const getFeedFormulas = () => axios.get(`${BASE}/feed-formula`);
export const createFeedFormula = (data) => axios.post(`${BASE}/feed-formula`, data);
export const updateFeedFormula = (id, data) => axios.put(`${BASE}/feed-formula/${id}`, data);
export const deleteFeedFormula = (id) => axios.delete(`${BASE}/feed-formula/${id}`);