import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [sales, setSales] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const [formula, setFormula] = useState({
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
  });

  const [form, setForm] = useState({
    category: "",
    amount: "",
    note: "",
    date: "",
    batchId: "",
  });

  const [batchForm, setBatchForm] = useState({
    name: "",
    totalBirds: "",
    mortality: "",
  });

  // 📊 calculations
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const totalSales = sales.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const profit = totalSales - total;

  // 📥 API calls
  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:8080/api/expenses");
    setExpenses(res.data);
  };

  const fetchSales = async () => {
    const res = await axios.get("http://localhost:8080/api/sales");
    setSales(res.data);
  };

  const fetchBatches = async () => {
    const res = await axios.get("http://localhost:8080/api/batches");
    setBatches(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSales();
    fetchBatches();
  }, []);

  // ➕ Add Expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.batchId) {
      alert("All fields fill कर (including batch)");
      return;
    }

    await axios.post("http://localhost:8080/api/expenses", {
      ...form,
      amount: Number(form.amount),
      batchId: Number(form.batchId),
    });

    setForm({
      category: "",
      amount: "",
      note: "",
      date: "",
      batchId: "",
    });

    fetchExpenses();
  };

  // ❌ Delete Expense
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/expenses/${id}`);
    fetchExpenses();
  };

  // ➕ Add Batch
  const handleBatchSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/batches", {
      ...batchForm,
      totalBirds: Number(batchForm.totalBirds),
      mortality: Number(batchForm.mortality),
    });

    setBatchForm({
      name: "",
      totalBirds: "",
      mortality: "",
    });

    fetchBatches();
  };

  // ✅ Feed Formula Submit (FIXED POSITION)
  const handleFormulaSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/feed-formula", formula);

    alert("Formula Saved!");

    setFormula({
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
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Poultry Expense Tracker 🐔</h1>

      {/* EXPENSE FORM */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />

        <select value={form.batchId} onChange={(e) => {
          setSelectedBatch(e.target.value);
          setForm({ ...form, batchId: e.target.value });
        }}>
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <input placeholder="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <button>Add Expense</button>
      </form>

      {/* DASHBOARD */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}><h3>Expense</h3><p>₹{total}</p></div>
        <div style={cardStyle}><h3>Sales</h3><p>₹{totalSales}</p></div>
        <div style={cardStyle}><h3>Profit</h3>
          <p style={{ color: profit >= 0 ? "green" : "red" }}>₹{profit}</p>
        </div>
      </div>

      {/* EXPENSE LIST */}
      <h2>Expenses</h2>
      <ul>
        {expenses
          .filter((e) => !selectedBatch || e.batchId == selectedBatch)
          .map((e) => (
            <li key={e.id}>
              {e.category} - ₹{e.amount}
              <button onClick={() => handleDelete(e.id)}>Delete</button>
            </li>
          ))}
      </ul>

      {/* SALES LIST */}
      <h2>Sales</h2>
      <ul>
        {sales.map((s) => (
          <li key={s.id}>{s.category} - ₹{s.amount}</li>
        ))}
      </ul>

      {/* BATCH FORM */}
      <h2>Batches</h2>
      <form onSubmit={handleBatchSubmit}>
        <input placeholder="Batch Name" value={batchForm.name} onChange={(e) => setBatchForm({ ...batchForm, name: e.target.value })} />
        <input placeholder="Total Birds" type="number" value={batchForm.totalBirds} onChange={(e) => setBatchForm({ ...batchForm, totalBirds: e.target.value })} />
        <input placeholder="Mortality" type="number" value={batchForm.mortality} onChange={(e) => setBatchForm({ ...batchForm, mortality: e.target.value })} />
        <button>Add Batch</button>
      </form>

      {/* FEED FORMULA */}
      <h2>Feed Formula</h2>
      <form onSubmit={handleFormulaSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <input placeholder="Maize %" onChange={(e) => setFormula({ ...formula, maizePercent: e.target.value })} />
        <input placeholder="Maize Price" onChange={(e) => setFormula({ ...formula, maizePrice: e.target.value })} />

        <input placeholder="Soya %" onChange={(e) => setFormula({ ...formula, soyaPercent: e.target.value })} />
        <input placeholder="Soya Price" onChange={(e) => setFormula({ ...formula, soyaPrice: e.target.value })} />

        <input placeholder="Dorb %" onChange={(e) => setFormula({ ...formula, dorbPercent: e.target.value })} />
        <input placeholder="Dorb Price" onChange={(e) => setFormula({ ...formula, dorbPrice: e.target.value })} />

        <input placeholder="Marble %" onChange={(e) => setFormula({ ...formula, marblePercent: e.target.value })} />
        <input placeholder="Marble Price" onChange={(e) => setFormula({ ...formula, marblePrice: e.target.value })} />

        <input placeholder="Premix %" onChange={(e) => setFormula({ ...formula, premixPercent: e.target.value })} />
        <input placeholder="Premix Price" onChange={(e) => setFormula({ ...formula, premixPrice: e.target.value })} />

        <button>Save Formula</button>
      </form>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "10px",
};

export default App;