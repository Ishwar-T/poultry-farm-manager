import { useState, useEffect } from "react";
import axios from "axios";

/*
  Final merged App.jsx
  - Expenses (add/delete)
  - Batches (add/edit/delete)
  - Feed Formula (save + fetch latest)
  - Sales (Egg / Manure / Cull) with Add / Edit / Delete, auto calculations, payment status
  - Summary cards (Expense / Sales / Profit)
  - Small UI improvements
*/

function App() {
  // ---- Shared app states ----
  const [expenses, setExpenses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sales, setSales] = useState([]);
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  // ---- Expense form ----
  const [expenseForm, setExpenseForm] = useState({
    category: "",
    amount: "",
    note: "",
    date: "",
    batchId: "",
  });

  // ---- Batch form ----
  const [batchForm, setBatchForm] = useState({
    name: "",
    totalBirds: "",
    mortality: "",
  });
  const [batchEditId, setBatchEditId] = useState(null);

  // ---- Feed formula ----
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
  const [savingFormula, setSavingFormula] = useState(false);

  // ---- Sales form ----
  const [saleType, setSaleType] = useState("EGG"); // EGG | MANURE | CULL
  const [saleForm, setSaleForm] = useState({
    days: "",
    totalEggs: "",
    ratePerEgg: "",
    totalKg: "",
    ratePerKg: "",
    buyerName: "",
    totalBirds: "",
    avgWeight: "",
    ratePerBird: "",
    paidAmount: "",
    paymentMode: "CASH",
  });
  const [saleEditId, setSaleEditId] = useState(null);

  // ---- Derived totals ----
  const totalExpense = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalSales = sales.reduce((s, e) => s + Number(e.totalAmount || 0), 0);
  const profit = totalSales - totalExpense;

  // ---- On load fetch data ----
  useEffect(() => {
    fetchExpenses();
    fetchBatches();
    fetchSales();
    fetchFormula();
  }, []);

  // ----------------- API Calls -----------------
  // Expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/expenses");
      setExpenses(res.data || []);
    } catch (err) {
      console.error("fetchExpenses", err);
    }
  };
  const addExpense = async (e) => {
    e.preventDefault();
    if (!expenseForm.category || !expenseForm.amount) return alert("Fill category & amount");
    try {
      await axios.post("http://localhost:8080/api/expenses", {
        ...expenseForm,
        amount: Number(expenseForm.amount),
        batchId: expenseForm.batchId ? Number(expenseForm.batchId) : null,
      });
      setExpenseForm({ category: "", amount: "", note: "", date: "", batchId: "" });
      fetchExpenses();
    } catch (err) {
      console.error("addExpense", err);
      alert("Error saving expense");
    }
  };
  const deleteExpense = async (id) => {
    if (!confirm("Delete this expense?")) return;
    await axios.delete(`http://localhost:8080/api/expenses/${id}`);
    fetchExpenses();
  };

  // Batches
  const fetchBatches = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/batches");
      setBatches(res.data || []);
    } catch (err) {
      console.error("fetchBatches", err);
    }
  };
  const submitBatch = async (e) => {
    e.preventDefault();
    try {
      if (batchEditId) {
        await axios.put(`http://localhost:8080/api/batches/${batchEditId}`, batchForm);
        setBatchEditId(null);
      } else {
        await axios.post("http://localhost:8080/api/batches", batchForm);
      }
      setBatchForm({ name: "", totalBirds: "", mortality: "" });
      fetchBatches();
    } catch (err) {
      console.error("submitBatch", err);
      alert("Error saving batch");
    }
  };
  const deleteBatch = async (id) => {
    if (!confirm("Delete this batch?")) return;
    await axios.delete(`http://localhost:8080/api/batches/${id}`);
    fetchBatches();
  };
  const editBatch = (b) => {
    setBatchEditId(b.id);
    setBatchForm({
      name: b.name || "",
      totalBirds: b.totalBirds || "",
      mortality: b.mortality || "",
    });
  };

  // Feed formula
  const fetchFormula = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/feed-formula");
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        // find last non-empty record (skip garbage zeros)
        const latest = data
          .slice()
          .reverse()
          .find((f) => (f.maizePercent || f.soyaPercent || f.dorbPercent || f.marblePercent || f.premixPercent));
        const src = latest || data[data.length - 1] || {};
        setFormula({
          maizePercent: src.maizePercent ?? "",
          maizePrice: src.maizePrice ?? "",
          soyaPercent: src.soyaPercent ?? "",
          soyaPrice: src.soyaPrice ?? "",
          dorbPercent: src.dorbPercent ?? "",
          dorbPrice: src.dorbPrice ?? "",
          marblePercent: src.marblePercent ?? "",
          marblePrice: src.marblePrice ?? "",
          premixPercent: src.premixPercent ?? "",
          premixPrice: src.premixPrice ?? "",
        });
      } else if (data && typeof data === "object") {
        // if backend returns single object
        const src = data;
        setFormula({
          maizePercent: src.maizePercent ?? "",
          maizePrice: src.maizePrice ?? "",
          soyaPercent: src.soyaPercent ?? "",
          soyaPrice: src.soyaPrice ?? "",
          dorbPercent: src.dorbPercent ?? "",
          dorbPrice: src.dorbPrice ?? "",
          marblePercent: src.marblePercent ?? "",
          marblePrice: src.marblePrice ?? "",
          premixPercent: src.premixPercent ?? "",
          premixPrice: src.premixPrice ?? "",
        });
      }
    } catch (err) {
      console.error("fetchFormula", err);
    }
  };
  const saveFormula = async (e) => {
    e.preventDefault();
    setSavingFormula(true);
    try {
      // convert to numbers
      await axios.post("http://localhost:8080/api/feed-formula", {
        maizePercent: Number(formula.maizePercent || 0),
        maizePrice: Number(formula.maizePrice || 0),
        soyaPercent: Number(formula.soyaPercent || 0),
        soyaPrice: Number(formula.soyaPrice || 0),
        dorbPercent: Number(formula.dorbPercent || 0),
        dorbPrice: Number(formula.dorbPrice || 0),
        marblePercent: Number(formula.marblePercent || 0),
        marblePrice: Number(formula.marblePrice || 0),
        premixPercent: Number(formula.premixPercent || 0),
        premixPrice: Number(formula.premixPrice || 0),
      });
      await fetchFormula();
      alert("Formula saved");
    } catch (err) {
      console.error("saveFormula", err);
      alert("Error saving formula");
    } finally {
      setSavingFormula(false);
    }
  };

  // Sales
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/sales");
      setSales(res.data || []);
    } catch (err) {
      console.error("fetchSales", err);
    }
  };

  const calculateSaleTotal = (type, form) => {
    if (type === "EGG") {
      const eggs = Number(form.totalEggs || 0);
      const rate = Number(form.ratePerEgg || 0);
      return eggs * rate;
    }
    if (type === "MANURE") {
      return Number(form.totalKg || 0) * Number(form.ratePerKg || 0);
    }
    if (type === "CULL") {
      return Number(form.totalBirds || 0) * Number(form.ratePerBird || 0);
    }
    return 0;
  };

  const handleSaleSubmit = async () => {
    // validation simple
    if (saleType === "EGG" && (!saleForm.totalEggs || !saleForm.ratePerEgg)) {
      return alert("Enter total eggs and rate");
    }
    if (saleType === "MANURE" && (!saleForm.totalKg || !saleForm.ratePerKg)) {
      return alert("Enter kg and rate");
    }
    if (saleType === "CULL" && (!saleForm.totalBirds || !saleForm.ratePerBird)) {
      return alert("Enter birds and rate");
    }

    const total = calculateSaleTotal(saleType, saleForm);
    const paid = Number(saleForm.paidAmount || 0);
    const remaining = total - paid;
    let status = "PENDING";
    if (remaining === 0) status = "PAID";
    else if (paid > 0) status = "PARTIAL";

    try {
      if (saleEditId) {
        await axios.put(`http://localhost:8080/api/sales/${saleEditId}`, {
          ...saleForm,
          type: saleType,
          totalAmount: total,
          paidAmount: paid,
          remainingAmount: remaining,
          paymentStatus: status,
        });
      } else {
        await axios.post("http://localhost:8080/api/sales", {
          ...saleForm,
          type: saleType,
          totalAmount: total,
          paidAmount: paid,
          remainingAmount: remaining,
          paymentStatus: status,
        });
      }
      // reset
      setSaleEditId(null);
      setSaleForm({
        days: "",
        totalEggs: "",
        ratePerEgg: "",
        totalKg: "",
        ratePerKg: "",
        buyerName: "",
        totalBirds: "",
        avgWeight: "",
        ratePerBird: "",
        paidAmount: "",
        paymentMode: "CASH",
      });
      await fetchSales();
    } catch (err) {
      console.error("handleSaleSubmit", err);
      alert("Error saving sale");
    }
  };

  const deleteSale = async (id) => {
    if (!confirm("Delete this sale?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/sales/${id}`);
      fetchSales();
    } catch (err) {
      console.error("deleteSale", err);
    }
  };

  const editSale = (s) => {
    setSaleEditId(s.id);
    setSaleType(s.type || "EGG");
    setSaleForm({
      days: s.days || "",
      totalEggs: s.totalEggs || "",
      ratePerEgg: s.ratePerEgg || "",
      totalKg: s.totalKg || "",
      ratePerKg: s.ratePerKg || "",
      buyerName: s.buyerName || "",
      totalBirds: s.totalBirds || "",
      avgWeight: s.avgWeight || "",
      ratePerBird: s.ratePerBird || "",
      paidAmount: s.paidAmount || "",
      paymentMode: s.paymentMode || "CASH",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // small helpers
  const avgEggs = saleForm.days ? ((Number(saleForm.totalEggs || 0) / Number(saleForm.days || 1)).toFixed(2)) : 0;
  const calculateFeedCost = () => {
    const m = Number(formula.maizePercent || 0) * Number(formula.maizePrice || 0);
    const s = Number(formula.soyaPercent || 0) * Number(formula.soyaPrice || 0);
    const d = Number(formula.dorbPercent || 0) * Number(formula.dorbPrice || 0);
    const mar = Number(formula.marblePercent || 0) * Number(formula.marblePrice || 0);
    const p = Number(formula.premixPercent || 0) * Number(formula.premixPrice || 0);
    const totalCost = (m + s + d + mar + p) / 100;
    return isNaN(totalCost) ? 0 : totalCost.toFixed(2);
  };

  // ----------------- Render -----------------
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{
        width: "220px",
        background: "#2c3e50",
        color: "white",
        padding: "20px"
      }}>
        <h2>🐔 Farm</h2>

        {["DASHBOARD", "SALES", "EXPENSES", "BATCHES", "FEED"].map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px",
              marginTop: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              background: activeTab === tab ? "#1abc9c" : "transparent",
              color: activeTab === tab ? "white" : "#ccc"   
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
      <h1 style={title}>🐔 Poultry Farm Manager</h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
      }}>
        {["DASHBOARD", "SALES", "EXPENSES", "BATCHES", "FEED"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: activeTab === tab ? "#2c3e50" : "#ddd",
              color: activeTab === tab ? "#fff" : "#333"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div style={cardRow}>
        <Card title="Total Expense" value={`₹${totalExpense.toFixed(2)}`} />
        <Card title="Total Sales" value={`₹${totalSales.toFixed(2)}`} />
        <Card title="Profit" value={`₹${profit.toFixed(2)}`} color={profit < 0 ? "red" : "green"} />
      </div>

      {/* Top area: Sales form + quick totals */}
      <div style={topArea}>
        <div style={leftCol}>

          {activeTab === "SALES" && (
            <>
              <h2>Sales (Add / Edit)</h2>

              <div style={row}>
                <label style={labelSmall}>Type</label>
                <select
                  value={saleType}
                  onChange={(e) => setSaleType(e.target.value)}
                  style={select}
                >
                  <option value="EGG">Egg</option>
                  <option value="MANURE">Manure</option>
                  <option value="CULL">Culls</option>
                </select>
              </div>

              {/* EGG */}
              {saleType === "EGG" && (
                <div style={row}>
                  <label style={labelSmall}>Days</label>
                  <input
                    style={input}
                    value={saleForm.days}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, days: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Total Eggs</label>
                  <input
                    style={input}
                    value={saleForm.totalEggs}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, totalEggs: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Rate</label>
                  <input
                    style={input}
                    value={saleForm.ratePerEgg}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, ratePerEgg: e.target.value })
                    }
                  />
                </div>
              )}

              {/* MANURE */}
              {saleType === "MANURE" && (
                <div style={row}>
                  <label style={labelSmall}>Kg</label>
                  <input
                    style={input}
                    value={saleForm.totalKg}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, totalKg: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Rate</label>
                  <input
                    style={input}
                    value={saleForm.ratePerKg}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, ratePerKg: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Buyer</label>
                  <input
                    style={input}
                    value={saleForm.buyerName}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, buyerName: e.target.value })
                    }
                  />
                </div>
              )}

              {/* CULL */}
              {saleType === "CULL" && (
                <div style={row}>
                  <label style={labelSmall}>Birds</label>
                  <input
                    style={input}
                    value={saleForm.totalBirds}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, totalBirds: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Avg Wt</label>
                  <input
                    style={input}
                    value={saleForm.avgWeight}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, avgWeight: e.target.value })
                    }
                  />

                  <label style={labelSmall}>Rate</label>
                  <input
                    style={input}
                    value={saleForm.ratePerBird}
                    onChange={(e) =>
                      setSaleForm({ ...saleForm, ratePerBird: e.target.value })
                    }
                  />
                </div>
              )}

              {/* PAYMENT */}
              <div style={row}>
                <label style={labelSmall}>Paid</label>
                <input
                  style={input}
                  value={saleForm.paidAmount}
                  onChange={(e) =>
                    setSaleForm({ ...saleForm, paidAmount: e.target.value })
                  }
                />

                <select
                  style={selectSmall}
                  value={saleForm.paymentMode}
                  onChange={(e) =>
                    setSaleForm({ ...saleForm, paymentMode: e.target.value })
                  }
                >
                  <option value="CASH">Cash</option>
                  <option value="ONLINE">Online</option>
                </select>

                <button style={btnPrimary} onClick={handleSaleSubmit}>
                  {saleEditId ? "Update Sale" : "Add Sale"}
                </button>
              </div>

              {/* TOTAL */}
              <div style={{ marginTop: 10 }}>
                <strong>Total:</strong> ₹{" "}
                {calculateSaleTotal(saleType, saleForm)}
              </div>
            </>
          )}

        </div>

        {/* RIGHT SIDE FEED */}
        <div style={rightCol}>
          {activeTab === "FEED" && (
            <>
              <h2>Feed Formula</h2>
              <form onSubmit={saveFormula}>
                {["maize","soya","dorb","marble","premix"].map((k) => (
                  <div key={k} style={row}>
                    <label>{k}</label>
                    <input
                      style={inputSmall}
                      value={formula[k + "Percent"]}
                      onChange={(e)=>setFormula({...formula,[k+"Percent"]:e.target.value})}
                    />
                    <input
                      style={inputSmall}
                      value={formula[k + "Price"]}
                      onChange={(e)=>setFormula({...formula,[k+"Price"]:e.target.value})}
                    />
                  </div>
                ))}
                <button style={btnPrimary}>Save</button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Middle area: Expenses and Batches */}
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>        <div style={cardStyle}>
          <h3>Expenses</h3>
          <form onSubmit={addExpense} style={formRow}>
            <input style={input} placeholder="Category" value={expenseForm.category} onChange={(e)=>setExpenseForm({...expenseForm,category:e.target.value})} />
            <input style={input} placeholder="Amount" value={expenseForm.amount} onChange={(e)=>setExpenseForm({...expenseForm,amount:e.target.value})} />
            <select style={input} value={expenseForm.batchId} onChange={(e)=>setExpenseForm({...expenseForm,batchId:e.target.value})}>
              <option value="">Batch (optional)</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <button style={btnPrimary} type="submit">Add</button>
          </form>

          <table style={table}>
            <thead>
              <tr><th>Category</th><th>Amount</th><th>Batch</th><th>Action</th></tr>
            </thead>
            <tbody>
              {expenses.map(ex => (
                <tr key={ex.id}>
                  <td>{ex.category}</td>
                  <td>₹{Number(ex.amount || 0)}</td>
                  <td>{(batches.find(b=>b.id === ex.batchId) || {}).name || "-"}</td>
                  <td><button style={btnDanger} onClick={()=>deleteExpense(ex.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={cardStyle}>
          <h3>Batches</h3>
          <form onSubmit={submitBatch} style={formRow}>
            <input style={input} placeholder="Name" value={batchForm.name} onChange={(e)=>setBatchForm({...batchForm,name:e.target.value})} />
            <input style={input} placeholder="Birds" value={batchForm.totalBirds} onChange={(e)=>setBatchForm({...batchForm,totalBirds:e.target.value})} />
            <input style={input} placeholder="Mortality" value={batchForm.mortality} onChange={(e)=>setBatchForm({...batchForm,mortality:e.target.value})} />
            <button style={btnPrimary} type="submit">{batchEditId ? "Update" : "Add"}</button>
          </form>

          <table style={table}>
            <thead><tr><th>Name</th><th>Birds</th><th>Mortality</th><th>Action</th></tr></thead>
            <tbody>
              {batches.map(b => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.totalBirds}</td>
                  <td>{b.mortality}</td>
                  <td>
                    <button style={btnEdit} onClick={()=>editBatch(b)}>Edit</button>
                    <button style={btnDanger} onClick={()=>deleteBatch(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales table (below) */}
      <div style={{ marginTop: 24, ...cardStyle }}>
        <h2>Sales List</h2>
        <table style={table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Details</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.filter(s => s.totalAmount > 0).map(s => (
              <tr key={s.id}>
                <td>{s.type}</td>
                <td>
                  {s.type === "EGG" && <div>Eggs: {s.totalEggs} | Days: {s.days} | rate: ₹{s.ratePerEgg}</div>}
                  {s.type === "MANURE" && <div>Kg: {s.totalKg} | rate: ₹{s.ratePerKg} | Buyer: {s.buyerName}</div>}
                  {s.type === "CULL" && <div>Birds: {s.totalBirds} | avg wt: {s.avgWeight} | rate: ₹{s.ratePerBird}</div>}
                </td>
                <td>₹{Number(s.totalAmount || 0)}</td>
                <td>₹{Number(s.paidAmount || 0)}</td>
                <td>₹{Number(s.remainingAmount || 0)}</td>
                <td style={{ color: s.paymentStatus === "PAID" ? "green" : s.paymentStatus === "PARTIAL" ? "orange" : "red", fontWeight: "bold" }}>{s.paymentStatus}</td>
                <td>
                  <button style={btnEdit} onClick={()=>editSale(s)}>Edit</button>
                  <button style={btnDanger} onClick={()=>deleteSale(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer style={{ marginTop: 36, textAlign: "center", color: "#666" }}>
        Poultry Farm Manager — local demo
      </footer>
    </div>
  </div>
  );
}
/* ----------------- small presentational components & styles ----------------- */

const Card = ({ title, value, color }) => (
  <div style={{ ...cardStyle, borderLeft: `6px solid ${color || "#333"}` }}>
    <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
    <div style={{ fontSize: 20, marginTop: 6 }}>{value}</div>
  </div>
);

const container = { maxWidth: 1100, margin: "auto", padding: 20, fontFamily: "Inter, Arial, sans-serif" };
const title = { textAlign: "center", fontSize: 28, marginBottom: 10 };
const cardRow = { display: "flex", gap: 12, justifyContent: "center", marginBottom: 18 };
const cardStyle = { padding: 14, background: "#fafafa", borderRadius: 8, minWidth: 180, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" };

const topArea = { display: "grid",gridTemplateColumns: "2fr 1fr", gap: 16, alignItems: "flex-start" };
const leftCol = { flex: 1, background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" };
const rightCol = { width: 380, background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" };

const row = { display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" };
const formRow = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 };

const labelSmall = { minWidth: 70, color: "#333" };
const input = { padding: 8, borderRadius: 6, border: "1px solid #ddd", minWidth: 120 };
const inputSmall = { padding: 6, borderRadius: 6, border: "1px solid #ddd", minWidth: 80 };
const select = { padding: 8, borderRadius: 6, border: "1px solid #ddd" };
const selectSmall = { padding: 6, borderRadius: 6, border: "1px solid #ddd" };

const btnPrimary = { background: "#2c3e50", color: "white", padding: "8px 12px", border: "none", borderRadius: 6, cursor: "pointer" };
const btnEdit = { background: "#3498db", color: "white", padding: "6px 8px", border: "none", borderRadius: 6, cursor: "pointer", marginRight: 6 };
const btnDanger = { background: "#e74c3c", color: "white", padding: "6px 8px", border: "none", borderRadius: 6, cursor: "pointer" };

const table = { width: "100%", borderCollapse: "collapse", marginTop: 8 };

export default App;