import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [sales, setSales] = useState([]);
  const [batches, setBatches] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalSales = sales.reduce((s, e) => s + Number(e.amount || 0), 0);
  const profit = totalSales - total;

  useEffect(() => {
    fetchExpenses();
    fetchSales();
    fetchBatches();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.batchId) return alert("Fill all");

    await axios.post("http://localhost:8080/api/expenses", {
      ...form,
      amount: Number(form.amount),
      batchId: Number(form.batchId),
    });

    setForm({ category: "", amount: "", note: "", date: "", batchId: "" });
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/expenses/${id}`);
    fetchExpenses();
  };

  const deleteBatch = async (id) => {
    await axios.delete(`http://localhost:8080/api/batches/${id}`);
    fetchBatches();
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();

    if (editId !== null) {
      await axios.put(`http://localhost:8080/api/batches/${editId}`, {
        id: editId,
        ...batchForm,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:8080/api/batches", batchForm);
    }

    setBatchForm({ name: "", totalBirds: "", mortality: "" });
    fetchBatches();
  };

  const handleFormulaSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/feed-formula", formula);
    alert("Saved");
  };

  return (
    <div style={container}>

      <h1 style={title}>🐔 Poultry Manager</h1>

      {/* FORM */}
      <form style={formRow} onSubmit={handleSubmit}>
        <input style={input} value={form.category} placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })} />

        <input style={input} value={form.amount} type="number" placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })} />

        <select style={input} value={form.batchId}
          onChange={(e) => setForm({ ...form, batchId: e.target.value })}>
          <option value="">Batch</option>
          {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <button style={btnPrimary}>Add</button>
      </form>

      {/* CARDS */}
      <div style={cardRow}>
        <Card title="Expense" value={total} />
        <Card title="Sales" value={totalSales} />
        <Card title="Profit" value={profit} color={profit < 0 ? "red" : "green"} />
      </div>

      {/* EXPENSE TABLE */}
      <h2 style={section}>Expenses</h2>
      <Table headers={["Category", "Amount", "Action"]}>
        {expenses.map(e => (
          <tr key={e.id}>
            <td>{e.category}</td>
            <td>₹{e.amount}</td>
            <td><button style={btnDanger} onClick={() => handleDelete(e.id)}>Delete</button></td>
          </tr>
        ))}
      </Table>

      {/* BATCH */}
      <h2 style={section}>Batches</h2>
      <form style={formRow} onSubmit={handleBatchSubmit}>
        <input style={input} value={batchForm.name} placeholder="Name"
          onChange={(e) => setBatchForm({ ...batchForm, name: e.target.value })} />

        <input style={input} value={batchForm.totalBirds} placeholder="Birds"
          onChange={(e) => setBatchForm({ ...batchForm, totalBirds: e.target.value })} />

        <input style={input} value={batchForm.mortality} placeholder="Mortality"
          onChange={(e) => setBatchForm({ ...batchForm, mortality: e.target.value })} />

        <button style={btnPrimary}>{editId ? "Update" : "Add"}</button>
      </form>

      <Table headers={["Name", "Birds", "Mortality", "Action"]}>
        {batches.map(b => (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.totalBirds}</td>
            <td>{b.mortality}</td>
            <td>
              <button style={btnDanger} onClick={() => deleteBatch(b.id)}>Delete</button>
              <button style={btnEdit} onClick={() => { setEditId(b.id); setBatchForm(b); }}>Edit</button>
            </td>
          </tr>
        ))}
      </Table>

      {/* FEED FORMULA */}
    <h2 style={section}>Feed Formula</h2>

    <form style={formRow} onSubmit={handleFormulaSubmit}>

      <input style={input} placeholder="Maize %" 
        onChange={(e)=>setFormula({...formula, maizePercent:e.target.value})} />

      <input style={input} placeholder="Maize Price" 
        onChange={(e)=>setFormula({...formula, maizePrice:e.target.value})} />

      <input style={input} placeholder="Soya %" 
        onChange={(e)=>setFormula({...formula, soyaPercent:e.target.value})} />

      <input style={input} placeholder="Soya Price" 
        onChange={(e)=>setFormula({...formula, soyaPrice:e.target.value})} />

      <input style={input} placeholder="Dorb %" 
        onChange={(e)=>setFormula({...formula, dorbPercent:e.target.value})} />

      <input style={input} placeholder="Dorb Price" 
        onChange={(e)=>setFormula({...formula, dorbPrice:e.target.value})} />

      <input style={input} placeholder="Marble %" 
        onChange={(e)=>setFormula({...formula, marblePercent:e.target.value})} />

      <input style={input} placeholder="Marble Price" 
        onChange={(e)=>setFormula({...formula, marblePrice:e.target.value})} />

      <input style={input} placeholder="Premix %" 
        onChange={(e)=>setFormula({...formula, premixPercent:e.target.value})} />

      <input style={input} placeholder="Premix Price" 
        onChange={(e)=>setFormula({...formula, premixPrice:e.target.value})} />

      <button style={btnPrimary}>Save Formula</button>

    </form>

    </div>
  );
}

// reusable components
const Card = ({title,value,color}) => (
  <div style={card}>
    <h3>{title}</h3>
    <p style={{color:color||"#333"}}>₹{value}</p>
  </div>
);

const Table = ({headers,children}) => (
  <table style={table}>
    <thead>
      <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

// styles
const container={maxWidth:"1000px",margin:"auto",padding:"20px",fontFamily:"Arial"};
const title={textAlign:"center",fontSize:"36px"};
const section={marginTop:"30px",textAlign:"center"};
const formRow={display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"};
const input={padding:"8px",border:"1px solid #ccc",borderRadius:"6px"};
const btnPrimary={background:"#2c3e50",color:"white",padding:"8px",border:"none",borderRadius:"6px"};
const btnDanger={background:"#e74c3c",color:"white",padding:"6px",border:"none",borderRadius:"6px"};
const btnEdit={background:"#3498db",color:"white",padding:"6px",border:"none",borderRadius:"6px",marginLeft:"5px"};
const cardRow={display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"};
const card={padding:"20px",background:"#f9f9f9",borderRadius:"10px",boxShadow:"0 4px 10px rgba(0,0,0,0.1)",textAlign:"center"};
const table={width:"100%",marginTop:"15px",borderCollapse:"collapse",textAlign:"center"};

export default App;